import { createApp, defineComponent, onMounted, ref } from "vue";

import Decimal from 'decimal.js';

import type {
    CellValueChangedEvent,
    ColDef,
    RowSelectionOptions,
    SelectionChangedEvent,
    ValueFormatterParams,
} from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridVue } from "ag-grid-vue3";

ModuleRegistry.registerModules([AllCommunityModule]);

// Row Data Interface
interface IRow {
    decimal: Decimal;
}


// Define the component configuration
const App = defineComponent({
    name: "App",
    template: `
    <ag-grid-vue
        style="width: 100%; height: 100%"
        :columnDefs="colDefs"
        :rowData="rowData"
    >
    </ag-grid-vue>
    `,
    components: {
        AgGridVue,
    },
    setup() {
        const rowData = ref<IRow[]>([]);

        // Fetch data when the component is mounted
        onMounted(async () => {
            rowData.value = await fetchData();
        });

        const colDefs = ref<ColDef[]>([
            {
                field: "decimal",
                width: 150,
                valueFormatter: (params)=>params.value.toNumber()
            },
        ]);

        const fetchData = async () => {
            return [
                { decimal: new Decimal("1") }
            ]
        };

        return {
            rowData,
            colDefs
        };
    },
});

createApp(App).mount("#app");
