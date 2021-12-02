<template>
  <div class="groups-new">
    <div
      class="bg-parallax parallax-overlay accounts-page"
      data-jarallax='{"speed": 0.2}'
      style="background-image: url('/images/grouppeople.jpg')"
    >
      <div class="container">
        <div class="row pb30">
          <div class="mr-auto ml-auto col-sm-12">
            <h3 class="text-white text-center mb30">New Group</h3>
            <form v-on:submit.prevent="createGroup()">
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <div class="form-group">
                <input type="name" v-model="newGroupParams.name" class="form-control" placeholder="Name" />
              </div>

              <div class="form-group">
                <input type="summary" v-model="newGroupParams.summary" class="form-control" placeholder="Summary" />
              </div>
              <div class="form-group">
                <input type="location" v-model="newGroupParams.location" class="form-control" placeholder="Location" />
              </div>
              <div class="form-group">
                <input
                  type="meeting-notes"
                  v-model="newGroupParams.meeting_notes"
                  class="form-control"
                  placeholder="Meeting Notes"
                />
              </div>
              <div class="form-group">
                <input
                  type="meeting-url"
                  v-model="newGroupParams.meeting_url"
                  class="form-control"
                  placeholder="Meeting Link"
                />
              </div>
              <div class="form-group">
                <input
                  type="group-image-url"
                  v-model="newGroupParams.image_url"
                  class="form-control"
                  placeholder="Group Image URL"
                />
              </div>
              <div class="form-group">
                <button type="submit" value="Create" class="btn btn-rounded btn-primary btn-block">Create</button>
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
