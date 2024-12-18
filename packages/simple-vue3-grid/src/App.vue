<template>
  <ag-grid-vue :columnDefs="columnDefs"
               v-model="rowData"
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
  { make: "Ford", model: "F-Series", price: 33850, electric: false },
  { make: "Toyota", model: "Corolla", price: 29600, electric: false },
])

const columnDefs = ref<ColDef[]>([
    { field: "make", editable: true, cellEditor: 'SimpleEditor'},
    { field: "model", editable: true },
    { field: "price", editable: true, cellRenderer: 'PriceRenderer' },
    { field: "electric", editable: true }
  ])

// const gridOptions = ref<GridOptions>({
//   columnDefs: <ColDef[]>[
//     { field: "make", editable: true, cellEditor: 'SimpleEditor'},
//     { field: "model", editable: true },
//     { field: "price", editable: true, cellRenderer: 'PriceRenderer' },
//     { field: "electric", editable: true }
//   ]
// })

onMounted(() => {
  setTimeout(() => {
    // rowData.value = [
    //   { make: "Wibble", model: "Model Y", price: 64950, electric: true },
    //   { make: "Wobble", model: "F-Series", price: 33850, electric: false },
    //   { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    // ]
    rowData.value.push({ make: "Wibble", model: "Wobble", price: 64950, electric: true },)
  }, 1000)
})

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

