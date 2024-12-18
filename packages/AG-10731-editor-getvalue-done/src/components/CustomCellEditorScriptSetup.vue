<template>
  <input v-model="value" />
</template>

<script setup>
import { ref } from "vue";

defineOptions({
  name: "CustomCellEditorScriptSetup",
});
const props = defineProps({
  params: {
    type: Object,
    required: true,
  },
});

const value = ref(props.params.value);

// AgGrid callbacks
const getValue = () => {
  console.log("getValue", value.value);
  return Number(value.value);
};

const isCancelBeforeStart = () => {
  return false;
};

const isCancelAfterEnd = () => {
  return false;
};

defineExpose({
  getValue,
  isCancelBeforeStart,
  isCancelAfterEnd,
});
</script>
