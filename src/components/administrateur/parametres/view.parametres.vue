<template>
  <b-card  v-if="$route.name === AdminRouteName.PARAMETRES.name">
    <b-card-body>
      <div>
        <b-tabs content-class="mt-3">
          <b-tab title="Entreprise" active>
            <div v-if="entreprise.length === 0">
              <b-button :to="{name:AdminRouteName.ADD_ENTREPRISE.name}" variant="outline-success">Ajouter informations</b-button>
              <hr>
            </div>
            <pre>{{ JSON.stringify(entreprise, null, '\t') }}</pre>
          </b-tab>
          <b-tab title="Catalogue">
            <b-table stacked="sm" :items="catalogues"></b-table>
          </b-tab>
          <b-tab title="Service">
            <b-table caption-top small hover stacked="sm" :items="services"></b-table>
          </b-tab>
          <b-tab title="Catégories">
            <b-table stacked="sm" :items="categories"></b-table>
          </b-tab>

          <b-tab title="Genre">
            <b-table stacked="md" :items="genres"></b-table>
          </b-tab>
        </b-tabs>
      </div>
    </b-card-body>
  </b-card>

  <router-view v-else></router-view>
</template>

<script>
import AdminApiService from "@/services/administrateur";
import {Endpoints, AdminRouteName} from "@/helpers/enums.helper";

export default {
  name: "ViewParametres",
  data() {
    return {
      services: [],
      catalogues: [],
      categories: [],
      entreprise: {},
      genres: [],
      Endpoints,
      AdminRouteName
    }
  },
  mounted() {
    this.chargerEntreprise();
    this.chargerCatalogues();
    this.chargerServices();
    this.chargerCategories();
  },
  methods: {
    chargerEntreprise() {
      AdminApiService.EntrepriseService.getEntrepriseList().then(response => {
        if (response.data.length === 0) {
          this.entreprise = {}
        } else {
          this.entreprise = response.data[0]
        }
      })
    },

    chargerServices() {
      AdminApiService.TypeServiceService.getTypeServiceList().then(response => {
        this.services = response.data
      })
    },

    chargerCatalogues() {
      AdminApiService.CatalogueService.getCatalogueList().then(response => {
        this.catalogues = response.data
      })
    },

    chargerCategories() {
      AdminApiService.CategorieService.getCategorieList().then(response => {
        this.categories = response.data;
      })
    },

    chargerGenres() {
      AdminApiService.GenreService.getGenreList().then(response => {
        this.genres = response.data
      })
    }
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