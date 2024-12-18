<template>
  <div style="height: 500px; box-sizing: border-box">
      <button @click="onClick">click</button>
      <ag-grid-vue
          style="width: 100%; height: 500px;"
          class="ag-theme-quartz-dark"
          :columnDefs="columnDefs"
          theme="legacy"
          @grid-ready="onGridReady"
          :defaultColDef="{editable: true}"
          v-model="rowData"></ag-grid-vue>
  </div>
  <div style="margin-top:20px;height: 20px">[[{{rowData}}]]</div>
</template>

<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3';
import {defineExpose, onBeforeMount, onMounted, ref, shallowRef, watch} from "vue";
import {ClientSideRowModelModule, ValidationModule, ModuleRegistry} from "ag-grid-community";

ModuleRegistry.registerModules([ClientSideRowModelModule, ValidationModule]);

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

const columnDefs = ref([
  {
    headerName: 'row index',
    valueGetter: function (params) {
      return params.node.rowIndex;
    },
  },
  { headerName: 'Col 1', colId: 'firstCol', field: 'height' },
  { headerName: 'Col 5', field: 'width' },
  { headerName: 'Col 6', field: 'depth' },
]);
const gridApi = shallowRef();

const rowData = ref<any>(null);

onBeforeMount(() => {
  var data = [];
  for (var i = 0; i < 2; i++) {
    (data as any).push({
      height: Math.floor(Math.random() * 100),
      width: Math.floor(Math.random() * 100),
      depth: Math.floor(Math.random() * 100),
    });
  }

  rowData.value = data;
});

const onGridReady = (params) => {
  gridApi.value = params.api;

  var cols = params.api.getColumns();
  cols.forEach((col) => {
    var colDef = col.getColDef();
    console.log(
        colDef.headerName + ', Column ID = ' + col.getId(),
        JSON.stringify(colDef)
    );
  });
};

const onClick = () => {
  rowData.value[1].height = Math.floor(Math.random() * 100);
};

watch(rowData, (n, o) => {
  console.log('should be logged', n, o, n === o);
}, {deep: true});
</script>

<style scoped>
</style>

