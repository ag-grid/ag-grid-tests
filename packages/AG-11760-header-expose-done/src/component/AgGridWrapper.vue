<template>
  <div style="margin-top: 10px">
    <h1>AgGrid Wrapper with Custom Header Component</h1>
    <ag-grid-vue
      :columnDefs="columns"
      :rowData="rows"
      :defaultColDef="defaultColDef"
      :modules="modules"
      class="ag-theme-alpine"
      style="flex: 1 1 auto; height: 500px"
    >
    </ag-grid-vue>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from "vue";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AllCommunityModule } from 'ag-grid-community';

import { AgGridVue } from "ag-grid-vue3";
// import HeaderComponent from "@/component/HeaderComponent";

const modules = ref([AllCommunityModule]);

const props = defineProps({
  columns: Array,
  rows: Array,
});

const defaultColDef = {
  flex: 1,
};

onMounted(() => {
  console.log("props", props);
});

// defineExpose({ HeaderComponent });

</script>
