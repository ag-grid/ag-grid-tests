import { createApp, defineComponent, computed, ref } from "vue";

import type {
    ColDef,
    RowSelectionOptions,
    SelectionChangedEvent,
} from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridVue } from "ag-grid-vue3";

ModuleRegistry.registerModules([AllCommunityModule]);

class Mission {
    constructor(name: string) {
        this.name = name;
    }

    public name: string;
    public get formattedName() {
        return `Mission: ${this.name}`;
    }
}

const mission1 = new Mission("name 1");
const compareMissions = [mission1];

const NameRenderer = {
    template: `
    <div>
      <span aria-label="cell-value">{{ instance.name }}-{{ instance.formattedName }}-{{isMission}}</span>
    </div>
    `,
    setup(props) {
        const instance = props.params.data;
        const isMission = ref(props.params.data instanceof Mission);

        return {
            instance,
            isMission
        };
    },
};

// Define the component configuration
const App = defineComponent({
    name: "App",
    template: `
    <div style="width: 100%; height: 100%">
      <ag-grid-vue
          style="width: 100%; height: 200px"
          :columnDefs="colDefs"
          :rowData="rowData"
          :rowSelection="rowSelection"
          @selection-changed="onSelectionChanged"
      >
      </ag-grid-vue>
      <span aria-label="selection-check">{{selectionCheck}}</span>
    </div>
    `,
    components: {
        AgGridVue,
        nameRenderer: NameRenderer,
    },
    setup() {
        const rowData = ref<Mission[]>([
            mission1
        ]);

        const colDefs = ref<ColDef[]>([
            {
                field: "formattedName",
                width: 300,
                cellRenderer: "nameRenderer",
            },
        ]);

        const rowSelection = ref<RowSelectionOptions>({
            mode: "multiRow",
            headerCheckbox: false,
        });

        const selectionCheck = ref('')

        const onSelectionChanged = (event: SelectionChangedEvent) => {
            const selectedNodes = event.api.getSelectedNodes();
            const data = selectedNodes[0].data;

            const isMission = data instanceof Mission;
            const original = compareMissions.find((cItem) => data.name === cItem.name)
            const sameInstance = data === original;

            selectionCheck.value = `${isMission}-${sameInstance}`;
        }

        return {
            rowData,
            colDefs,
            rowSelection,
            selectionCheck,
            onSelectionChanged
        };
    },
});

createApp(App).mount("#app");
