<template>
  <v-container class="pa-0">
    <div v-for="photo in photos" :key="photo.id" @click="selectPhoto(photo)">
      <Photo :src="photo.url" :likes="photo.likes" />
    </div>

    <Loader v-if="hasNext" />

    <PhotoVisualizer
      v-if="selectedPhoto"
      :photo="selectedPhoto"
      @unselect-photo="selectedPhoto = null"
    />
  </v-container>
</template>

<script>
import { getPhotos } from "../services/api";
import Photo from "./Photo";
import PhotoVisualizer from "./PhotoVisualizer";
import Loader from "./Loader";

export default {
  name: "Gallery",
  components: {
    Photo,
    PhotoVisualizer,
    Loader,
  },
  data: () => ({
    photos: [],
    selectedPhoto: null,
    page: 1,
    hasNext: true,
  }),
  methods: {
    fetchPhotos() {
      if (this.hasNext) {
        getPhotos(this.page++).then(({ data }) => {
          this.photos.push(...data.results);
          this.hasNext = data.next !== null;
        });
      }
    },
    selectPhoto(photo) {
      this.selectedPhoto = photo;
    },
  },
  mounted() {
    this.fetchPhotos();

    window.onscroll = () => {
      const bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;

      if (bottomOfWindow) {
        this.fetchPhotos();
      }
    };
  },
};
</script>
