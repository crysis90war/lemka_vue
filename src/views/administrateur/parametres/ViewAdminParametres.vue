<template>
  <div>
    <b-navbar id="navbar" toggleable="lg" type="light" variant="light" class="nav-shadow border-top colored m-0">
      <b-navbar-nav>
        <b-nav-item :to="{name: routes.entreprise.name}" :active="$route.name === routes.entreprise.name">
          {{ routes.entreprise.value }}
        </b-nav-item>

        <b-nav-item :to="{name: routes.genre.name}" :active="$route.name === routes.genre.name">
          {{ routes.genre.value }}
        </b-nav-item>

        <b-nav-item :to="{name: routes.mensuration.name}" :active="$route.name === routes.mensuration.name">
          {{ routes.mensuration.value }}
        </b-nav-item>

        <b-nav-item :to="{name: routes.service.name}" :active="$route.name === routes.service.name">
          {{ routes.service.value }}
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import {LemkaEnums} from "@/helpers/enums.helper";

export default {
  name: "ViewAdminParametres",
  data() {
    return {
      routes: {
        entreprise: {name: LemkaEnums.Routes.PARAMETRES_ENTREPRISE.name, value: LemkaEnums.Routes.PARAMETRES_ENTREPRISE.value},
        genre: {name: LemkaEnums.Routes.PARAMETRES_GENRE.name, value: LemkaEnums.Routes.PARAMETRES_GENRE.value},
        mensuration: {name: LemkaEnums.Routes.PARAMETRES_MENSURATION.name, value: LemkaEnums.Routes.PARAMETRES_MENSURATION.value},
        service: {name: LemkaEnums.Routes.PARAMETRES_SERVICE.name, value: LemkaEnums.Routes.PARAMETRES_SERVICE.value}
      },
    }
  },

  computed: {
    thisRoute() {
      return this.$route.name
    }
  },

  created() {
    if (this.$route.name === LemkaEnums.Routes.PARAMETRES.name) {
      this.$router.push({name: LemkaEnums.Routes.PARAMETRES_ENTREPRISE.name})
    }
  },

  watch: {
    thisRoute: function () {
      if (this.thisRoute === LemkaEnums.Routes.PARAMETRES.name) {
        this.$router.push({name: LemkaEnums.Routes.PARAMETRES_ENTREPRISE.name})
      }
    }
  },
}
</script>

<style scoped>

</style>