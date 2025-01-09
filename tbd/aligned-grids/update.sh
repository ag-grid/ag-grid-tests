OLD=`pwd`
rm *.tgz
cd /Users/seanlandsman/dev/ag-grid/latest
nx build ag-grid-vue3

if [ $? -ne 0 ];
then
  exit 1
fi

cd $OLD
rm -rf node_modules/ag-grid-vue3
mkdir -p node_modules/ag-grid-vue3
cp -R /Users/seanlandsman/dev/ag-grid/latest/vue3/ag-grid-vue3/dist node_modules/ag-grid-vue3/
cp -R /Users/seanlandsman/dev/ag-grid/latest/vue3/ag-grid-vue3/package.json node_modules/ag-grid-vue3/
http-server -S -C /Users/seanlandsman/.ssl/localhost.crt -K /Users/seanlandsman/.ssl/localhost.key
