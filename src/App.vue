<template>
  <div id="app">
<!--    <lemka-header></lemka-header>-->
    <lemka-navbar></lemka-navbar>
    <b-breadcrumb v-if="checkRoute() === true">
      <b-breadcrumb-item :to="{name: LemkaEnums.GlobalRoutes.HOME_ROUTE.name}"><i class="fas fa-home"></i></b-breadcrumb-item>
      <b-breadcrumb-item v-for="item in items" :key="item.path" :to="item.path" :active="$route.name === item.name">
        {{ item.meta.value }}
      </b-breadcrumb-item>
    </b-breadcrumb>
    <router-view></router-view>
    <lemka-footer></lemka-footer>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import Header from "@/components/Header";
import {LemkaEnums} from "@/helpers/enums.helper";
import axios from "axios";

export default {
  name: 'Home',
  components: {
    'lemka-navbar': Navbar,
    'lemka-footer': Footer,
    // 'lemka-header': Header
  },
  data() {
    return {
      LemkaEnums,
      items: [],
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  watch: {
    $route() {
      this.getRoute();
    },
  },
  created() {
    // this.chargerVilles();
    this.getRoute();
    axios.interceptors.response.use(response => {
      return response;
    }, error => {
      console.log('error')
      if (error.response.status === 401) {
        this.$store.dispatch('auth/logout')
      }
      return Promise.reject(error);
    })
  },
  methods: {
    getRoute() {
      this.items = this.$route.matched;
    },

    async chargerVilles() {
      await this.$store.dispatch('villes/fetchCities');
    },

    checkRoute() {
      let route = this.$route.name;

      return (
          (route !== LemkaEnums.GlobalRoutes.HOME_ROUTE.name) &&
          (route !== LemkaEnums.GlobalRoutes.LOGIN_ROUTE.name) &&
          (route !== LemkaEnums.GlobalRoutes.REGISTER_ROUTE.name)
      );
    }
  },
}
</script>

<style lang="scss">

@import './assets/styles/main.css';

.breadcrumb {
  margin-top: 0;
  margin-bottom: 0;
}

</style>