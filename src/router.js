import { createRouter, createWebHistory } from "vue-router";

import Home from "./components/home";
import Post from "./components/post";

const routes = [
  { name: "home", path: "/", component: Home },
  { name: "post", path: "/post/:id", component: Post },
];

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

export default router;
