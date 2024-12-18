<template>
    <span>{{displayValue}}</span>
</template>

<script setup>
const displayValue = new Array(5)
    .fill('#')
    .join('');
</script>
