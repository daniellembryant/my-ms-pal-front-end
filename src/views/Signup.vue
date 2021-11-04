<template>
  <div class="signup">
    <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Name:</label>
        <input type="text" v-model="newUserParams.name" />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" v-model="newUserParams.email" />
      </div>
      <div>
        <label>Age Group:</label>
        <!-- Need to insert drop down with age group options -->
        <select v-model="newUserParams.age_group">
          <option disabled value="">Please select one</option>
          <option value="18-35">18-35</option>
          <option value="36-50">36-50</option>
          <option value="51+">51+</option>
        </select>
        <span>Selected: {{ selected }}</span>

        <!-- <input type="age_group" 
        v-model="newUserParams.age_group" /> -->
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="newUserParams.password" />
      </div>
      <div>
        <label>Password confirmation:</label>
        <input type="password" v-model="newUserParams.password_confirmation" />
      </div>
      <div>
        <label>Location:</label>
        <input type="location" v-model="newUserParams.location" />
      </div>
      <div>
        <label>Diagnosis Date:</label>
        <input type="diagnosis_date" v-model="newUserParams.diagnosis_date" />
      </div>
      <div>
        <label>Image URL:</label>
        <input type="image_url" v-model="newUserParams.image_url" />
      </div>
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
      selected: "",
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
