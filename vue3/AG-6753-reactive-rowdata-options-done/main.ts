import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {AgGridVue} from 'ag-grid-vue3';
import {createApp, reactive, ref} from 'vue';
import {ClientSideRowModelModule, ModuleRegistry, ValidationModule} from "ag-grid-community";

ModuleRegistry.registerModules([ClientSideRowModelModule, ValidationModule]);

const VueExample = {
    template: `
        
            <ag-grid-vue
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                :rowData="rowData"
                theme="legacy"
                @cell-clicked="onCellClicked"></ag-grid-vue>
       
    `,
    components: {
        'ag-grid-vue': AgGridVue,
    },
    setup() {
        const columnDefs = ref([{field: 'value'}]);
        const rowData = reactive([{value: 2}]);

        const onCellClicked = (params) => {
            rowData.push({value: Math.floor(Math.random() * 10) + 3});
        };

        // expose to template and other options API hooks
        return {
            columnDefs,
            rowData,
            onCellClicked,
        };
    },
};

createApp(VueExample).mount('#app');
