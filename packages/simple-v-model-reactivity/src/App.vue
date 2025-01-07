<template>
  <div style="height: 500px; box-sizing: border-box">
    <button @click="onClick" role="button">click</button>
    <ag-grid-vue
        style="width: 100%; height: 500px;"
        class="ag-theme-quartz-dark"
        :columnDefs="columnDefs"
        theme="legacy"
        :defaultColDef="{editable: true}"
        v-model="rowData"></ag-grid-vue>
  </div>
  <div style="margin-top:20px;height: 20px">[[{{ rowData }}]]</div>
</template>

<script setup lang="ts">
import {AgGridVue} from 'ag-grid-vue3';
import {onBeforeMount, ref} from "vue";
import {AllCommunityModule, ModuleRegistry} from "ag-grid-community";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

ModuleRegistry.registerModules([AllCommunityModule]);

const columnDefs = ref([
  {headerName: 'Col 1', field: 'col1'},
]);

const rowData = ref<any>(null);

onBeforeMount(() => {
  rowData.value = [
    {
      col1: 'row 1 col1',
    },
    {
      col1: 'row 2 col1',
    },
  ];
});

const onClick = () => {
  rowData.value[1].col1 = 'row 2 new col1';
};
</script>

<style scoped>
</style>

