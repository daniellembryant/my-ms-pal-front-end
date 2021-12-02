<template>
  <div class="login">
    <div
      class="bg-parallax parallax-overlay accounts-page"
      data-jarallax='{"speed": 0.2}'
      style="background-image: url('images/loginfolks.jpg')"
    >
      <div class="container">
        <div class="row pb30">
          <div class="col-lg-4 col-md-6 mr-auto ml-auto col-sm-8">
            <h3 class="text-white text-center mb30">Login to continue</h3>
            <form v-on:submit.prevent="submit()">
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <div class="form-group">
                <input type="email" v-model="newSessionParams.email" class="form-control" placeholder="Email" />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  v-model="newSessionParams.password"
                  class="form-control"
                  placeholder="Password"
                />
              </div>
              <div class="form-group">
                <button type="submit" value="Submit" class="btn btn-rounded btn-primary btn-block">Sign In</button>
              </div>
              <hr />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newSessionParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.newSessionParams = {};
        });
    },
  },
};
</script>
