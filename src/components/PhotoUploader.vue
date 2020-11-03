<template>
  <v-container>
    <div class="title text-center">Send us your photos</div>

    <v-file-input
      class="max-"
      counter
      multiple
      small-chips
      :loading="loading"
      prepend-icon="mdi-camera"
      @change="selectPhotos"
      ref="fileupload"
      accept="image/*"
    ></v-file-input>

    <div class="mt-5">
      <v-btn :disabled="!this.photos.length" @click="upload" block color="primary" elevation="2" large>
        Enviar
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { uploadPhoto as uploadPhotoS3 } from "../services/s3";
import { postPhotos as postPhotosAPI } from "../services/api";

export default {
  name: "PhotoUploader",
  data() {
    return {
      photos: [],
      photoURLs: [],
      loading: false,
    };
  },
  watch: {
    photoURLs() {
      if (this.photos.length> 0 && this.photos.length === this.photoURLs.length) {
        postPhotosAPI(this.photoURLs).then(() => {
          this.$emit("loading", false);
          this.loading = false

          this.photos = [];
          this.photoURLs = [];
          this.$refs.fileupload.value = null;
        });
      }
    },
  },
  methods: {
    selectPhotos(photos) {
      this.photos = photos;
    },
    upload() {
      if (this.photos) {
        this.$emit("loading", true);
        this.loading = true

        this.photos.forEach((photo) => {
          uploadPhotoS3(photo).then(
            ({ Location }) => this.photoURLs.push({ url: Location }),
            (err) => console.log({ err })
          );
        });
      }
    },
  },
};
</script>

<style>
.title {
  color: #666;
  font-size: 20px;
}
</style>