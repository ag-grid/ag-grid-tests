import { createApp, onBeforeMount, ref, shallowRef } from "vue";
import { AgGridVue } from "@ag-grid-community/vue3";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import "./styles.css";
import CompanyLogoRenderer from "./companyLogoRendererVue.js";
import CompanyRenderer from "./companyRendererVue.js";
import CustomButtonComponent from "./customButtonComponentVue.js";
import MissionResultRenderer from "./missionResultRendererVue.js";
import PriceRenderer from "./priceRendererVue.js";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const VueExample = {
    template: `
    `,
    components: {
        "ag-grid-vue": AgGridVue,
        CompanyRenderer,
        CompanyLogoRenderer,
        PriceRenderer,
        MissionResultRenderer,
        CustomButtonComponent,
    },
    setup(props) {

        return {
            columnDefs,
            gridApi,
            defaultColDef,
            rowData,
            onGridReady,
            themeClass:
                "ag-theme-quartz-dark",
        };
    },
};

createApp(VueExample).mount("#app");

