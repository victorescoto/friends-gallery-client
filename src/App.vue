<template>
  <v-app>
    <div class="login pb-1">
      <v-btn color="primary" @click="openAdminArea">Log in</v-btn>
    </div>

    <v-main class="main">
      <v-container class="header py-7">
        <v-img max-width="250px" :src="require('./assets/04.png')" />

        <div class="title text-center my-8">
          <h1>Wedding Photo Gallery</h1>
        </div>
      </v-container>

      <PhotoUploader class="uploader" @loading="setLoading" />

      <Divider />

      <Gallery />

      <Divider />
    </v-main>

    <div v-if="isLoading" class="full-page-loading">
      <Loader />
    </div>
  </v-app>
</template>

<script>
import Gallery from "./components/Gallery";
import Loader from "./components/Loader";
import PhotoUploader from "./components/PhotoUploader";
import Divider from "./components/Divider";

export default {
  name: "App",
  components: {
    PhotoUploader,
    Gallery,
    Divider,
    Loader,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    setLoading(isLoading) {
      this.isLoading = isLoading;
    },
    openAdminArea() {
      window.open(process.env.VUE_APP_ADMIN_PAGE, "_blank");
    },
  },
};
</script>

<style scoped>
.login {
  text-align: right;
  padding-right: 20px;
  padding-top: 15px;
}

.main {
  background-color: #e9e6f1;
}

.header {
  position: relative;
  background: white;
  padding-bottom: 50px;
}

.v-image {
  margin: auto;
}

.header .title {
  font-family: cursive;
  font-size: 20px;
  color: #ffe3b7;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.3);
}

.title > h1 {
  line-height: 1.4em;
}

.uploader {
  background: rgb(233, 230, 241);
  background: linear-gradient(
    0deg,
    rgba(233, 230, 241, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
}

.full-page-loading {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background: #ffe3b7cc;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
