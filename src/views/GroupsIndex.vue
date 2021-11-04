<template>
  <div class="groups-index">
    <h1>Groups</h1>
    <div v-for="group in orderBy(groups, 'name')" v-bind:key="group.id">
      <h4>{{ group.name }}</h4>
      <img :src="group.image_url" alt="" />
      <p>{{ group.location }}</p>
      <router-link :to="`/groups/${group.id}`">More Information</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      groups: [],
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
