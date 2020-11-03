<template>
  <v-container class="my-5">
    <div class="pa-2 frame">
      <v-img :src="src"></v-img>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Photo",
  props: {
    src: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
.frame {
  border-radius: 5px;
  background: #ffffff55;
}
</style>
