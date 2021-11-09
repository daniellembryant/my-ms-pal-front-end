<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-faded nav-sticky">
      <div class="container">
        <button
          class="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <router-link class="navbar-brand" to="/">My MS Pal</router-link>
        <div id="navbarNavDropdown" class="navbar-collapse collapse">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li v-if="!isLoggedIn()" class="nav-item dropdown dropdown-full-width">
              <a
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <router-link style="color: #000000b3" to="/signup">Signup</router-link>
              </a>
            </li>
            <li v-if="!isLoggedIn()" class="nav-item dropdown dropdown-full-width">
              <a
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <router-link style="color: #000000b3" to="/login">Login</router-link>
              </a>
            </li>
            <li v-if="isLoggedIn()" class="nav-item dropdown dropdown-full-width">
              <a
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <router-link style="color: #000000b3" :to="`/users/${userID()}`">My Profile</router-link>
              </a>
            </li>
            <li v-if="isLoggedIn()" class="nav-item dropdown dropdown-full-width">
              <a
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Group Info
              </a>
              <ul class="dropdown-menu dropdown-mega-fw">
                <li v-if="isLoggedIn()" class="container">
                  <div class="mega-menu-content">
                    <div class="row">
                      <div class="col-lg-3">
                        <ul class="mega-inner-nav list-unstyled">
                          <li>
                            <router-link to="/groups">Groups</router-link>
                          </li>
                          <li><router-link to="/groups/new">Create Group</router-link></li>

                          <li><hr /></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>

            <li v-if="isLoggedIn()" class="nav-item dropdown active">
              <a
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                href="#"
              >
                <router-link style="color: #000000b3" to="/logout">Logout</router-link>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- <div id="nav"> -->
    <!-- <router-link to="/">Home</router-link>
      | -->
    <!-- <router-link to="/about">About</router-link>
      | -->
    <!-- <span v-if="isLoggedIn()"> -->
    <!-- <router-link :to="`/users/${userID()}`">My Profile</router-link>
        | -->
    <!-- <router-link to="/groups">Groups</router-link> -->
    <!-- | -->
    <!-- <router-link to="/groups/new">Create Group</router-link>
        | -->
    <!-- <router-link to="/logout">Logout</router-link> -->
    <!-- </span> -->
    <!-- <span v-else> -->
    <!-- <router-link to="/signup">Signup</router-link>
        | -->
    <!-- <router-link to="/login">Login</router-link> -->
    <!-- </span> -->
    <!-- </div> -->
    <router-view />
  </div>
</template>

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
