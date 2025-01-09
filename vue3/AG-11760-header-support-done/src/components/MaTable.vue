<script setup>
import { ref } from "vue";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridVue } from "ag-grid-vue3";
import MaColumnHeader from "./MaColumnHeader.vue";

import { AllCommunityModule } from 'ag-grid-community';
import { ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule])

const rowData = ref([
  {
    make: "Tesla",
    model: "Model Y",
    price: 64950,
    electric: true,
  },
  {
    make: "Ford",
    model: "F-Series",
    price: 33850,
    electric: false,
  },
  {
    make: "Toyota",
    model: "Corolla",
    price: 29600,
    electric: false,
  },
]);

// Column Definitions: Defines the columns to be displayed.
const colDefs = ref([
  {
    field: "make",
    headerComponent: MaColumnHeader,
    filter: "agTextColumnFilter",
    flex: 1,
  },
  { field: "model" },
  { field: "price" },
  { field: "electric" },
]);
</script>
<template>
  <ag-grid-vue
    :rowData="rowData"
    :columnDefs="colDefs"
    style="height: 500px"
    class="ag-theme-quartz"
    column-menu="new"
    theme="legacy"
  />
</template>
