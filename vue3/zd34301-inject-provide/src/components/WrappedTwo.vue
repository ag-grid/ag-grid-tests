<script setup>
import { ref, provide } from 'vue';
import DemoTable from './DemoTable.vue';
provide("someValue", "one");
</script>

<template>
  <DemoTable  />
</template>

<style scoped>
.demo-table {
  height: 300px;
}
</style>
