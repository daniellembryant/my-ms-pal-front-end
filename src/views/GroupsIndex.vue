<template>
  <div class="groups-index">
    <br />
    <!-- Search Group by Name: -->
    <div>
      Group Search By Location:
      <input type="text" v-model="locationFilter" />
    </div>
    <!-- <div v-for="group in filterBy(groups, locationFilter, location)" v-bind:key="group.id">
      {{ group.name }}
    </div> -->
    <br />
    <h1>Groups</h1>
    <div
      v-for="group in orderBy(filterBy(groups, locationFilter, 'location'), sortAttribute, sortOrder)"
      v-bind:key="group.id"
    >
      <h4>{{ group.name }}</h4>
      <img :src="group.image_url" alt="" />
      <p>{{ group.location }}</p>
      <router-link :to="`/groups/${group.id}`">More Information</router-link>
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
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      groups: [],
      locationFilter: "",
      sortAttribute: "name",
      sortOrder: 1,
    };
  },
  created: function () {
    axios.get("/groups").then((response) => {
      console.log(response.data);
      this.groups = response.data;
    });
  },
  methods: {},
};
</script>
