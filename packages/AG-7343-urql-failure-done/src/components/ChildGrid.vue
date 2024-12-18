<template>
  <CustomGrid
    class="ag-theme-alpine"
    style="height: 500px; width: 97vw"
    :columnDefs="columnDefs.value"
    :defaultColDef="defaultColDef"
    :rowData="data"
    theme="legacy"
    @grid-ready="onGridReady"
  />
</template>

<script setup lang="ts">
import {
  onMounted, reactive, Ref, ref, toRef,
} from 'vue';
import { GridApi } from 'ag-grid-community';
import ButtonCell from './ButtonCell.vue';

const props = defineProps({
  params: {
    required: true,
    type: Object,
  },
});

const params = toRef(props, 'params');
const data = ref([]);
const gridApi = ref(null); // Optional - for accessing Grid's API
const masterGridApi: Ref<GridApi | undefined> = ref(undefined);

// Obtain API from grid's onGridReady event
const onGridReady = (currentGridParams: any) => {
  gridApi.value = currentGridParams.api;
  const gridInfo = {
    id: params.value.node.id,
    api: gridApi.value,
    columnApi: currentGridParams.columnApi,
  };
  masterGridApi.value!.addDetailGridInfo(params.value.node.id.rowId, gridInfo as any);
  data.value = params.value.data.children;
};

onMounted(() => {
  masterGridApi.value = params.value.api;
});

// Each Column Definition results in one Column.
const columnDefs = reactive({
  value: [
    { field: 'year' },
    { field: 'miles' },
    { field: 'owners' },
    { field: 'fetch data', cellRenderer: ButtonCell },
  ],
});

// DefaultColDef sets props common to all Columns
const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
};

</script>
