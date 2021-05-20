<template>
  <div id="app">
    <!--    <lemka-header></lemka-header>-->
    <lemka-navbar></lemka-navbar>
    <b-breadcrumb v-if="checkRoute() === true" class="mb-0">
      <b-breadcrumb-item :to="{name: routes.HOME_ROUTE.name}"><i class="fas fa-home"></i></b-breadcrumb-item>
      <b-breadcrumb-item v-for="item in items" :key="item.path" :to="item.path" :active="$route.name === item.name">
        {{ item.meta.value }}
      </b-breadcrumb-item>
    </b-breadcrumb>
    <router-view></router-view>
    <lemka-footer></lemka-footer>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LemkaHelpers from "@/helpers";
import {mapGetters} from "vuex";
export default {
  name: 'Home',
  components: {
    'lemka-navbar': Navbar,
    'lemka-footer': Footer,
    // 'lemka-header': Header
  },
  data() {
    return {
      routes: LemkaHelpers.Routes,
      items: [],
    }
  },
  computed: {
    ...mapGetters({loggedIn: "Auth/loggedIn"})
  },
  watch: {
    $route() {
      this.getRoute();
    },
  },
  methods: {
    getRoute: function () {
      this.items = this.$route.matched;
    },
    checkRoute: function () {
      let route = this.$route.name;
      return (
          (route !== LemkaHelpers.Routes.HOME_ROUTE.name) &&
          (route !== LemkaHelpers.Routes.LOGIN_ROUTE.name) &&
          (route !== LemkaHelpers.Routes.REGISTER_ROUTE.name) &&
          (route !== 'VGRecherche')
      )
    },
    stopGoogleAnalytics() {
      this.$ga.disable();
    },
    engageGoogleAnalytics() {
      this.$ga.enable();
    }
  },
  created() {
    this.getRoute();
    this.engageGoogleAnalytics()
    axios.interceptors.response.use(response => {
      return response;
    }, error => {
      if (error.response.data.detail === 'Given token not valid for any token type') {
        this.$store.dispatch('Auth/logout')
      }
      return Promise.reject(error);
    })
  }
}
</script>

<style lang="scss">

@import 'assets/styles/main.scss';

</style>