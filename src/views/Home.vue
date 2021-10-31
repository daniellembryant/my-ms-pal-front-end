<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h2>Join Our Community Specifically Dedicated to Those with Multiple Sclerosis</h2>
    <p>
      Connect with those who have Multiple Sclerosis(MS) and learn more about the disease and share information with
      those who understand what you're going through.
    </p>
    <img
      src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      alt="Group of People"
    />
    <br />
    <h2>Read About the Latest News About MS</h2>
    <h2>Need Some Motivation? Get Daily Motivational Quotes to Uplift Your Spirits</h2>
    <!-- <h2>{{ `Quote of the Day: "${quotes.content}"  ${quotes.author}` }}</h2> -->

    <h2>Join One or More of Our Groups and Make New Friends Within the Community</h2>
  </div>
</template>

<style></style>

<script>
// import axios from "axios";

export default {
  data: function () {
    return {
      message: "My MS Pal",
    };
  },
  created: function () {},
  methods: {
    // indexQuotes: function () {
    //   axios.get("/quotes").then((response) => {
    //     console.log(response.data.content);
    //     this.quotes = response.data;
    //   });
    // },
  },
};
</script>
