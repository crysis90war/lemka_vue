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
import ApiService from "@/services";
import {LemkaEnums} from "@/helpers/enums.helper";

export default {
  name: "ViewParametres",
  data() {
    return {
      routes: {
        entreprise: {name: LemkaEnums.Routes.PARAMETRES_ENTREPRISE.name, value: LemkaEnums.Routes.PARAMETRES_ENTREPRISE.value},
        genre: {name: LemkaEnums.Routes.PARAMETRES_GENRE.name, value: LemkaEnums.Routes.PARAMETRES_GENRE.value},
        mensuration: {name: LemkaEnums.Routes.PARAMETRES_MENSURATION.name, value: LemkaEnums.Routes.PARAMETRES_MENSURATION.value},
        service: {name: LemkaEnums.Routes.PARAMETRES_SERVICE.name, value: LemkaEnums.Routes.PARAMETRES_SERVICE.value}
      },
      services: [],
      catalogues: [],
      categories: [],
      entreprise: null,
      genres: [],
    }
  },

  methods: {
    async chargerEntreprise() {
      await ApiService.EntrepriseService.getEntrepriseList().then(response => {
        if (response.data.length === 0) {
          this.entreprise = null
        } else {
          this.entreprise = response.data[0]
        }
      })
    },

    async chargerServices() {
      await ApiService.TypeServiceService.getTypeServiceList().then(response => {
        this.services = response.data
      })
    },

    async chargerCatalogues() {
      await ApiService.CatalogueService.getCatalogueList().then(response => {
        this.catalogues = response.data
      })
    },

    async chargerCategories() {
      await ApiService.CategorieService.getCategorieList().then(response => {
        this.categories = response.data;
      })
    },

  },

  created() {
    this.chargerEntreprise();
    this.chargerCatalogues();
    this.chargerServices();
    this.chargerCategories();
  },

  filters: {
    pretty: function (value) {
      return JSON.stringify(JSON.parse(value), null, 2);
    }
  }
}
</script>

<style scoped>

</style>