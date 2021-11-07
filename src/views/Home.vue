<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h2>Join Our Community Specifically Dedicated to Those with Multiple Sclerosis</h2>
    <h2>
      Connect with those who have Multiple Sclerosis(MS) and learn more about the disease and how to manage it by
      sharing experiences with those within the community
    </h2>
    <h2>Make new friends and join one of our groups</h2>
    <img
      src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      alt="Group of People"
    />
    <br />
    <h2>Read About the Latest News About MS</h2>
    <h2>Need Some Motivation? Get Daily Motivational Quotes to Uplift Your Spirits</h2>
    <!-- Inspirational Quotes API -->
    <h2>{{ `Inspirational Quote: "${quotes.content}"  ${quotes.author}` }}</h2>
    <h2>Some of Our Groups</h2>
    <div v-for="group in groups.slice(0, 2)" v-bind:key="group.id">
      <h4>{{ group.name }}</h4>
      <img :src="group.image_url" alt="" />
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "MS Connect",
      quotes: [],
      groups: [],
      notification: {},
    };
  },
  created: function () {
    this.indexQuotes();
    axios.get("/groups").then((response) => {
      console.log(response.data);
      this.groups = response.data;
    });
  },
  methods: {
    indexQuotes: function () {
      axios.get("/quotes").then((response) => {
        console.log(response.data.content);
        this.quotes = response.data;
      });
    },
  },
};
</script>
