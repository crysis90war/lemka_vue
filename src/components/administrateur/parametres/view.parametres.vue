<template>
  <div>
    <b-navbar id="navbar" toggleable="lg" type="dark" variant="dark" class="nav-shadow colored m-0">
      <b-navbar-nav>
        <b-nav-item :to="{name: AdminRouteName.ENTREPRISE.name}">Entreprise</b-nav-item>
        <b-nav-item :to="{name: AdminRouteName.GENRE.name}">Genres</b-nav-item>
        <b-nav-item :to="{name: AdminRouteName.MENSURATION.name}">Mensurations</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <b-jumbotron class="pt-4">
      <router-view :key="$route.fullPath"></router-view>
    </b-jumbotron>
  </div>

<!--  <b-card  v-if="$route.name === AdminRouteName.PARAMETRES.name" class="bg-danger">-->
<!--      <b-navbar id="navbar" toggleable="lg" type="light" variant="light" class="nav-shadow colored m-0">-->
<!--        <b-navbar-nav>-->
<!--          <b-nav-item>Entreprise</b-nav-item>-->
<!--        </b-navbar-nav>-->
<!--      </b-navbar>-->
<!--    <b-card-body>-->
<!--      <div>-->
<!--        <b-tabs content-class="mt-3">-->
<!--          <b-tab title="Entreprise" active>-->
<!--            <div v-if="entreprise === null">-->
<!--              <b-button :to="{name:AdminRouteName.ADD_ENTREPRISE.name}" variant="outline-success">Ajouter informations</b-button>-->
<!--              <hr>-->
<!--            </div>-->
<!--            <pre>{{ JSON.stringify(entreprise, null, '\t') }}</pre>-->
<!--          </b-tab>-->
<!--          <b-tab title="Catalogue">-->
<!--            <b-table stacked="sm" :items="catalogues"></b-table>-->
<!--          </b-tab>-->
<!--          <b-tab title="Service">-->
<!--            <b-table caption-top small hover stacked="sm" :items="services"></b-table>-->
<!--          </b-tab>-->
<!--          <b-tab title="Catégories">-->
<!--            <b-table stacked="sm" :items="categories"></b-table>-->
<!--          </b-tab>-->

<!--          <b-tab title="Genre">-->
<!--            <b-table stacked="md" :items="genres"></b-table>-->
<!--          </b-tab>-->
<!--        </b-tabs>-->
<!--      </div>-->
<!--    </b-card-body>-->
<!--  </b-card>-->


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
      entreprise: null,
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
          this.entreprise = null
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