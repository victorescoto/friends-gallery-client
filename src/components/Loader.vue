<template>
  <div class="loading">
    <img :src="require('../assets/loading.gif')" />
  </div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style scoped>
.loading {
  height: 50px;
  text-align: center;
}

.loading img {
  max-width: 100%;
  max-height: 100%;
}
</style>