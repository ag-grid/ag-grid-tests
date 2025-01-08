OLD=`pwd`
cd /Users/seanlandsman/dev/ag-grid/latest
nx build ag-grid-vue3

if [ $? -ne 0 ];
then
  exit 1
fi

cd $OLD
rm -rf .quasar dist
rm -rf node_modules/ag-grid-vue3
mkdir -p node_modules/ag-grid-vue3
cp -R /Users/seanlandsman/dev/ag-grid/latest/packages/ag-grid-vue3/dist node_modules/ag-grid-vue3/
cp -R /Users/seanlandsman/dev/ag-grid/latest/packages/ag-grid-vue3/package.json node_modules/ag-grid-vue3/
npm run build
