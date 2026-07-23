import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {AgGridVue} from 'ag-grid-vue3';
import {createApp, reactive, ref} from 'vue';
import {AllCommunityModule, ModuleRegistry} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

const VueExample = {
    template: `
        
            <ag-grid-vue
                style="width: 100%; height: 500px;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                v-model="rowData"
                theme="legacy"></ag-grid-vue>
                <span aria-label="value">{{rowData[0].value}}</span>
       
    `,
    components: {
        'ag-grid-vue': AgGridVue,
    },
    setup() {
        const columnDefs = ref([{field: 'value', editable: true}]);
        const rowData = ref([{value: 2}]);

        return {
            columnDefs,
            rowData
        };
    },
};

createApp(VueExample).mount('#app');
