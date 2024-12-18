<script setup>
import { inject } from 'vue';

const props = defineProps({
  params: {
    type: Object,
    required: true,
  },
});

const someValue = inject('someValue');
const state = inject('state');
</script>

<template>
  <span>{{ state.lastLoaded }} {{ someValue }}</span>
</template>
