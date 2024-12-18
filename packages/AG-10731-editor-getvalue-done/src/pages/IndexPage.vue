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
import { RowGroupingModule, ColumnMenuModule } from 'ag-grid-enterprise';
import { ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule, ColumnMenuModule, RowGroupingModule])

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
  filter: "agMultiColumnFilter",
  floatingFilter: true,
  filterParams: {
    filters: [
      {
        filter: "agTextColumnFilter",
      },
      {
        filter: "agSetColumnFilter",
      },
    ],
  },
  menuTabs: ["columnsMenuTab", "generalMenuTab"],
});

const columnDefs = ref([
  {
    field: "athlete",
    filter: "agTextColumnFilter",
    filterParams: {
      filterOptions: ["contains", "notContains"],
    },
  },
  {
    field: "age",
    filter: CustomFilter,
    filterParams: {
      filterOptions: ["equals", "notEqual", "lessThan", "greaterThan"],
      values: [
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
      ],
    },
  },
  {
    field: "country",
    filter: "agSetColumnFilter",
    filterParams: {
      filterOptions: ["contains", "notContains"],
    },
    hide: true,
  },
  {
    field: "year",
    filter: "agNumberColumnFilter",
    filterParams: {
      filterOptions: ["equals", "notEqual", "lessThan", "greaterThan"],
    },
  },
  {
    field: "date",
    filter: "agDateColumnFilter",
    filterParams: {
      filterOptions: ["equals", "notEqual", "lessThan", "greaterThan"],
    },
  },
  {
    field: "sport",
    filter: "agTextColumnFilter",
    rowGroup: true,
    filterParams: {
      filterOptions: ["contains", "notContains"],
    },
  },
  {
    field: "gold",
    filter: "agNumberColumnFilter",
    cellEditor: CustomCellEditorScriptSetup,
    filterParams: {
      filterOptions: ["equals", "notEqual", "lessThan", "greaterThan"],
    },
  },
  {
    field: "silver",
    filter: "agNumberColumnFilter",
    filterParams: {
      filterOptions: ["equals", "notEqual", "lessThan", "greaterThan"],
    },
  },
  {
    field: "bronze",
    filter: "agNumberColumnFilter",
    filterParams: {
      filterOptions: ["equals", "notEqual", "lessThan", "greaterThan"],
    },
  },
  {
    field: "total",
    filter: "agNumberColumnFilter",
    filterParams: {
      filterOptions: ["equals", "notEqual", "lessThan", "greaterThan"],
    },
  },
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
  {
    athlete: "Michael Phelps",
    age: 19,
    country: "United States",
    year: 2004,
    date: "29/08/2004",
    sport: "Swimming",
    gold: 6,
    silver: 0,
    bronze: 2,
    total: 8,
  },
  {
    athlete: "Michael Phelps",
    age: 27,
    country: "United States",
    year: 2012,
    date: "12/08/2012",
    sport: "Swimming",
    gold: 4,
    silver: 2,
    bronze: 0,
    total: 6,
  },
  {
    athlete: "Natalie Coughlin",
    age: 25,
    country: "United States",
    year: 2008,
    date: "24/08/2008",
    sport: "Swimming",
    gold: 1,
    silver: 2,
    bronze: 3,
    total: 6,
  },
  {
    athlete: "Aleksey Nemov",
    age: 24,
    country: "Russia",
    year: 2000,
    date: "01/10/2000",
    sport: "Gymnastics",
    gold: 2,
    silver: 1,
    bronze: 3,
    total: 6,
  },
  {
    athlete: "Alicia Coutts",
    age: 24,
    country: "Australia",
    year: 2012,
    date: "12/08/2012",
    sport: "Swimming",
    gold: 1,
    silver: 3,
    bronze: 1,
    total: 5,
  },
  {
    athlete: "Missy Franklin",
    age: 17,
    country: "United States",
    year: 2012,
    date: "12/08/2012",
    sport: "Swimming",
    gold: 4,
    silver: 0,
    bronze: 1,
    total: 5,
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
