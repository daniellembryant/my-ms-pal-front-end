<template>
  <div class="groups-show">
    <div class="container mb30">
      <div class="row">
        <div class="col-md-3 mb40">
          <div class="mb40">
            <!-- Insert Edit Group and Group Delete -->
            <button v-if="user.admin" class="btn btn-outline-secondary">
              <router-link style="color: purple" :to="`/groups/${group.id}/edit`" v-if="user.admin">
                Edit Group
              </router-link>
            </button>
            <br />
            <br />
            <button v-if="user.admin" v-on:click="destroyGroup" class="btn btn-outline-secondary">Delete Group</button>
            <br />
            <br />
            <button v-if="group.member" v-on:click="destroyUserGroup" class="btn btn-outline-secondary">
              Leave Group
            </button>
            <button v-else v-on:click="createUserGroup" class="btn btn-outline-secondary">Join Group</button>
          </div>
          <!--/col-->
          <div class="mb40">
            <h4 class="sidebar-title">Group Members</h4>
            <ul class="list-unstyled">
              <li class="">
                <div v-for="user in group.users" v-bind:key="user.id" class="media-body">
                  {{ user.name }}
                </div>
              </li>
            </ul>
          </div>
          <!--/col-->
          <div>
            <h4 class="sidebar-title">Group Messages</h4>
            <ul class="list-unstyled">
              <li class="">
                <div v-for="message in group.messages" v-bind:key="message.id" class="media-body media-body-group">
                  {{ message.body }}
                  <br />
                  {{ message.user.name }}
                  <br />
                  {{ `created ${relativeDate(message.created_at)}` }}
                  <br />
                  <button
                    v-if="user.id == message.user_id || user.admin"
                    class="btn btn-outline-secondary"
                    v-on:click="destroyMessage(message)"
                  >
                    Delete Message
                  </button>
                </div>
              </li>
              <form v-on:submit.prevent="createMessage">
                <ul>
                  <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                </ul>
                <div>
                  <br />
                  <h4>New Message:</h4>
                  <input class="media-body-group" type="text" v-model="newMessageParams.body" />
                </div>
                <div>
                  <button type="submit" class="btn btn-outline-secondary">Add Message</button>
                </div>
              </form>
            </ul>
          </div>
        </div>
        <div class="col-md-9">
          <article class="article-post mb70">
            <div class="post-thumb mb30">
              <img :src="group.image_url" :alt="group.meeting_notes" class="img-fluid" />
            </div>
            <!--thumb-->
            <div class="post-content">
              <a href="#">
                <h2 class="post-title">{{ group.name }}</h2>
              </a>
              <b>
                <p>{{ group.summary }}</p>
              </b>
              <b>
                <p>{{ group.location }}</p>
              </b>
              <b>
                <p class="media-body-group">{{ group.meeting_notes }}</p>
              </b>
              <button class="btn btn-outline-secondary">
                <a
                  :href="group.meeting_url"
                  v-bind:key="group.meeting_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="color: purple"
                >
                  Click to Join Meeting
                </a>
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
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
      groups: [],
      newNotificationParams: {},
      notifications: [],
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
        axios.delete(`/groups/${this.group.id}`).then((response) => {
          console.log(response.data);
          this.$router.push("/groups");
        });
      }
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
      this.newMessageParams = {};
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
