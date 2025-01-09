<template>
  <input v-model="value" />
</template>

<script>
import { ref } from "vue";

export default {
  name: "CustomCellEditor",
  components: {},
  props: {
    params: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
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

    return {
      value,
      getValue,
      isCancelBeforeStart,
      isCancelAfterEnd,
    };
  },
};
</script>
