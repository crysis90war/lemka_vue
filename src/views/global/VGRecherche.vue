<template>
  <div class="recherche">
    <b-container>
      <b-row>
        <b-col cols="3">
          <b-form-input
              class="my-3"
              placeholder="search ..."
              v-model="query"
              @keyup.enter="searchQuery(query)"
          />

          <b-form-group label="Rayon">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                Default checkbox
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
              <label class="form-check-label" for="flexCheckChecked">
                Checked checkbox
              </label>
            </div>
          </b-form-group>

        </b-col>
        <b-col cols="9">
          <div class="text-center">
            <div class="d-flex justify-content-between my-3">
              <div>
                <p class="text-muted">Résultats de recherche</p>
              </div>
              <div class="d-flex justify-content-end">
                <div class="align-middle">
                  <p class="text-muted">{{ returnArticleResultsCount() }}</p>
                </div>
                <div>
                  <b-button
                      size="sm"
                      variant="outline-secondary"
                      v-b-tooltip
                      :title="listShow === false ? 'Afficher en carrés' : 'Afficher en liste'"
                      @click="toggleListShow"
                      class="ml-3"
                  >
                    <i :class="listShow === false ? 'fas fa-th' : 'fas fa-th-list'"></i>
                  </b-button>
                </div>
              </div>
            </div>

            <div>
              <l-spinner v-if="isLoading === true"/>
              <div v-if="isLoading === false">
                <l-jumbotron :data="data"/>
              </div>
            </div>

          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ApiService from "@/services/api.service"
import LemkaHelpers from "@/helpers";
import {commonMixin} from "@/mixins/common.mixin";
import {mapActions, mapGetters} from "vuex";
import RayonModel from "@/models/catalogue/rayon.model";

export default {
  name: "VGRecherche",
  mixins: [commonMixin],
  data() {
    return {
      listShow: false,
      rayon: new RayonModel(),
      rayonOptions: [],
      query: "",
      data: []
    }
  },
  computed: {
    ...mapGetters({rayons: 'Rayons/rayons', sections: "Sections/sections", typeProduits: "TypeProduits/typeProduits"})
  },
  watch: {
    $route() {
      this.searchQuery()
    },
    rayon(newValue) {
      this.searchQuery(this.query, newValue)
    },
    rayons() {
      this.rayons.forEach(item => {
        let object = {
          value: item.id,
          text: item.rayon
        }
        this.rayonOptions.push(object)
      })
    }
  },
  methods: {
    ...mapActions({
      loadRayons: "Rayons/loadRayons",
      loadSections: "Sections/loadSections",
      loadTypeProduits: "TypeProduits/loadTypeProduits"
    }),
    initialisation: async function () {
      if (this.rayons.length === 0) {
        await this.loadRayons()
      }
      if (this.sections.length === 0) {
        await this.loadSections()
      }
      if (this.typeProduits.length === 0) {
        await this.loadTypeProduits()
      }
    },
    searchQuery: async function (query = "", rayon = null, section = null, typeProduit= null, description= "") {
      this.toggleLoading()
      let searchquery = this.searchQueryEndpoint(query, rayon, section, typeProduit, description);
      let endpoint = LemkaHelpers.Endpoints.DOMAIN + '/public/articles/' + searchquery
      ApiService.GETDatas(endpoint).then(r => {
        this.data = r.data
      }, () => {
        this.makeToast('danger', 'Something went wrong', 'Error')
      })
      this.toggleLoading()
    },
    searchQueryEndpoint: function (titre = "", ref_catalogue__ref_rayon = null, ref_catalogue__ref_section = null, ref_catalogue__ref_type_produit = null, description = "") {
      if (ref_catalogue__ref_rayon === null || ref_catalogue__ref_rayon === undefined) {
        ref_catalogue__ref_rayon = ""
      }
      if (ref_catalogue__ref_section === null || ref_catalogue__ref_section === undefined) {
        ref_catalogue__ref_section = ""
      }
      if (ref_catalogue__ref_type_produit === null || ref_catalogue__ref_type_produit === undefined) {
        ref_catalogue__ref_type_produit = ""
      }
      return `?titre=${titre}&description=${description}&ref_catalogue__ref_rayon=${ref_catalogue__ref_rayon}&ref_catalogue__ref_section=${ref_catalogue__ref_section}&ref_catalogue__ref_type_produit=${ref_catalogue__ref_type_produit}`
    },
    returnArticleResultsCount: function () {
      let count = this.data.length
      let article = 'Article'
      if (count > 1) {
        article = article + '(s)'
      }
      return count + ' ' + article
    },
    toggleListShow: function() {
      this.listShow = !this.listShow
    }
  },
  created() {
    this.initialisation()
    this.searchQuery()
  }
}
</script>

<style scoped>

</style>