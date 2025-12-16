import { createApp, defineComponent, ref, watch } from "vue";

import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridVue } from "ag-grid-vue3";

ModuleRegistry.registerModules([AllCommunityModule]);

// Row Data Interface
interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

// Define the component configuration
const App = defineComponent({
  name: "App",
  template: `
  <p>Should be no data changes</p>
  <p>Data changes: <span role="watch">{{ changeCount }}</span></p>
    <ag-grid-vue
        v-model="rowData"
        style="width: 100%; height: 100%"
        :columnDefs="colDefs"
        :defaultColDef="defaultColDef"
    >
    </ag-grid-vue>
    `,
  components: {
    AgGridVue,
  },
  setup() {
    const rowData = ref<IRow[]>([
      { make: "Tesla", model: "Model Y", price: 64950, electric: true },
      { make: "Ford", model: "F-Series", price: 33850, electric: false },
      { make: "Toyota", model: "Corolla", price: 29600, electric: false },
      { make: "Mercedes", model: "EQA", price: 48890, electric: true },
      { make: "Fiat", model: "500", price: 15774, electric: false },
      { make: "Nissan", model: "Juke", price: 20675, electric: false },
    ]);

    const colDefs = ref<ColDef<IRow>[]>([
      { field: "make" },
      { field: "model" },
      { field: "price" },
      { field: "electric" },
    ]);

    const defaultColDef = {
      flex: 1,
    };

    const changeCount = ref(0);
    watch(
      rowData,
      () => {
        console.log("updating in app");
        changeCount.value++;
      },
      { deep: true }
    );

    return {
      rowData,
      colDefs,
      defaultColDef,
      changeCount,
    };
  },
});

createApp(App).mount("#app");
