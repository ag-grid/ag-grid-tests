<template>
  <div>1 rows should render with the price having customer £ icon renderer</div>
  <div>when the button is clicked new row should be added</div>
  <div>the json below the table should match the row data (except for price which will be a number in the json)</div>
  <div style="height: 500px; box-sizing: border-box">
  <button @click="onClick" role="button">click</button>
  <ag-grid-vue :columnDefs="columnDefs"
               :rowData="rowData"
               :rowSelection="{
                      mode: 'singleRow',
                      checkboxes: false,
                     enableClickSelection: true,
                 }"
               style="height: 500px; width: 500px"
               theme="legacy"
               class="ag-theme-quartz"
               @grid-ready="gridReady"
               @cell-clicked="rowSelected"
  >
  </ag-grid-vue>
  {{rowData}}
  </div>
</template>

<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3';
import type { GridOptions, ColDef} from "ag-grid-community";
import {AllCommunityModule, ValidationModule, ModuleRegistry} from "ag-grid-community";
import {defineExpose, onMounted, ref} from "vue";
import PriceRenderer from "@/components/PriceRenderer.vue";
import SimpleEditor from "@/components/SimpleEditor.vue";

ModuleRegistry.registerModules([AllCommunityModule, ValidationModule]);

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

const rowData = ref<any[]>([
  { make: "Tesla", model: "Model Y", price: 64950, electric: true },
])

const columnDefs = ref<ColDef[]>([
    { field: "make", editable: true, cellEditor: 'SimpleEditor'},
    { field: "model", editable: true },
    { field: "price", editable: true, cellRenderer: 'PriceRenderer' }
  ])


const onClick = () => {
  rowData.value.push({ make: "Wibble", model: "Wobble", price: 20500, electric: true })
};

const rowSelected = (event:any) => {
  console.log("cell selected");
}

const gridReady = (params:any) => {
  console.log("grid ready");
}

defineExpose({
  PriceRenderer,
  SimpleEditor
})
</script>


<style scoped>
</style>

