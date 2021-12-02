<template>
  <div class="groups-index">
    <div class="container mb30">
      <div class="row">
        <div class="col-md-3 mb40">
          <div class="mb40">
            <form>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="search"
                  aria-label="Email Id"
                  aria-describedby="basic-addon2"
                  v-model="locationFilter"
                />
                <div class="input-group-append">
                  <button type="button" class="input-group-text" id="basic-addon2">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>

          <!--/col-->
        </div>
        <div class="col-md-9">
          <article
            class="article-post mb70"
            v-for="group in orderBy(filterBy(groups, locationFilter, 'location', 'name'), sortAttribute, sortOrder)"
            v-bind:key="group.id"
          >
            <a class="post-thumb mb30" href="#">
              <img :src="group.image_url" alt="image of people" />
            </a>
            <!--thumb-->
            <div class="post-content">
              <a href="#">
                <h2 class="post-title">{{ group.name }}</h2>
              </a>
              <ul class="post-meta list-inline">
                {{
                  group.location
                }}
              </ul>

              <router-link :to="`/groups/${group.id}`" class="btn btn-outline-secondary">More Information</router-link>
            </div>
          </article>
        </div>
      </div>
    </div>
    <br />
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
