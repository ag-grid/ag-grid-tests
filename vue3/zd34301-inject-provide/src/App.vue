<script setup>
import {provide, ref} from 'vue';
import WrappedOne from "./components/WrappedOne.vue";
import WrappedTwo from "./components/WrappedTwo.vue";

const isMounted = ref(true);

function unmount() {
  isMounted.value = false;
}

function mount() {
  isMounted.value = true;
}

</script>

<template>
  <button type="button" @click="unmount" id="unmount">Unmount table</button>
  <button type="button" @click="mount" id="mount">Mount table</button>
  <WrappedOne v-if="isMounted" />
  <WrappedTwo v-if="isMounted" />
</template>
