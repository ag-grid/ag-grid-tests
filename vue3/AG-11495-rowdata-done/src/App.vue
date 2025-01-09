<script>
import HelloWorld from "./components/HelloWorld.vue";
import AgGrid from "./components/AgGrid.vue";
export default {
  components: { HelloWorld, AgGrid },
};
</script>

<template>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <div class="wrapper">
    <AgGrid></AgGrid>
  </div>
</template>

<style scoped>
.wrapper {
  width: 800px;
  height: auto;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
