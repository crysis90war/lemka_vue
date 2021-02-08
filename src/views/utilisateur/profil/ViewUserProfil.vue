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
import {LemkaEnums} from "@/helpers/enums.helper";

export default {
  name: "ViewUserProfil",

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
      this.$router.push({name: LemkaEnums.Routes.LOGIN_ROUTE.name});
    }
    if (this.$route.name === LemkaEnums.Routes.PROFIL_ROUTE.name) {
      this.$router.push({name: LemkaEnums.Routes.INFORMATIONS.name})
    }
  },

  watch: {
    currentUser: function () {
      if (!this.currentUser) {
        this.$router.push({name: LemkaEnums.Routes.LOGIN_ROUTE.name});
      }
    },
    thisRoute: function () {
      if (this.thisRoute === LemkaEnums.Routes.PROFIL_ROUTE.name) {
        this.$router.push({name: LemkaEnums.Routes.INFORMATIONS.name})
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