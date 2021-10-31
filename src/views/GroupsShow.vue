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
  </div>
  <!-- </div> -->
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      group: {},
    };
  },
  created: function () {
    axios.get(`/groups/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.group = response.data;
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
  },
};
</script>
