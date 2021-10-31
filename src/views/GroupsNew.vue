<template>
  <div class="signup">
    <form v-on:submit.prevent="createGroup()">
      <h1>New Group</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Name:</label>
        <input type="text" v-model="newGroupParams.name" />
      </div>
      <div>
        <label>Summay:</label>
        <input type="text" v-model="newGroupParams.summary" />
      </div>
      <div>
        <label>Location:</label>
        <input type="text" v-model="newGroupParams.location" />
      </div>
      <div>
        <label>Group Image URL:</label>
        <input type="image_url" v-model="newGroupParams.image_url" />
      </div>
      <input type="submit" value="Create" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newGroupParams: {},
      errors: [],
    };
  },
  methods: {
    createGroup: function () {
      axios
        .post("/groups", this.newGroupParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/groups");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
