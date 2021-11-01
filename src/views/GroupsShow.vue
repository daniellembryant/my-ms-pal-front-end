<template>
  <div class="groups-show">
    <h1>Group Details</h1>
    <p>{{ group.name }}</p>
    <p>{{ group.summary }}</p>
    <p>{{ group.location }}</p>
    <img :src="group.image_url" alt="" />
    <!-- <div v-if="currentUser.admin"> -->
    <router-link :to="`/groups/${group.id}/edit`">Edit</router-link>
    <br />
    <button v-on:click="destroyGroup">Delete Group</button>
    <h2>Group Messages</h2>
    <div v-for="message in group.messages" v-bind:key="message.id">
      {{ message.body }}
      <br />
      <button v-on:click="destroyMessage(message.id)">Delete Message</button>
    </div>
    <!-- Message create form -->
    <form v-on:submit.prevent="createMessage">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <h2>New Message:</h2>
        <input type="text" v-model="newMessageParams.body" />
      </div>
      <div>
      <input type="submit" value="Add Message" />
    </form>
  </div>
  <!-- </div> -->
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      group: {},
      message: {},
      currentUser: {},
      newMessageParams: {},
      errors: [],
    };
  },
  created: function () {
    axios.get(`/groups/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.group = response.data;
      console.log(response.data.messages.id);
    });
  },
  methods: {
    destroyGroup: function () {
      if (confirm("Are you sure you want to delete this group?")) {
        console.log("User said yes");
      } else {
        console.log("User said no");
      }
      axios.delete(`/groups/${this.group.id}`).then((response) => {
        console.log(response.data);
        this.$router.push("/groups");
      });
    },
    createMessage: function () {
      var params = {
        body: this.newMessageParams.body,
        group_id: this.group.id,
      };
      axios
        .post("/messages", params)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/groups");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    destroyMessage: function (message) {
      if (confirm("Are you sure you want to delete this message?")) {
        console.log("User said yes");
      } else {
        console.log("User said no");
      }
      axios.delete(`/messages/${message}`).then((response) => {
        console.log(response.data);
        let index = this.messages.indexOf(message);
        this.groups.splice(index, 1);
      });
    },
    groupID: function () {
      return localStorage.getItem("group_id");
    },
  },
};
</script>
