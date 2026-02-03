<script lang='ts' setup >
import { ref, shallowRef } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { GridApi, ColDef, GridReadyEvent, GridOptions } from 'ag-grid-community';
import {IRowNode} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule])
type ROW_TYPE = any;

const gridApi = shallowRef<GridApi | null>(null);
const columnDefs = ref<ColDef<ROW_TYPE>[]>([
  { field: 'athlete', minWidth: 150 },
  { field: 'age', maxWidth: 90 },
  { field: 'country', minWidth: 150 },
  { field: 'year', maxWidth: 90 },
  { field: 'date', minWidth: 150 },
  { field: 'sport', minWidth: 150 },
  { field: 'gold' },
  { field: 'silver' },
  { field: 'bronze' },
  { field: 'total' },
]);

const alwaysPassFilter = (): boolean => {
  return true;
}

const defaultColDef = ref<ColDef>({
  flex: 1,
  minWidth: 100,
});
const rowData = ref<unknown[]>(null);

const onGridReady = (params: GridReadyEvent) => {
  gridApi.value = params.api;

  fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
    .then((resp) => resp.json())
    .then((data) => rowData.value = data);
};
</script>

<template>
  <div style="height: 300px">
    <AgGridVue
      style="width: 100%; height: 100%;"
      :columnDefs="columnDefs"
      :defaultColDef="defaultColDef"
      :alwaysPassFilter="alwaysPassFilter"
      :rowData="rowData"
      @grid-ready="onGridReady"
    />
  </div>
</template>
