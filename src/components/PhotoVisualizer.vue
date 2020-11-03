<template>
  <div class="visualizer">
    <v-container class="close-button-container">
      <div class="close-button" @click="$emit('unselect-photo')">
        <span id="x">X</span>
      </div>
    </v-container>

    <v-container class="photo">
      <v-img contain max-height="50vh" :src="photo.url" />
    </v-container>

    <v-container class="likes">
      <v-btn color="primary" @click="like">Like +1</v-btn>

      <div>{{ photo.likes }} Likes</div>
    </v-container>

    <v-container class="comments-container">
      <Loader class="loader" v-if="!comments" />

      <div v-else-if="comments.length == 0" class="loader text-center">
        Be the first to comment !
      </div>

      <div v-else class="comments">
        <div v-for="comment in comments" :key="comment.id" class="comment">
          <div class="comment-header">
            <div class="comment-author">
              <span>{{ comment.author || "Anonymously" }}</span>
            </div>

            <div class="comment-date">
              <span>{{ comment.created_at | dateFormat }}</span>
            </div>
          </div>

          <div class="comment-content">
            <span>{{ comment.content }}</span>
          </div>

          <v-divider></v-divider>
        </div>
      </div>
    </v-container>

    <div class="comment-form">
      <form @submit.prevent="addComent">
        <v-text-field
          v-model="comment"
          label="Comment here"
          required
        ></v-text-field>
        <div style="text-align: right">
          <v-btn type="submit">Send</v-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { likePhoto, getCommets, postCommet } from "../services/api";
import Loader from "./Loader";
import moment from "moment";

export default {
  name: "PhotoVisualizer",
  props: ["photo"],
  data() {
    return {
      comments: null,
      comment: null,
      likes: 0,
    };
  },
  components: {
    Loader,
  },
  mounted() {
    this.fetchComments();
  },
  filters: {
    dateFormat(date) {
      return moment(date).format("DD/MM/YYYY LT");
    },
  },
  methods: {
    fetchComments() {
      getCommets(this.photo.id).then((response) => {
        this.comments = response.data;
      });
    },
    like() {
      likePhoto(this.photo.id);
      this.photo.likes++;
    },
    addComent() {
      postCommet(this.photo.id, this.comment).then(() => {
        this.comment = null;
        this.fetchComments();
      });
    },
  },
};
</script>

<style scoped>
.visualizer {
  width: 100vw;
  height: 100vh;
  background: #000000cc;
  position: fixed;
  top: 0;
  left: 0;
  padding: 10px;
  z-index: 1;
  overflow: hidden;
}

.close-button-container {
  display: flex;
  flex-direction: row-reverse;
}

.close-button {
  background: #f2be6b;
  color: #fff;
  font-family: "Helvetica", "Arial", sans-serif;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close-button-container,
.photo,
.likes,
.comments-container {
  background-color: white;
}

.comments-container {
  overflow: scroll;
  max-height: 40%;
  position: relative;
}

.likes {
  display: flex;
  justify-content: space-between;
}

.loader,
.comments {
  margin: 20px 0px 10px 0px;
}

.comment {
  padding: 10px 0px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.comment-author {
  font-weight: 500;
}

.comment-content {
  margin-bottom: 10px;
}

.comment-form {
  width: 100%;
  padding: 10px;
  background: white;
}
</style>