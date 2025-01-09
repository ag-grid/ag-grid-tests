<template>
  <button>Fetch info</button>
</template>

<script lang="ts" setup>

import { useApi } from '../composables/Api';

const { fetchInfo } = useApi();

const callApi = async () => {
  const resultFromServer = await fetchInfo();
  alert(`${resultFromServer.ceo} is the ceo of ${resultFromServer.name}`);
};

</script>
