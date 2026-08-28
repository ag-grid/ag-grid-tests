// Note: Assumes working directory is the root of the mono-repo
const fs = require('fs');
const { execSync } = require('child_process');

const AG_REGISTRY = 'https://registry.ag-grid.com/';

// AG nightly betas exist only on the AG registry; everything else these projects need comes from
// npmjs. lerna.json used to carry `"registry": "<AG registry>"`, which lerna applies to every child
// install (@lerna/get-npm-exec-opts sets npm_config_registry on each spawned npm), so all ~2000
// third-party packages per project resolved through it too. Its metadata cache goes stale per
// package independently: on 2026-08-27 it served vue@3.5.42 while still listing @vue/compiler-dom
// at 3.5.41, and because vue pins that sibling exactly, every bootstrap died with
// `ETARGET No matching version found for @vue/compiler-dom@3.5.42` for the next 28 hours.
//
// Addressing the AG artefacts by tarball URL is what lets that line come out of lerna.json: third-
// party resolution goes to npmjs, and the AG registry is only contacted for AG packages. npm applies
// //registry.ag-grid.com/:_authToken from ~/.npmrc by URI prefix, so authenticated fetches still work.
//
// Because the AG versions are now only valid once this script has run, bootstrap on its own is no
// longer enough for a fresh checkout — use `npm run init`, which runs this first.
const agTarballUrl = (name, version) => {
    // npm names the file after the unscoped part: @ag-grid-community/locale -> locale-<version>.tgz
    const fileName = `${name.replace(/^@[^/]+\//, '')}-${version}.tgz`;
    return `${AG_REGISTRY}${name}/-/${fileName}`;
};

const isAgPackage = (name) => /^@?ag-(grid|charts|stack)/.test(name) || name === 'ag-stack';

// Rewriting only the AG packages a project declares is not enough: those packages depend on further
// AG packages that are published on the AG registry alone, and npm resolves those as plain versions
// against the default registry, where a nightly beta does not exist. ag-grid-community@36.0.0-beta
// pulls ag-stack at its own version and ag-charts-types@14.0.0-beta -- a different release line -- so
// the versions cannot be assumed, and the set grows whenever the grid picks up more of charts. Hence
// the closure is queried from the registry and pinned through `overrides`, which is how
// ag-artefact-tests' setAgDeps.js handles the same packages.
const agViewCache = new Map();

function agView(spec, field) {
    const key = `${spec}#${field}`;
    if (agViewCache.has(key)) return agViewCache.get(key);

    let raw;
    try {
        raw = execSync(`npm view ${spec} ${field} --json --registry ${AG_REGISTRY}`, {
            stdio: ['ignore', 'pipe', 'ignore'],
            encoding: 'utf-8',
        });
    } catch (e) {
        throw new Error(`Could not read ${field} of ${spec} from ${AG_REGISTRY}`);
    }

    const parsed = raw.trim() ? JSON.parse(raw) : null;
    // A range that matches several publishes comes back as an array, newest last.
    const value = Array.isArray(parsed) ? parsed[parsed.length - 1] : parsed;
    agViewCache.set(key, value);
    return value;
}

function resolveAgClosure(roots) {
    const closure = new Map();
    const queue = [...roots];

    while (queue.length > 0) {
        const [name, spec] = queue.shift();
        if (closure.has(name)) continue;

        const version = agView(`${name}@${spec}`, 'version');
        if (!version) throw new Error(`${AG_REGISTRY} has no ${name}@${spec}`);
        closure.set(name, version);

        const dependencies = agView(`${name}@${version}`, 'dependencies') || {};
        for (const [dependency, range] of Object.entries(dependencies)) {
            if (isAgPackage(dependency) && !closure.has(dependency)) queue.push([dependency, range]);
        }
    }

    return closure;
}

// Every AG package any project declares, which is what the closure is walked from.
function collectDeclaredAgPackages(directories) {
    const names = new Set();

    directories.forEach((directory) => {
        const packageJson = JSON.parse(fs.readFileSync(`${process.cwd()}/${directory}/package.json`, 'utf8'));
        ['dependencies', 'devDependencies'].forEach((property) => {
            Object.keys(packageJson[property] || {})
                .filter((name) => isAgPackage(name) && name !== 'ag-grid-testing')
                .forEach((name) => names.add(name));
        });
    });

    return [...names];
}
const pipe =
    (...fns) =>
        (x) =>
            fns.reduce((v, f) => f(v), x);

const getDirectories = source =>
    fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => `${source}/${dirent.name}`)

const packageDirectories = require('./lerna.json').packages.map(package => package.replace('/*', ''))
    .map(getDirectories)
    .flat();

if (process.argv.length < 3) {
    console.log('Usage: node scripts/deployments/versionModules.js [Grid Version]');
    console.log('For example: node scripts/deployments/versionModules.js 19.1.0');
    console.log('Note: This script should be run from the root of the monorepo');
    process.exit(1);
}

const [exec, scriptPath, gridNewVersion] = process.argv;

if (!gridNewVersion) {
    console.error('ERROR: Invalid grid or charts version supplied');
    process.exit(1);
}

console.log('************************************************************************************************');
console.log(`Setting Grid Version to ${gridNewVersion}                                                       `);
console.log('************************************************************************************************');

function main() {
    const declared = collectDeclaredAgPackages(packageDirectories);
    console.log(`Resolving the AG dependency closure of ${declared.join(', ')}`);

    const agClosure = resolveAgClosure(declared.map((name) => [name, gridNewVersion]));
    agClosure.forEach((version, name) => console.log(`    ${name}@${version}`));

    updatePackageJsonFiles(agClosure);
}

function updatePackageJsonFiles(agClosure) {
    console.log('Updating package.json files');

    const CWD = process.cwd();

    packageDirectories.forEach((packageDirectory) => {
        // update all package.json files
        const packageJsonFile = `${CWD}/${packageDirectory}/package.json`;
        console.log(`${CWD}/${packageDirectory}/package.json`);
        updateFileWithNewVersions(packageJsonFile, agClosure);
    });
}

function updateFileWithNewVersions(currentFile, agClosure) {
    const packageJson = JSON.parse(fs.readFileSync(currentFile, 'utf8'));

    const updatedPackageJson = pipe(
        updateVersion,
        updateDependencies,
        updateDevDependencies,
        updatePeerDependencies,
        updateOptionalDependencies,
        (contents) => updateAgOverrides(contents, agClosure)
    )(packageJson);

    fs.writeFileSync(currentFile, JSON.stringify(updatedPackageJson, null, 2), 'utf8');
}

// Pins every AG package in the closure, transitive ones included, to its tarball on the AG registry.
// Merged into whatever overrides the project already has -- these projects pin rollup to the WASM
// build, which must survive.
function updateAgOverrides(packageJson, agClosure) {
    const overrides = { ...packageJson.overrides };
    agClosure.forEach((version, name) => {
        overrides[name] = agTarballUrl(name, version);
    });
    packageJson.overrides = overrides;
    return packageJson;
}

/**
 * Update `version.ts` file with version number if it exists
 */
function updateVersionFile(currentFile) {
    if (!fs.existsSync(currentFile)) {
        return;
    }

    fs.readFile(currentFile, 'utf8', (err, contents) => {
        const regex = /(export const VERSION =)(.*)$/m;
        const substitute = `$1 '${gridNewVersion}';`;
        const replacement = contents.replace(regex, substitute);

        fs.writeFileSync(currentFile, replacement, 'utf8');
    });
}

function updateVersion(packageJson) {
    packageJson.version = gridNewVersion;
    return packageJson;
}

function updateDependencies(fileContents) {
    return updateDependency(fileContents, 'dependencies', gridNewVersion);
}

function updateDevDependencies(fileContents) {
    return updateDependency(fileContents, 'devDependencies', gridNewVersion);
}

function updatePeerDependencies(fileContents) {
    return updateDependency(fileContents, 'peerDependencies', gridNewVersion);
}

function updateOptionalDependencies(fileContents) {
    return updateDependency(fileContents, 'optionalDependencies', gridNewVersion);
}

function updateDependency(fileContents, property, dependencyVersion) {
    if (!fileContents[property]) {
        return fileContents;
    }
    const dependencyContents = fileContents[property];

    const gridDependency = function (key) {
        return key.startsWith('ag-grid') || key.startsWith('@ag-grid');
    };
    const chartDependency = function (key) {
        return key.startsWith('ag-charts') || key.startsWith('@ag-charts');
    };
    // Only real dependencies become URLs. A peer or optional dependency has to stay a semver range
    // -- a tarball URL is not a valid range there, and npm rejects the manifest.
    const addressable = property === 'dependencies' || property === 'devDependencies';

    Object.entries(dependencyContents)
        .filter(([key, value]) => gridDependency(key) || chartDependency(key))
        .filter(([key, value]) => key !== 'ag-grid-testing')
        .forEach(([key, value]) => {
            dependencyContents[key] = addressable
                ? agTarballUrl(key, dependencyVersion)
                : dependencyVersion;
        });

    return fileContents;
}

main();
