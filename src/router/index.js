import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import UsersShow from "../views/UsersShow.vue";
import GroupsIndex from "../views/GroupsIndex.vue";
import GroupsNew from "../views/GroupsNew.vue";
import GroupsShow from "../views/GroupsShow.vue";
import GroupsEdit from "../views/GroupsEdit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
  },
  {
    path: "/users/:id",
    name: "user-show",
    component: UsersShow,
  },
  {
    path: "/groups",
    name: "groups",
    component: GroupsIndex,
  },
  {
    path: "/groups/new",
    name: "groups-new",
    component: GroupsNew,
  },
  {
    path: "/groups/:id",
    name: "groups-show",
    component: GroupsShow,
  },
  {
    path: "/groups/:id/edit",
    name: "groups-edit",
    component: GroupsEdit,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
