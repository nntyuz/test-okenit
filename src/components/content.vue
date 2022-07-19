<template lang="pug">
.content-component.flex
  .sidebar.flex.column
    select(v-model="user" @change="filter")
      option All
      option(v-for="user in users" :key="user") {{ user.name }}
    router-link.post-wrapper.flex.column(v-for="(post, idx) in posts" :key="idx" :to="`/post/${post.id}`")
      .title {{ `#${post.id} ${post.title}` }}
      .post {{ post.body }}
  .information
    router-view
</template>

<script>
import axios from "axios";
export default {
  name: "ContentComponent",
  data() {
    return {
      user: 'All',
      posts: [],
      users: [],
    };
  },
  created() {
    this.getPosts();
    this.getUsers();
  },
  methods: {
    async getPosts () {
      this.posts = await axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
        });
    },
    async getUsers() {
      this.users = await axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
        });
    },
    async filter() {
      if (this.user === 'All') {
        this.getPosts()
        return
      }

      const user = this.users.find(a => a.name === this.user)
      if (user) {
        this.posts = await axios
          .get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
          .then((res) => res.data)
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content-component {
  background: #222222;
  .sidebar {
    padding: 20px;
    width: 30%;
    border-right: 4px solid #fff;
    .post-wrapper {
      gap: 10px;
      padding: 15px 0;
      border-bottom: 1px solid #424242;
      cursor: pointer;
      transition: 300ms ease;
      &:hover {
        background: #424242;
      }
      .title {
        font-size: 14px;
        line-height: 18px;
        color: #fff;
      }
      .post {
        font-size: 14px;
        line-height: 14px;
        color: #828282;
      }
    }
  }
  .information {
    width: 100%;
  }
  select {
    padding: 0 12px;
    background: #fff;
    cursor: pointer;
    outline: none;
    border: none;
    width: 300px;
    height: 40px;
    border-radius: 10px;
    color: #424242;
    margin-bottom: 20px;
  }
}
</style>
