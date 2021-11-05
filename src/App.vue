<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <!-- <router-link to="/about">About</router-link>
      | -->
      <span v-if="isLoggedIn()">
        <router-link :to="`/users/${userID()}`">My Profile</router-link>
        |
        <router-link to="/groups">Groups</router-link>
        |
        <router-link to="/groups/new">New Group</router-link>
        |
        <router-link to="/logout">Logout</router-link>
      </span>
      <span v-else>
        <router-link to="/signup">Signup</router-link>
        |
        <router-link to="/login">Login</router-link>
      </span>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
// import axios from "axios";

export default {
  data: function () {
    return {
      currentUser: {},
    };
  },
  created: function () {},

  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    userID: function () {
      return localStorage.getItem("user_id");
    },
  },
};
</script>
