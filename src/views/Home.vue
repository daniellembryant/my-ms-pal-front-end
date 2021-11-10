<template>
  <div class="home">
    <head>
      <!-- Required meta tags -->
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

      <!-- Plugins CSS -->
      <link href="/classic-template/html/css/plugins/plugins.css" rel="stylesheet" />
      <!-- REVOLUTION STYLE SHEETS -->
      <link rel="stylesheet" type="text/css" href="/classic-template/html/revolution/css/settings.css" />
      <!-- REVOLUTION LAYERS STYLES -->
      <link rel="stylesheet" type="text/css" href="/classic-template/html/revolution/css/layers.css" />
      <!-- REVOLUTION NAVIGATION STYLES -->
      <link rel="stylesheet" type="text/css" href="/classic-template/html/revolution/css/navigation.css" />
      <link href="/classic-template/html/css/shop-style.css" rel="stylesheet" />
    </head>
    <div
      class="page-titles-img title-space-lg bg-parallax parallax-overlay"
      data-jarallax='{"speed": 0.2}'
      style="background-image: url('/images/women-connecting.jpg')"
    >
      <div class="container">
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto">
            <h1 class="text-uppercase">My MS Pal: The Social Site For People With Multiple Sclerosis</h1>
          </div>
        </div>
      </div>
    </div>
    <!--page title end-->
    <div class="container-fluid no-padding mb40">
      <div class="row no-margin">
        <div class="col-lg-8 mr-auto ml-auto">
          <div class="title-heading1 mb30">
            <h3>Join the Community</h3>
          </div>
          <p class="lead mb50 text-center">
            Connect with those who have Multiple Sclerosis(MS), read the latest news about MS, and get inspiration when
            you need it the most.
          </p>
        </div>
      </div>
      <div class="row no-margin">
        <div class="col-lg-3 col-md-6 mb30 no-padding">
          <div class="team-card">
            <img src="/images/group-of-women.jpg" alt="" class="img-fluid" />
            <div class="team-overlay align-items-center">
              <div class="team-detail">
                <h4>Make New Friends</h4>

                <div class="seprator-overlay"></div>
              </div>
            </div>
          </div>
        </div>
        <!--/col-->
        <div class="col-lg-3 col-md-6 mb30 no-padding">
          <div class="team-card">
            <img src="/images/guys-laughing.jpg" alt="" class="img-fluid" />
            <div class="team-overlay align-items-center">
              <div class="team-detail">
                <h4>Build New Relationships</h4>

                <div class="seprator-overlay"></div>
              </div>
            </div>
          </div>
        </div>
        <!--/col-->
        <div class="col-lg-3 col-md-6 mb30 no-padding">
          <div class="team-card">
            <img src="/images/black-door.jpg" alt="" class="img-fluid" />
            <div class="team-overlay align-items-center">
              <div class="team-detail">
                <h4>Stay Motivated</h4>

                <div class="seprator-overlay"></div>
              </div>
            </div>
          </div>
        </div>
        <!--/col-->
        <div class="col-lg-3 col-md-6 mb30 no-padding">
          <div class="team-card">
            <img src="/images/couple-dancing.jpg" alt="" class="img-fluid" />
            <div class="team-overlay align-items-center">
              <div class="team-detail">
                <h4>Stay Connected</h4>

                <div class="seprator-overlay"></div>
              </div>
            </div>
          </div>
        </div>
        <!--/col-->
      </div>
    </div>
    <div class="bg-faded">
      <div class="container pt100 pb60">
        <div class="title-heading1 mb40">
          <h3>Inspirational Quotes</h3>
          <h2>{{ `"${quotes.content}"  ${quotes.author}` }}</h2>
        </div>
      </div>
    </div>

    <!-- My code -->
    <!-- <h1>{{ message }}</h1>
    <h2>Join Our Community Specifically Dedicated to Those with Multiple Sclerosis</h2>
    <h2>
      Connect with those who have Multiple Sclerosis(MS) and learn more about the disease and how to manage it by
      sharing experiences with those within the community
    </h2>
    <h2>Make new friends and join one of our groups</h2>
    <img
      src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      alt="Group of People"
    /> -->
    <!-- <br />
    <h2>Read About the Latest News About MS</h2>
    <h2>Need Some Motivation? Get Daily Motivational Quotes to Uplift Your Spirits</h2> -->
    <!-- Inspirational Quotes API -->
    <!-- <h2>{{ `Inspirational Quote: "${quotes.content}"  ${quotes.author}` }}</h2>
    <h2>Some of Our Groups</h2>
    <div v-for="group in groups.slice(0, 2)" v-bind:key="group.id">
      <h4>{{ group.name }}</h4>
      <img :src="group.image_url" alt="" />
    </div> -->
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
