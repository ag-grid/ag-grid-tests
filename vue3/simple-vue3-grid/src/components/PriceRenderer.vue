<script setup lang="ts">
import {computed, ref, toRefs} from "vue";
import type {ICellRendererParams} from "ag-grid-community";

const props = defineProps<{ params: ICellRendererParams }>();

const size = computed(() => {
  if (props.params.value > 60000) {
    return 6;
  }
  if (props.params.value > 30000) {
    return 3;
  }
  if (props.params.value > 20000) {
    return 2;
  }
});

// console.log(size);
const arr = ref(new Array(size));
const src = 'https://www.ag-grid.com/example-assets/icons/pound-coin-color-icon.svg';
</script>

<template>
  <span class="imgSpan">
      <img v-for="images in new Array(size)" :src="src" class="priceIcon" />
  </span>
</template>

<style>

.imgSpan {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
}

  .priceIcon {
    display: block;
    width: 15px;
    height: auto;
    max-height: 50%;
    margin-right: 2px;
  }
</style>
