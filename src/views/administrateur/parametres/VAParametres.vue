<template>
  <div>
    <b-navbar id="navbar" toggleable="lg" type="light" variant="light" class="nav-shadow border-top colored">
      <b-navbar-nav>
        <b-nav-item v-for="(nav_item, index) in nav_items"
                    :key="index"
                    :to="nav_item.href"
                    :active="nav_item.children.includes($route.name)"
        >
          {{ nav_item.title }}
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
      nav_items: [
        {
          href: {name: LemkaHelpers.Routes.PARAMETRES_MENSURATION.name},
          title: LemkaHelpers.Routes.PARAMETRES_MENSURATION.value,
          children: [
            LemkaHelpers.Routes.PARAMETRES_MENSURATION.name,
            LemkaHelpers.Routes.PARAMETRES_MENSURATION_ADD_OR_UPDATE.name
          ]
        },
        {
          href: {name: LemkaHelpers.Routes.PARAMETRES_GENRE.name},
          title: LemkaHelpers.Routes.PARAMETRES_GENRE.value,
          children: [
            LemkaHelpers.Routes.PARAMETRES_GENRE.name,
            LemkaHelpers.Routes.PARAMETRES_GENRE_ADD_OR_UPDATE.name
          ]
        },
        {
          href: {name: LemkaHelpers.Routes.PARAMETRES_SERVICE.name},
          title: LemkaHelpers.Routes.PARAMETRES_SERVICE.value,
          children: [
            LemkaHelpers.Routes.PARAMETRES_SERVICE.name,
            LemkaHelpers.Routes.PARAMETRES_SERVICE_ADD_OR_UPDATE.name
          ]
        },
        {
          href: {name: LemkaHelpers.Routes.PARAMETRES_COULEUR.name},
          title: LemkaHelpers.Routes.PARAMETRES_COULEUR.value,
          children: [
            LemkaHelpers.Routes.PARAMETRES_COULEUR.name,
            LemkaHelpers.Routes.PARAMETRES_COULEUR_ADD_OR_UPDATE.name
          ]
        },
        {
          href: {name: LemkaHelpers.Routes.PARAMETRES_CHARACTERISTIQUE.name},
          title: LemkaHelpers.Routes.PARAMETRES_CHARACTERISTIQUE.value,
          children: [
            LemkaHelpers.Routes.PARAMETRES_CHARACTERISTIQUE.name,
            LemkaHelpers.Routes.PARAMETRES_CHARACTERISTIQUE_ADD_OR_UPDATE.name
          ]
        },
        {
          href: {name: LemkaHelpers.Routes.PARAMETRES_CATEGORIE.name},
          title: LemkaHelpers.Routes.PARAMETRES_CATEGORIE.value,
          children: [
            LemkaHelpers.Routes.PARAMETRES_CATEGORIE.name,
            LemkaHelpers.Routes.PARAMETRES_CATEGORIE_ADD_OR_UPDATE.name
          ]
        },
      ]
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