<template>
  <div class="users-show">
    <form v-on:submit.prevent="updateUser()">
      <h1>Edit Profile</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error" {{ error }}></li>
      </ul>
      <div>
        <label>Name:</label>
        <input type="text" v-model="editUserParams.name" />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" v-model="editUserParams.email" />
      </div>
      <div>
        <label>Age Group:</label>
        <input type="text" v-model="editUserParams.age_group" />
      </div>
      <div>
        <label>Location:</label>
        <input type="text" v-model="editUserParams.location" />
      </div>
      <!-- Need to figure out how to update an image url -->
      <div>
        <label>Profile Picture:</label>
        <input type="text" v-model="editUserParams.image_url" />
      </div>
      <input type="submit" value="Update" />
    </form>

    <!-- Need to get group search to work -->
    Search Group by Name:
    <input v-model="nameFilter" list="names" />
    <datalist id="names">
      <option v-for="group in groups" v-bind:key="group.id">{{ group.name }}</option>
    </datalist>
    <br />
    <router-link :to="`/users/${currentUser.id}/edit`" type="button" class="users-show">Edit Profile</router-link>
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
      groups: [],
      editUserParams: {},
      errors: [],
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
    updateUser: function () {
      axios
        .patch(`/users/${this.editUserParams.id}`, this.editUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push(`/users/${response.data.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function (user) {
      axios.delete(`http://localhost:3000/users/${user.id}`).then((response) => {
        console.log("Your profile has been sucessfully deleted,", response.data);
      });
    },
  },
};
</script>
