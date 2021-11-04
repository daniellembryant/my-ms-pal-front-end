<template>
  <div class="groups-show">
    <h1>Group Details</h1>
    <p>{{ group.name }}</p>
    <p>{{ group.summary }}</p>
    <p>{{ group.location }}</p>
    <img :src="group.image_url" alt="" />
    <!-- Should only appear if someone is an admin -->
    <div>
      <router-link :to="`/groups/${group.id}/edit`" v-if="user.admin">Edit</router-link>
      <br />
      <button v-if="user.admin" v-on:click="destroyGroup">Delete Group</button>
    </div>
    <!-- Group Members -->
    <h2>Members</h2>
    <div v-for="user in group.users" v-bind:key="user.id">
      {{ user.name }}
    </div>
    <button v-if="group.member" v-on:click="destroyUserGroup">Leave Group</button>
    <button v-else v-on:click="createUserGroup">Join Group</button>
    <h2>Group Messages</h2>
    <div v-for="message in group.messages" v-bind:key="message.id">
      {{ message.body }}
      <br />
      {{ message.user.name }}
      <br />
      {{ `created ${relativeDate(message.created_at)}` }}
      <br />
      <!-- Delete messages -->
      <button v-if="user.id == message.user_id || user.admin" v-on:click="destroyMessage(message)">
        Delete Message
      </button>
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
      </div>
    </form>
  </div>
  <!-- </div> -->
</template>

<style>
img {
  width: 70%;
  height: auto;
}
</style>

<script>
import axios from "axios";
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

export default {
  data: function () {
    return {
      group: {},
      newMessageParams: {},
      errors: [],
      user: {},
      currentUser: {},
    };
  },
  created: function () {
    axios.get(`/groups/${this.$route.params.id}`).then((response) => {
      console.log("group data", response.data);
      this.group = response.data;
    });
    axios.get(`/users/${localStorage.getItem("user_id")}`).then((response) => {
      console.log("user data", response.data);
      this.user = response.data;
    });
  },
  methods: {
    relativeDate: function (created_at) {
      return dayjs(created_at).fromNow();
    },
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
      let params = {
        body: this.newMessageParams.body,
        group_id: this.group.id,
      };
      axios
        .post("/messages", params)
        .then((response) => {
          console.log(response.data);
          this.group.messages.push(response.data);
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
      axios.delete(`/messages/${message.id}`).then((response) => {
        console.log(response.data);
        let index = this.group.messages.indexOf(message);
        this.group.messages.splice(index, 1);
      });
    },
    createUserGroup: function () {
      let params = {
        group_id: this.group.id,
      };
      axios
        .post("/user_groups", params)
        .then((response) => {
          console.log(response.data);
          this.group.users.push(response.data);
          this.group.member = true;
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    destroyUserGroup: function () {
      if (confirm("Are you sure you want to leave this group?")) {
        console.log("User said yes");
        axios.delete(`user_groups/${this.group.id}`).then((response) => {
          console.log(response.data);
          let index = this.group.users.indexOf(this.$parent.userID);
          this.group.users.splice(index, 1);
          this.group.member = false;
        });
      } else {
        console.log("User said no");
      }
    },
  },
};
</script>
