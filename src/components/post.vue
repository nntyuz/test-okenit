<template lang="pug">
.post-component.flex.a-center.j-center.column(v-if="post")
  .flex.column.a-center
    .user.flex(v-if="user")
      .username User: {{ user.username }}
      .name Name: {{ user.name }}
      .email Email: {{ user.email }}
    .title {{ post.title }}
    .post {{ post.body }}
  .comments-wrapper.flex.column Commentaries:
    .comments.flex.column(v-for="comment in comments" :key="comment.id")
      .email {{ comment.email }}
      .name {{ comment.name }}
      .body {{ comment.body }}
</template>

<script>
import axios from "axios";

export default {
  name: "PostComponent",
  data() {
    return {
      user: null,
      post: null,
      comments: []
    };
  },
  created() {
    this.getPost();
  },
  methods: {
    async getPost() {
      const postId = this.$route.params.id;

      this.post = await axios
        .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
        });
        

      if (this.post) {
        const { userId } = this.post
        this.user = await axios
          .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
          .then((res) => res.data)
          .catch((err) => {
            console.log(err);
          });

        this.comments = await axios
          .get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
          .then((res) => res.data)
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  watch: {
    $route() {
      this.getPost();
    },
  },
};
</script>

<style lang="scss" scoped>
.post-component {
  margin: 0 100px;
  position: sticky;
  margin-top: 20px;
  top: 20px;
  color: #424242;
  padding: 40px;
  background: #fff;
  border: 4px solid #424242;
  border-radius: 60px;
  text-align: center;
  transition: 300ms ease;
  .title {
    font-size: 20px;
    line-height: 20px;
    margin-bottom: 10px;
    text-transform: uppercase;
    text-align: center;
  }
  .user {
    margin-bottom: 10px;
    font-size: 14px;
    color: coral;
    gap: 30px
  }
  .comments-wrapper {
    margin-top: 20px;
    font-size: 16px;
    line-height: 16px;
    gap: 20px;
    .comments {
      .email {
      font-size: 12px;
      line-height: 12px;
      color: coral;
      margin-bottom: 5px;
    }
    .name {
      font-size: 12px;
      line-height: 12px;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    .body {
      font-size: 12px;
      line-height: 12px;
    }
    }
    
  }
}
</style>
