<template>
  <AgGridWrapper :columns="columnDefs" :rows="rows" />
</template>

<script setup>
import { provideGlobalGridOptions } from 'ag-grid-community';

import { onMounted, ref } from "vue";
import AgGridWrapper from "./component/AgGridWrapper.vue";
import HeaderComponent from "./component/HeaderComponent.vue";
import { rowData, colDefs } from "./utils";

const columnDefs = ref([...colDefs]);

const rows = ref([...rowData]);

// Mark all grids as using legacy themes
provideGlobalGridOptions({
  theme: "legacy",
});

defineExpose({ HeaderComponent });
</script>
