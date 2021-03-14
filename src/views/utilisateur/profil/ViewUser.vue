<template>
  <div>
    <profil-navbar/>

    <b-container class="my-2">
      <router-view/>
    </b-container>
  </div>

</template>

<script>
import ProfilNavbar from "@/components/ProfilNavbar";
import LemkaHelpers from "@/helpers";

export default {
  name: "ViewUser",

  components: {
    'profil-navbar': ProfilNavbar
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    thisRoute() {
      return this.$route.name
    }
  },

  created() {
    if (!this.currentUser) {
      this.$router.push({name: LemkaHelpers.Routes.LOGIN_ROUTE.name});
    }
    if (this.$route.name === LemkaHelpers.Routes.PROFIL_ROUTE.name) {
      this.$router.push({name: LemkaHelpers.Routes.INFORMATIONS.name})
    }
  },

  watch: {
    currentUser: function () {
      if (!this.currentUser) {
        this.$router.push({name: LemkaHelpers.Routes.LOGIN_ROUTE.name});
      }
    },
    thisRoute: function () {
      if (this.thisRoute === LemkaHelpers.Routes.PROFIL_ROUTE.name) {
        this.$router.push({name: LemkaHelpers.Routes.INFORMATIONS.name})
      }
    }
  }
}
</script>

<style scoped>

.v-sidebar-menu {
  position: relative !important;
}
</style>