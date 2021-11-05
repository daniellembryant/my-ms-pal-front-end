<template>
  <div class="groups-edit">
    <form v-on:submit.prevent="updateGroup()">
      <h1>Edit Group</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Name:</label>
        <input type="text" v-model="editGroupParams.name" />
      </div>
      <div>
        <label>Summay:</label>
        <input type="text" v-model="editGroupParams.summary" />
      </div>
      <div>
        <label>Location:</label>
        <input type="text" v-model="editGroupParams.location" />
      </div>
      <div>
        <label>Meeting Notes:</label>
        <input type="text" v-model="editGroupParams.meeting_notes" />
      </div>
      <div>
        <label>Meeting URL:</label>
        <input type="text" v-model="editGroupParams.meeting_url" />
      </div>

      <div>
        <label>Group Image URL:</label>
        <input type="image_url" v-model="editGroupParams.image_url" />
      </div>
      <input type="submit" value="Update" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      editGroupParams: {},
      errors: [],
      group: {},
    };
  },
  created: function () {
    axios.get(`/groups/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.editGroupParams = response.data;
    });
  },
  methods: {
    updateGroup: function () {
      axios
        .patch(`/groups/${this.editGroupParams.id}`, this.editGroupParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push(`/groups/${response.data.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
