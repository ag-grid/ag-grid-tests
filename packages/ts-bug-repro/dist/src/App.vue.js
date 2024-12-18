import { ref, shallowRef } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const gridApi = shallowRef(null);
const columnDefs = ref([
    { field: 'athlete', minWidth: 150 },
    { field: 'age', maxWidth: 90 },
    { field: 'country', minWidth: 150 },
    { field: 'year', maxWidth: 90 },
    { field: 'date', minWidth: 150 },
    { field: 'sport', minWidth: 150 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
]);
const alwaysPassFilter = (rowNode) => {
    return true;
};
const defaultColDef = ref({
    flex: 1,
    minWidth: 100,
});
const rowData = ref(null);
const onGridReady = (params) => {
    gridApi.value = params.api;
    fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => rowData.value = data);
};
; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_fnComponent = (await import('vue')).defineComponent({});
;
let __VLS_functionalComponentProps;
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ style: ({}) }, });
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.AgGridVue;
    /** @type { [typeof __VLS_components.AgGridVue, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onGridReady': {} }, ...{ style: ({}) }, columnDefs: ((__VLS_ctx.columnDefs)), defaultColDef: ((__VLS_ctx.defaultColDef)), alwaysPassFilter: ((__VLS_ctx.alwaysPassFilter)), rowData: ((__VLS_ctx.rowData)), }));
    const __VLS_2 = __VLS_1({ ...{ 'onGridReady': {} }, ...{ style: ({}) }, columnDefs: ((__VLS_ctx.columnDefs)), defaultColDef: ((__VLS_ctx.defaultColDef)), alwaysPassFilter: ((__VLS_ctx.alwaysPassFilter)), rowData: ((__VLS_ctx.rowData)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_6;
    const __VLS_7 = {
        onGridReady: (__VLS_ctx.onGridReady)
    };
    let __VLS_3;
    let __VLS_4;
    var __VLS_5;
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            AgGridVue: AgGridVue,
            columnDefs: columnDefs,
            alwaysPassFilter: alwaysPassFilter,
            defaultColDef: defaultColDef,
            rowData: rowData,
            onGridReady: onGridReady,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
