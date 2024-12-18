import { createApp } from 'vue';

import type {GridApi} from 'ag-grid-community';
import {AllCommunityModule} from 'ag-grid-community';
import { ModuleRegistry } from 'ag-grid-community';
import { ColumnsToolPanelModule } from 'ag-grid-enterprise';
import { MasterDetailModule } from 'ag-grid-enterprise';
import { MenuModule } from 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue3';

import DetailCellRenderer from './detailCellRendererVue.js';
import './styles.css';

ModuleRegistry.registerModules([AllCommunityModule, MasterDetailModule, MenuModule, ColumnsToolPanelModule]);

export const App = {
  template: `
    <div style="height: 100%">
    <div class="example-wrapper">
      <div style="margin-bottom: 5px;">
        <button v-on:click="printDetailGridInfo()">Print Detail Grid Info</button>
        <button v-on:click="expandCollapseAll()">Toggle Expand / Collapse</button>
      </div>
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
          :rowData="rowData"
          @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
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
    onFirstDataRendered(params) {
      // setTimeout(function () {
      //   params.api.getDisplayedRowAtIndex(1).setExpanded(true);
      // }, 0);
    },
    expandCollapseAll() {
      (this as any).gridApi.forEachNode(function (node) {
        node.expanded = !!(window as any).collapsed;
      });
      (window as any).collapsed = !(window as any).collapsed;
      (this as any).gridApi.onGroupExpandedOrCollapsed();
    },
    printDetailGridInfo() {
      console.log("Currently registered detail grid's: ");
      (this as any).gridApi.forEachDetailGridInfo(function (detailGridInfo) {
        console.log(detailGridInfo);
      });
    },
    onGridReady(params) {
      (this as any).gridApi = params.api;

      const updateData = (data) => {
        (this as any).rowData = data;
      };

      fetch('https://www.ag-grid.com/example-assets/master-detail-data.json')
          .then((resp) => resp.json())
          .then((data) => updateData(data));
    },
  },
};

