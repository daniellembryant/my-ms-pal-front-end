<template>
  <div class="users-show">
    <button v-on:click="showUser(currentUser)">Edit Profile</button>
    <dialog id="edit-profile">
      <form method="dialog">
        <h1>Edit Profile</h1>
        <p>
          Name:
          <input type="text" v-model="currentUser.name" />
        </p>
        <p>
          Email:
          <input type="text" v-model="currentUser.email" />
        </p>
        <p>
          Age Group:
          <input type="text" v-model="currentUser.age_group" />
        </p>
        <p>
          Location:
          <input type="text" v-model="currentUser.location" />
        </p>
        <p>
          Profile Picture:
          <input type="text" v-model="currentUser.image_url" />
        </p>
        <button v-on:click="updateUser(currentUser)">Update</button>
        <button>Close</button>
      </form>
    </dialog>

    <!-- Need to get group search to work -->
    <!-- Search Group by Name:
    <input v-model="nameFilter" list="names" />
    <datalist id="names">
      <option v-for="group in groups" v-bind:key="group.id">{{ group.name }}</option>
    </datalist>
    <br /> -->
    <!-- <router-link :to="`/users/${currentUser.id}/edit`" type="button" class="users-edit">Edit Profile</router-link> -->
    <br />
    <button v-on:click="destroyProfile()">Delete Profile</button>
    <h1>{{ `Welcome back ${currentUser.name}!` }}</h1>
    <!-- Quote from Quote API Goes Here (Flash Message) -->
    <img :src="currentUser.image_url" alt="profile picture" />
    <p>Location: {{ currentUser.location }}</p>
    <p>Age Group: {{ currentUser.age_group }}</p>
    <p>Diagnosis Date: {{ currentUser.diagnosis_date }}</p>
    <!-- Show user group informaiton if user is a part of a group -->
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      currentUser: {},
      userGroup: {},
      nameFilter: "",
    };
  },
  created: function () {
    axios.get(`/users/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.currentUser = response.data;
    });
    // axios.get(`/user_groups/${this.$route.params.id}`).then((response) => {
    //   console.log(response.data);
    //   this.userGroups = response.data;
    // });
  },
  methods: {
    updateUser: function (user) {
      let editUserParams = user;
      axios
        .patch(`/users/${this.user.id}`, editUserParams)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    showUser: function (user) {
      console.log(user);
      this.currentUser = user;
      document.querySelector("#edit-profile").showModal();
    },
    destroyUser: function (user) {
      axios.delete(`http://localhost:3000/users/${user.id}`).then((response) => {
        console.log("Your profile has been sucessfully deleted,", response.data);
      });
    },
  },
};
</script>
