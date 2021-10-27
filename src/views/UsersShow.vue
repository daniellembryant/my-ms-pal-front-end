<template>
  <div class="users-show">
    <button v-on:click="destroyProfile()">Delete Profile</button>
    <h1>{{ message }}</h1>
    <!-- Quote from Quote API Goes Here (Flash Message) -->
    <img :src="user.image_url" alt="profile picture" />
    <p>Location: {{ user.location }}</p>
    <p>Age Group: {{ user.age_group }}</p>
    <p>Diagnosis Date: {{ user.diagnosis_date }}</p>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: `Welcome to the My MS Pal Community ${user.name}`,
      user: {},
    };
  },
  created: function () {
    axios.get(`/users/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {
    destroyUser: function (user) {
      axios.delete(`http://localhost:3000/users/${user.id}`).then((response) => {
        console.log("Your profile has been sucessfully deleted,", response.data);
      });
    },
  },
};
</script>
