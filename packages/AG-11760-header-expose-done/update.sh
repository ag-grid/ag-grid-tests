OLD=`pwd`
rm *.tgz
cd ../ag-grid-vue3
npm run build

if [ $? -ne 0 ];
then
  exit 1
fi

#node bumpVersion.mjs
#VERSION=`node -e 'console.log(require("./package.json").version)'`
#npm pack --dest-dir=../simple-md

#cd ../AG-7343-urql-failure
cd $OLD
rm -rf node_modules/ag-grid-vue3
mkdir -p node_modules/ag-grid-vue3
cp -R ../ag-grid-vue3/dist node_modules/ag-grid-vue3/
cp -R ../ag-grid-vue3/package.json node_modules/ag-grid-vue3/
#YARN_REGISTRY="http://52.50.158.57:4873" yarn add "./ag-grid-vue3-$VERSION.tgz" --force --check-files
#npm run dev
