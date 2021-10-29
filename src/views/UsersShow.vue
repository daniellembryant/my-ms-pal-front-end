<template>
  <div class="users-show">
    <!-- Search Group by Name: -->
    <br />
    Search groups by name:
    <input v-model="nameFilter" list="names" />
    <datalist id="names">
      <option v-for="group in groups" v-bind:key="group.id">{{ group.name }}</option>
    </datalist>
    <br />
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

    <br />

    <button v-on:click="destroyUser()">Delete Profile</button>

    <h1>{{ `Welcome back ${currentUser.name}!` }}</h1>
    <!-- Quote from Quote API Goes Here (Flash Message) -->
    <img :src="currentUser.image_url" alt="profile picture" />
    <p>Location: {{ currentUser.location }}</p>
    <p>Age Group: {{ currentUser.age_group }}</p>
    <p>Diagnosis Date: {{ currentUser.diagnosis_date }}</p>
    <!-- Show what groups a user belongs to -->
    <h2>Your Groups</h2>
    <div v-for="group in currentUser.groups" v-bind:key="group.id">
      {{ group.name }}
      <img :src="group.image_url" alt="group image" />
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      currentUser: {},
      groups: [],
      nameFilter: "",
    };
  },
  created: function () {
    axios.get(`/users/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.currentUser = response.data;
    });
    this.indexGroups();
  },
  methods: {
    updateUser: function (user) {
      let editUserParams = user;
      axios
        .patch(`/users/${user.id}`, editUserParams)
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
    destroyUser: function () {
      if (confirm("Are you sure you want to delete your profile?")) {
        axios.delete(`/users/${this.currentUser.id}`).then((response) => {
          console.log(response.data);
          this.$parent.flashMessage = "Your profile has been sucessfully deleted";
          this.$router.push("/");
        });
      }
    },
    indexGroups: function () {
      axios.get("http://localhost:3000/groups").then((response) => {
        console.log(response.data);
        this.groups = response.data;
      });
    },
  },
};
</script>
