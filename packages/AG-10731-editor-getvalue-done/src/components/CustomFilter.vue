<template>
  <div class="">
    <div class="">
      <div
        class="ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper"
        :class="{
          'ag-checked': selectAll,
          'ag-indeterminate': isIndeterminate,
        }"
      >
        <input
          id="selectAll"
          v-model="selectAll"
          type="checkbox"
          :indeterminate="isIndeterminate"
          @change="selectAllOptions"
        />
      </div>
      <label for="selectAll">(Select All)</label>
    </div>

    <div v-for="option in filterOptions" :key="option">
      <div
        class="ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper"
        :class="{
          'ag-checked': selectedValues.includes(option),
        }"
      >
        <input
          :id="option"
          v-model="selectedValues"
          type="checkbox"
          :value="option"
          @change="updateFilter"
        />
      </div>
      <label :for="option">{{ option }}</label>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";

defineOptions({
  name: "CustomFilter",
});

const props = defineProps({
  params: {
    type: Object,
    required: true,
  },
});
const selectedValues = ref([]);
const selectAll = ref(true);

const isIndeterminate = computed(() => {
  return (
    selectedValues.value.length > 0 &&
    selectedValues.value.length < filterOptions.value.length
  );
});

const filterOptions = computed(() => {
  return props.params.colDef.filterParams.values;
});

const updateFilter = () => {
  props.params.filterChangedCallback();
};

watch(selectedValues, () => {
  selectAll.value = selectedValues.value.length === filterOptions.value.length;
});

const selectAllOptions = () => {
  if (selectAll.value) {
    selectedValues.value = filterOptions.value.map((option) => option);
  } else {
    selectedValues.value = [];
  }
  updateFilter();
};

onMounted(() => {
  selectAllOptions();
});

// AG Grid callbacks
const doesFilterPass = (params) => {
  return selectedValues.value.includes(params.data.age.toString());
};

const isFilterActive = () => {
  return selectedValues.value.length !== filterOptions.value.length;
};

const getModel = () => {
  if (!isFilterActive()) {
    return null;
  }

  return { selectedValues: selectedValues.value };
};

// -----------------------------
// HERE - When the timeout is active, the filter is set
// otherwise it's ignored
// -----------------------------
const setModel = (model) => {
  //   setTimeout(() => {
  if (!model) {
    selectedValues.value = [];
  } else {
    selectedValues.value = model.selectedValues;
  }

  props.params.api.onFilterChanged();
  //   }, 0);
};

onMounted(() => {
  props.params.filterModifiedCallback();
});

defineExpose({
  doesFilterPass,
  isFilterActive,
  getModel,
  setModel,
});
</script>
