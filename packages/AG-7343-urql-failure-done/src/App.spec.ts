import {describe, it, expect} from "vitest";
import {mount} from "@vue/test-utils";
import App from './App.vue'
import {AgGridVue} from "ag-grid-vue3";

describe("App", () => {
    it("should render", () => {
        mount(App, {
            global: {
                components: {CustomGrid: AgGridVue}
            }
        });
        expect(true).toBe(true);
    });
});
