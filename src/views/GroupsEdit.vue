<template>
  <div class="groups-edit">
    <div
      class="bg-parallax parallax-overlay accounts-page"
      data-jarallax='{"speed": 0.2}'
      style="background-image: url('images/bg6.jpg')"
    >
      <div class="container">
        <div class="row pb30">
          <div class="col-lg-4 col-md-6 mr-auto ml-auto col-sm-8">
            <h3 class="text-white text-center mb30">Edit Group Information</h3>
            <form v-on:submit.prevent="updateGroup()">
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <div class="form-group">
                <input type="name" v-model="editGroupParams.name" class="form-control" placeholder="Name" />
              </div>
              <div class="form-group">
                <input type="summary" v-model="editGroupParams.summary" class="form-control" placeholder="Summary" />
              </div>
              <div class="form-group">
                <input type="location" v-model="editGroupParams.location" class="form-control" placeholder="Location" />
              </div>
              <div class="form-group">
                <input
                  type="meeting-notes"
                  v-model="editGroupParams.meeting_notes"
                  class="form-control"
                  placeholder="Meeting Notes"
                />
              </div>
              <div class="form-group">
                <input
                  type="meeting-url"
                  v-model="editGroupParams.meeting_url"
                  class="form-control"
                  placeholder="Meeting Link"
                />
              </div>
              <div class="form-group">
                <input
                  type="group-image-url"
                  v-model="editGroupParams.image_url"
                  class="form-control"
                  placeholder="Group Image URL"
                />
              </div>
              <div class="form-group">
                <button type="submit" value="Update" class="btn btn-rounded btn-primary btn-block">Update</button>
              </div>
              <hr />
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- My Code -->
    <!-- <form v-on:submit.prevent="updateGroup()">
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
    </form> -->
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
