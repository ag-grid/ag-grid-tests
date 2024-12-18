import {ClientSideRowModelModule, ValidationModule, ModuleRegistry, AllCommunityModule} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridVue } from 'ag-grid-vue3';
import { createApp, onBeforeMount, ref } from 'vue';
import CustomTooltip from './customTooltipVue.js';
import './styles.css';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([AllCommunityModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue                
                style="width: 100%; height: 100%;"
                :class="themeClass"
                :columnDefs="columnDefs"
                theme="legacy"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
    CustomTooltip,
  },
  setup(props) {
    const columnDefs = ref([
      {
        headerName: 'Athletes',
        headerTooltip: 'Athletes',
        tooltipComponent: 'CustomTooltip',
        children: [
          {
            headerName: 'Athlete Col 1',
            field: 'athlete',
            minWidth: 150,
            headerTooltip: 'Athlete 1',
            tooltipField: 'athlete',
          },
          {
            headerName: 'Athlete Col 2',
            field: 'athlete',
            minWidth: 150,
            headerTooltip: 'Athlete 2',
            tooltipComponent: 'CustomTooltip',
            tooltipValueGetter: tooltipValueGetter,
          },
        ],
      },
      { field: 'sport', width: 110 },
      { field: 'gold', width: 100 },
      { field: 'silver', width: 100 },
      { field: 'bronze', width: 100 },
      { field: 'total', width: 100 },
    ]);
    const gridApi = ref();
    const defaultColDef = ref({
      editable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
    });
    const rowData = ref(null);

    onBeforeMount(() => {});

    const onFirstDataRendered = (params) => {
      params.api.getDisplayedRowAtIndex(0).data.athlete = undefined;
      params.api.getDisplayedRowAtIndex(1).data.athlete = null;
      params.api.getDisplayedRowAtIndex(2).data.athlete = '';
      params.api.refreshCells();
    };
    const onGridReady = (params) => {
      gridApi.value = params.api;

      const updateData = (data) => {
        rowData.value = data;
      };

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    };

    return {
      columnDefs,
      gridApi,
      defaultColDef,
      rowData,
      onGridReady,
      themeClass:
        "ag-theme-quartz-dark",
      onFirstDataRendered,
    };
  },
};

const tooltipValueGetter = (params) => ({ value: params.value });

createApp(VueExample).mount('#app');
