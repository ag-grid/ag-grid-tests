import { createApp, defineComponent, onMounted, ref } from "vue";

import type {
  CellValueChangedEvent,
  ColDef,
  RowSelectionOptions,
  ValueFormatterParams,
} from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridVue } from "ag-grid-vue3";

ModuleRegistry.registerModules([AllCommunityModule]);

// Row Data Interface
interface IRow {
  mission: string;
}

const MissionRenderer = {
  template: `
    {{ cellValue }}
    `,
  setup(props) {
    const cellValue = props.params.value.getName();


    const cellValueLowerCase = cellValue.toLowerCase();
    return {
      cellValue,
      cellValueLowerCase,
    };
  },
};


class Mission {
  private name: string;

  constructor(name) {
    this.name = name;
  }

  public getName() {
    return `Mission: ${this.name}`;
  }
}

// Define the component configuration
const App = defineComponent({
  name: "App",
  template: `
    <ag-grid-vue
        style="width: 100%; height: 100%"
        :columnDefs="colDefs"
        :rowData="rowData"
    >
    </ag-grid-vue>
    `,
  components: {
    AgGridVue,
    missionRenderer: MissionRenderer,
  },
  setup() {
    const rowData = ref<IRow[]>([]);

    // Fetch data when the component is mounted
    onMounted(async () => {
      rowData.value = await fetchData();
    });

    const colDefs = ref<ColDef[]>([
      {
        field: "mission",
        width: 150,
        cellRenderer: "missionRenderer",
        valueFormatter: (value) => 'wibble' // to be removed
      },
    ]);

    const fetchData = async () => {
      return [
        { mission: new Mission("name 1") },
        { mission: new Mission("name 2") },
        { mission: new Mission("name 3") },
      ]
    };

    return {
      rowData,
      colDefs
    };
  },
});

createApp(App).mount("#app");


