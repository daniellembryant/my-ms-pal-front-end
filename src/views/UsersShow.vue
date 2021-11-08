<template>
  <div class="users-show">
    <br />
    <br />
    <div class="container pb50">
      <div class="row">
        <div class="col-md-9 mb40">
          <article>
            <h2>{{ `Welcome back ${currentUser.name}!` }}</h2>
            <br />
            <h4>{{ `Inspirational Quote: "${quotes.content}"  ${quotes.author}` }}</h4>
            <br />
            <img :src="currentUser.image_url" alt="" class="img-fluid mb30" />

            <div class="post-content">
              <ul class="post-meta list-inline">
                <li class="list-inline-item">
                  <i class=""></i>
                  <a href="#">Location: {{ currentUser.location }}</a>
                </li>
                <li class="list-inline-item">
                  <i class="f"></i>
                  <a href="#">Diagnosis Date: {{ currentUser.diagnosis_date }}</a>
                </li>
                <li class="list-inline-item">
                  <i class=""></i>
                  <a href="#">Age Group: {{ currentUser.age_group }}</a>
                </li>
              </ul>
              <!-- <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
                massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
                felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede
                justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
              </p> -->
              <h4>Your Groups</h4>
              <div v-for="group in orderBy(currentUser.groups, 'name')" v-bind:key="group.id">
                {{ group.name }}
                <br />
                <img :src="group.image_url" alt="group image" />
              </div>
            </div>
          </article>
          <!-- post article-->
        </div>
        <div class="col-md-3 mb40">
          <button v-on:click="showUser(currentUser)">Edit Profile</button>
          <dialog id="edit-profile">
            <form method="dialog">
              <h1>Edit Profile</h1>
              <p>
                Name:
                <input type="text" v-model="currentUser.name" />
              </p>
              <p>
                Email:
                <input type="text" v-model="currentUser.email" />
              </p>
              <p>
                Age Group:
                <select v-model="currentUser.age_group">
                  <option disabled value="">Please select one</option>
                  <option value="18-35">18-35</option>
                  <option value="36-50">36-50</option>
                  <option value="51+">51+</option>
                </select>
                <span>Selected: {{ selected }}</span>
              </p>
              <p>
                Location:
                <input type="text" v-model="currentUser.location" />
              </p>
              <p>
                Diagnosis Date (yyyy-mm-dd):
                <input type="text" v-model="currentUser.diagnosis_date" />
              </p>
              <p>
                Profile Picture:
                <input type="text" v-model="currentUser.image_url" />
              </p>
              <button v-on:click="updateUser(currentUser)">Update</button>
              <button>Close</button>
            </form>
            <br />
          </dialog>
          <!--/col-->

          <div class="mb40">
            <br />
            <button v-on:click="destroyUser()">Delete Profile</button>
            <br />
            <br />
          </div>
          <!--/col-->
          <div>
            <h4 class="sidebar-title">Latest Articles</h4>
            <li class="media">
              <ul class="list-unstyled">
                <div v-for="article in articles.slice(1, 5)" v-bind:key="article.id" class="media-body">
                  <a
                    :href="article.url"
                    v-bind:key="article.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="mt-0 mb-1"
                  >
                    {{ article.title }}
                    {{ article.author }}
                  </a>
                </div>
              </ul>
            </li>
          </div>
        </div>
      </div>
    </div>
    <!-- My Code -->
    <!-- <button v-on:click="showUser(currentUser)">Edit Profile</button> -->
    <!-- <dialog id="edit-profile">
      <form method="dialog">
        <h1>Edit Profile</h1>
        <p>
          Name:
          <input type="text" v-model="currentUser.name" />
        </p>
        <p>
          Email:
          <input type="text" v-model="currentUser.email" />
        </p>
        <p>
          Age Group:
          <select v-model="currentUser.age_group">
            <option disabled value="">Please select one</option>
            <option value="18-35">18-35</option>
            <option value="36-50">36-50</option>
            <option value="51+">51+</option>
          </select>
          <span>Selected: {{ selected }}</span>
        </p>
        <p>
          Location:
          <input type="text" v-model="currentUser.location" />
        </p>
        <p>
          Diagnosis Date (yyyy-mm-dd):
          <input type="text" v-model="currentUser.diagnosis_date" />
        </p>
        <p>
          Profile Picture:
          <input type="text" v-model="currentUser.image_url" />
        </p>
        <button v-on:click="updateUser(currentUser)">Update</button>
        <button>Close</button>
      </form>
    </dialog> -->

    <!-- <br /> -->

    <!-- <button v-on:click="destroyUser()">Delete Profile</button> -->

    <!-- <h1>{{ `Welcome back ${currentUser.name}!` }}</h1> -->
    <!-- Articles -->
    <!-- <h2>Latest Articles Concerning MS</h2> -->
    <!-- <ul>
      <div v-for="article in articles.slice(1, 5)" v-bind:key="article.id">
        <a :href="article.url" v-bind:key="article.url" target="_blank" rel="noopener noreferrer">
          {{ article.title }}
          {{ article.author }}
        </a>
      </div>
    </ul> -->

    <!-- Inspirational Quotes API -->
    <!-- <h2>{{ `Inspirational Quote: "${quotes.content}"  ${quotes.author}` }}</h2> -->

    <!-- <img :src="currentUser.image_url" alt="profile picture" /> -->
    <!-- <p>Location: {{ currentUser.location }}</p> -->
    <!-- <p>Age Group: {{ currentUser.age_group }}</p> -->
    <!-- <p>Diagnosis Date (yyyy-mm-dd): {{ currentUser.diagnosis_date }}</p> -->
    <!-- Show what groups a user belongs to -->
    <!-- <h4>Your Groups</h4> -->
    <!-- <div v-for="group in orderBy(currentUser.groups, 'name')" v-bind:key="group.id"> -->
    <!-- {{ group.name }} -->
    <!-- <br /> -->
    <!-- <img :src="group.image_url" alt="group image" /> -->
    <!-- </div> -->
  </div>
</template>

<style>
img {
  width: 60%;
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
      currentUser: {},
      groups: [],
      quotes: [],
      articles: [],
      selected: "",
    };
  },
  created: function () {
    axios
      .get(`/users/${this.$route.params.id}`)
      .then((response) => {
        console.log(response.data);
        this.currentUser = response.data;
      })
      .catch((error) => console.log(error));
    this.indexGroups();
    // news article api
    this.indexArticles();
    // quotes api
    this.indexQuotes();
  },
  methods: {
    updateUser: function (user) {
      let editUserParams = user;
      axios
        .patch(`/users/${user.id}`, editUserParams)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    showUser: function (user) {
      console.log(user);
      this.currentUser = user;
      document.querySelector("#edit-profile").showModal();
    },
    destroyUser: function () {
      if (confirm("Are you sure you want to delete your profile?")) {
        axios.delete(`/users/${this.currentUser.id}`).then((response) => {
          console.log(response.data);
          this.$parent.flashMessage = "Your profile has been sucessfully deleted";
          this.$router.push("/logout");
        });
      }
    },
    indexGroups: function () {
      axios.get("http://localhost:3000/groups").then((response) => {
        // console.log(response.data);
        this.groups = response.data;
      });
    },
    indexArticles: function () {
      axios.get("/articles").then((response) => {
        console.log("articles data", response.data);
        this.articles = response.data;
      });
    },
    indexQuotes: function () {
      axios.get("/quotes").then((response) => {
        console.log(response.data.content);
        this.quotes = response.data;
      });
    },
  },
};
</script>
