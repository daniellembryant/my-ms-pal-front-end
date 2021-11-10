<template>
  <div class="signup">
    <div
      class="bg-parallax parallax-overlay accounts-page"
      data-jarallax='{"speed": 0.2}'
      style="background-image: url('images/signupfolks.jpg')"
    >
      <div class="container">
        <div class="row pb30">
          <div class="col-lg-4 col-md-6 mr-auto ml-auto col-sm-8">
            <h3 class="text-white text-center mb30">Sign Up</h3>
            <form v-on:submit.prevent="submit()">
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <div class="form-group">
                <input type="name" v-model="newUserParams.name" class="form-control" placeholder="Name" />
              </div>
              <div class="form-group">
                <input type="email" v-model="newUserParams.email" class="form-control" placeholder="Email" />
              </div>
              <div class="form-group">
                <label class="age-group">Age Group</label>
                <!-- <input
                  type="age-group"
                  v-model="newUserParams.age_group"
                  class="form-control"
                  placeholder="Age Group"
                /> -->
                <select type="age-group" v-model="newUserParams.age_group" class="form-control" placeholder="Age Group">
                  <option disabled value="">Please select one</option>
                  <option value="18-35">18-35</option>
                  <option value="36-50">36-50</option>
                  <option value="51+">51+</option>
                </select>
              </div>
              <div class="form-group">
                <input type="password" v-model="newUserParams.password" class="form-control" placeholder="Password" />
              </div>
              <div class="form-group">
                <input
                  type="consfirm-password"
                  v-model="newUserParams.password_confirmation"
                  class="form-control"
                  placeholder="Confirm Password"
                />
              </div>
              <div class="form-group">
                <input type="location" v-model="newUserParams.location" class="form-control" placeholder="Location" />
              </div>
              <div class="form-group">
                <input
                  type="diagnosis-date"
                  v-model="newUserParams.diagnosis_date"
                  class="form-control"
                  placeholder="Diagnosis Date(yyyy-mm-dd)"
                />
              </div>
              <div class="form-group">
                <input
                  type="image-url"
                  v-model="newUserParams.image_url"
                  class="form-control"
                  placeholder="Image URL"
                />
              </div>
              <div class="form-group">
                <button type="submit" value="Submit" class="btn btn-rounded btn-primary btn-block">Submit</button>
              </div>

              <hr />
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- My code -->
    <!-- <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul> -->
    <!-- <div>
        <label>Name:</label>
        <input type="text" v-model="newUserParams.name" />
      </div> -->
    <!-- <div>
        <label>Email:</label>
        <input type="email" v-model="newUserParams.email" />
      </div> -->
    <!-- <div> -->
    <!-- <label>Age Group:</label> -->
    <!-- Need to insert drop down with age group options -->
    <!-- <select v-model="newUserParams.age_group">
          <option disabled value="">Please select one</option>
          <option value="18-35">18-35</option>
          <option value="36-50">36-50</option>
          <option value="51+">51+</option>
        </select> -->
    <!-- <span>Selected: {{ selected }}</span> -->

    <!-- <input type="age_group" 
        v-model="newUserParams.age_group" /> -->
    <!-- </div> -->
    <!-- <div>
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
        <label>Diagnosis Date (yyyy-mm-dd):</label>
        <input type="diagnosis_date" v-model="newUserParams.diagnosis_date" />
      </div>
      <div>
        <label>Image URL:</label>
        <input type="image_url" v-model="newUserParams.image_url" />
      </div>
      <input type="submit" value="Submit" />
    </form> -->
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
