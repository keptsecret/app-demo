import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Setup from "./views/Setup.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "config",
      component: Setup
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About //() =>
      //import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/app",
      name: "home",
      component: Home
    }
  ]
});
