<template>
  <div id="app">
    <lemka-navbar/>
    <router-view></router-view>
    <lemka-footer/>
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
    // 'lemka-header': Header Commentaire
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
    // let user = JSON.parse(localStorage.getItem('user'));
    // let token = jwt_decode(user.access)
    // if (token.auth_provider === 'facebook') {
    //   // eslint-disable-next-line no-undef
    //   FB.api('/me/permissions', 'delete', null, () => FB.logout());
    // }
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