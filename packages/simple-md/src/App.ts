import { createApp } from 'vue';

import type {GridApi} from 'ag-grid-community';
import {AllCommunityModule} from 'ag-grid-community';
import { ModuleRegistry } from 'ag-grid-community';
import { ColumnsToolPanelModule } from 'ag-grid-enterprise';
import { MasterDetailModule } from 'ag-grid-enterprise';
import { MenuModule } from 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue3';

import DetailCellRenderer from './detailCellRendererVue.js';
import  { data } from "./data"
import './styles.css';

ModuleRegistry.registerModules([AllCommunityModule, MasterDetailModule, MenuModule, ColumnsToolPanelModule]);

export const App = {
  template: `
    <div style="height: 100%">
    <div class="example-wrapper">
      <ag-grid-vue
          style="width: 100%; height: 100%;"
          id="myGrid"
          :columnDefs="columnDefs"
          @grid-ready="onGridReady"
          :defaultColDef="defaultColDef"
          :masterDetail="true"
          :detailRowHeight="detailRowHeight"
          :detailCellRenderer="detailCellRenderer"
          :loadThemeGoogleFonts="true"
          :rowData="rowData">
      </ag-grid-vue>
    </div>
    </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
    myDetailCellRenderer: DetailCellRenderer,
  },
  data: function () {
    return {
      columnDefs: [
        {
          field: 'name',
          cellRenderer: 'agGroupCellRenderer',
        },
        { field: 'account' },
        { field: 'calls' },
        {
          field: 'minutes',
          valueFormatter: "x.toLocaleString() + 'm'",
        },
      ],
      gridApi: null,
      defaultColDef: { flex: 1 },
      detailRowHeight: null,
      detailCellRenderer: null,
      rowData: null,
    };
  },
  beforeMount() {
    (this as any).detailRowHeight = 310;
    (this as any).detailCellRenderer = 'myDetailCellRenderer';
  },
  methods: {
    onGridReady(params) {
      (this as any).rowData = data;
    }
  },
};

