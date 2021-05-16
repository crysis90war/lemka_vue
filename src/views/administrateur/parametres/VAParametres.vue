<template>
  <div>
    <b-navbar id="navbar" toggleable="lg" type="light" variant="light" class="nav-shadow border-top colored">
      <b-navbar-nav>
        <b-nav-item :to="{name: routes.mensuration.name}" :active="$route.name === routes.mensuration.name">
          {{ routes.mensuration.value }}
        </b-nav-item>

        <b-nav-item :to="{name: routes.genre.name}" :active="$route.name === routes.genre.name">
          {{ routes.genre.value }}
        </b-nav-item>

        <b-nav-item :to="{name: routes.service.name}" :active="$route.name === routes.service.name">
          {{ routes.service.value }}
        </b-nav-item>

        <b-nav-item :to="{name: routes.service.name}" :active="$route.name === routes.service.name">
          Catalogue
        </b-nav-item>

        <b-nav-item :to="{name: routes.service.name}" :active="$route.name === routes.service.name">
          Couleur
        </b-nav-item>

        <b-nav-item :to="{name: routes.service.name}" :active="$route.name === routes.service.name">
          Categorie
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <b-card class="border-0">
        <router-view></router-view>
    </b-card>
  </div>
</template>

<script>
import LemkaHelpers from "@/helpers";

export default {
  name: "VAParametres",
  data() {
    return {
      routes: {
        entreprise: {name: LemkaHelpers.Routes.PARAMETRES_ENTREPRISE.name, value: LemkaHelpers.Routes.PARAMETRES_ENTREPRISE.value},
        genre: {name: LemkaHelpers.Routes.PARAMETRES_GENRE.name, value: LemkaHelpers.Routes.PARAMETRES_GENRE.value},
        mensuration: {name: LemkaHelpers.Routes.PARAMETRES_MENSURATION.name, value: LemkaHelpers.Routes.PARAMETRES_MENSURATION.value},
        service: {name: LemkaHelpers.Routes.PARAMETRES_SERVICE.name, value: LemkaHelpers.Routes.PARAMETRES_SERVICE.value}
      },
    }
  },

  computed: {
    thisRoute() {
      return this.$route.name
    }
  },

  created() {
    if (this.$route.name === LemkaHelpers.Routes.PARAMETRES.name) {
      this.$router.push({name: LemkaHelpers.Routes.PARAMETRES_MENSURATION.name})
    }
  },

  watch: {
    thisRoute: function () {
      if (this.thisRoute === LemkaHelpers.Routes.PARAMETRES.name) {
        this.$router.push({name: LemkaHelpers.Routes.PARAMETRES_MENSURATION.name})
      }
    }
  },
}
</script>

<style scoped>

</style>