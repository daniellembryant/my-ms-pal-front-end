<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <!-- <router-link to="/about">About</router-link>
      | -->
      <span v-if="isLoggedIn()">
        <!-- Need to figure out how to link profile page to user show page on page load-->
        <router-link :to="`/users/${currentUser.id}`">My Profile</router-link>
        |
        <router-link to="/groups">Groups</router-link>
        |
        <router-link to="/groups/new">New Group</router-link>
        |
        <router-link to="/logout">Logout</router-link>
      </span>
      <span v-else>
        <router-link to="/groups">Groups</router-link>
        |
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
import axios from "axios";

export default {
  data: function () {
    return {
      currentUser: {},
    };
  },
  created: function () {
    // check if currentUser.username === username and if that is true then pass in currentUser.id? i think the app is having an issue finding params.id because currently it doesnt exist . . . maybe we need to check if currentUser is who they are and then create a variable to store the currentUser id userId = currentUser.id, then pass that if into the params . . .
    axios
      .get(`/users/${this.$route.params.id}`)
      .then((response) => {
        console.log(response.data);
        this.currentUser = response.data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    isCurrentUser: function () {},
  },
};
</script>
