<template>
  <div class="groups-edit">
    <div
      class="bg-parallax parallax-overlay accounts-page"
      data-jarallax='{"speed": 0.2}'
      style="background-image: url('/images/hands-raising.jpg')"
    >
      <div class="container">
        <div class="row pb30">
          <div class="mr-auto ml-auto col-sm-12">
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
