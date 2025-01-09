<template>
  <button @click="reRenderGrid">Rerender Grid</button>
  <button @click="clearTempState">Clear Temp State</button>
  <button @click="expandAll">Expand All</button>
  <button @click="collapseAll">Collapse All</button>

  <ag-grid-vue
    v-if="isVisible"
    :style="{
      height: '90vh',
      width: '100%',
    }"
    class="ag-theme-quartz"
    :default-col-def="defaultColDef"
    :column-defs="columnDefs"
    :row-data="rowData"
    :initial-state="initialState"
    @grid-ready="onGridReady"
    theme="legacy"
    @state-updated="onStateUpdated"
    @cell-value-changed="onCellValueChanged"
  />
</template>

<script setup>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { AllCommunityModule } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule])

import { ref, watch } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-enterprise";

import CustomFilter from "src/components/CustomFilter.vue";
import CustomCellEditor from "src/components/CustomCellEditor.vue";
import CustomCellEditorScriptSetup from "src/components/CustomCellEditorScriptSetup.vue";

const defaultColDef = ref({
  flex: 1,
  minWidth: 100,
  resizable: true,
  sortable: true,
  editable: true,
});

const columnDefs = ref([
  {
    field: "gold",
    cellEditor: CustomCellEditorScriptSetup
  }
]);

const rowData = ref([
  {
    athlete: "Michael Phelps",
    age: 23,
    country: "United States",
    year: 2008,
    date: "24/08/2008",
    sport: "Swimming",
    gold: 8,
    silver: 0,
    bronze: 0,
    total: 8,
  },
]);

const gridApi = ref(null);

const onGridReady = (params) => {
  gridApi.value = params.api;
};

const previousState = localStorage.getItem("gridState");

const initialState = ref(previousState ? JSON.parse(previousState) : {});
const tempState = ref({});

const isVisible = ref(true);

const onCellValueChanged = (params) => {
  console.log("onCellValueChanged", params);
};

const onStateUpdated = (params) => {
  tempState.value = params.state;
};

watch(
  () => tempState.value,
  (newVal) => {
    localStorage.setItem("gridState", JSON.stringify(newVal));
  }
);

const clearTempState = () => {
  tempState.value = {};
  localStorage.removeItem("gridState");
};

const reRenderGrid = () => {
  isVisible.value = false;
  initialState.value = Object.assign({}, tempState.value);
  setTimeout(() => {
    isVisible.value = true;
  }, 1000);
};

const expandAll = () => {
  gridApi.value.expandAll();
};

const collapseAll = () => {
  gridApi.value.collapseAll();
};
</script>
