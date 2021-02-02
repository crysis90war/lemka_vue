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
      this.$router.push('/');
    }
    if (this.$route.name === LemkaEnums.UserRoutes.PROFIL_ROUTE.name) {
      this.$router.push({name: LemkaEnums.UserRoutes.INFORMATIONS.name})
    }
  },

  watch: {
    currentUser: function () {
      if (!this.currentUser) {
        this.$router.push('/');
      }
    },
    thisRoute: function () {
      if (this.thisRoute === LemkaEnums.UserRoutes.PROFIL_ROUTE.name) {
        this.$router.push({name: LemkaEnums.UserRoutes.INFORMATIONS.name})
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