// Note: Assumes working directory is the root of the mono-repo
const fs = require('fs');
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
    updatePackageJsonFiles();
}

function updatePackageJsonFiles() {
    console.log('Updating package.json files');

    const CWD = process.cwd();

    packageDirectories.forEach((packageDirectory) => {
        // update all package.json files
        const packageJsonFile = `${CWD}/${packageDirectory}/package.json`;
        console.log(`${CWD}/${packageDirectory}/package.json`);
        updateFileWithNewVersions(packageJsonFile);
    });
}

function updateFileWithNewVersions(currentFile) {
    const packageJson = JSON.parse(fs.readFileSync(currentFile, 'utf8'));

    const updatedPackageJson = pipe(
        updateVersion,
        updateDependencies,
        updateDevDependencies,
        updatePeerDependencies,
        updateOptionalDependencies
    )(packageJson);

    fs.writeFileSync(currentFile, JSON.stringify(updatedPackageJson, null, 2), 'utf8');
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
    Object.entries(dependencyContents)
        .filter(([key, value]) => gridDependency(key) || chartDependency(key))
        .filter(([key, value]) => key !== 'ag-grid-testing')
        .forEach(([key, value]) => {
            dependencyContents[key] = dependencyVersion;
        });

    return fileContents;
}

main();
