<template>
  <div class="recherche">
    <div class="mx-5 px-5 py-3">
      <b-form-input
          placeholder="e.g. robe"
          size="lg"
          v-model="query"
          @keyup.enter="searchQuery(query)"
      />
    </div>

    <div class="mx-5 px-5">
<!--      <div class="text-center my-5">-->
<!--        <h2 class="h1-lemka">Recherches</h2>-->
<!--      </div>-->

      <div>
        <b-row>
          <b-col cols="2">
            <div class="my-3">
              <h5>Recherche spécifique</h5>
            </div>
            <div class="pt-3">
              <div class="accordion" role="tablist">
                <b-card no-body class="mb-1 border-0">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-1 variant="light">Catégorie</b-button>
                  </b-card-header>
                  <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <b-form-radio-group
                          v-model="selectedCategorie"
                          :options="['Articles', 'Merceries']"
                          stacked
                      />
                    </b-card-body>
                  </b-collapse>
                </b-card>

                <b-card no-body class="mb-1 border-0">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-2 variant="light">Catalogue</b-button>
                  </b-card-header>
                  <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <b-form-group label="Rayon">
                        <b-form-radio-group
                            v-model="selectedRayon"
                            :options="rayons"
                            value-field="id"
                            text-field="rayon"
                            stacked
                        >
                          <template #first>
                            <b-form-radio :value="null">Tous</b-form-radio>
                          </template>
                        </b-form-radio-group>
                      </b-form-group>

                      <b-form-group label="Section">
                        <b-form-radio-group
                            v-model="selectedSection"
                            :options="sections"
                            value-field="id"
                            text-field="section"
                            stacked
                        >
                          <template #first>
                            <b-form-radio :value="null">Tous</b-form-radio>
                          </template>
                        </b-form-radio-group>
                      </b-form-group>

                      <b-form-group label="Type Produit">
                        <b-form-radio-group
                            v-model="selectedTypeProduit"
                            :options="typeProduits"
                            value-field="id"
                            text-field="type_produit"
                            stacked
                        >
                          <template #first>
                            <b-form-radio :value="null">Tous</b-form-radio>
                          </template>
                        </b-form-radio-group>
                      </b-form-group>
                    </b-card-body>
                  </b-collapse>
                </b-card>

                <b-card no-body class="mb-1 border-0">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-3 variant="light">Tags</b-button>
                  </b-card-header>
                  <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <b-card-text>tags</b-card-text>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>
            </div>
          </b-col>
          <b-col cols="10">
            <div>
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
                        title="Switcher de vue"
                        @click="toggleListShow"
                        class="ml-3"
                    >
                      <i :class="listShow === true ? 'fas fa-th' : 'fas fa-th-list'"></i>
                    </b-button>
                  </div>
                </div>
              </div>

              <div>
                <l-spinner v-if="isLoading === true"/>
                <div v-else>
                  <div v-if="data.length === 0" class="text-center">
                    <h1><i class="far fa-surprise"></i></h1>
                    <p>Aucun éléments trouvé</p>
                    <p>Veuillez modifier vos critères de recherches !</p>
                  </div>
                  <div v-else class="px-4">
                    <b-row v-if="!listShow">
                      <b-col cols="3" v-for="item in data" :key="item.id" class="d-flex justify-content-between">
                        <b-card
                            :img-src="getMainImage(item.images)"
                            :img-alt="item.titre"
                            img-top
                            style="max-width: 20rem;"
                            class="box-shadow"
                        >
                          <b-card-title>
                            <b-link :to="{name: routes.ARTICLES_DETAIL.name, params: {slug: item.slug}}">{{item.titre}}</b-link>
                          </b-card-title>
                          <b-card-text>
                            {{ item.description }}
                          </b-card-text>
                        </b-card>
                      </b-col>
                    </b-row>
                    <b-row v-else>
                      <b-col cols="6" v-for="item in data" :key="item.id">
                        <b-card
                            :img-src="getMainImage(item.images)"
                            img-height="180"
                            class="box-shadow"
                            :img-alt="item.titre"
                            img-left
                        >
                          <b-card-title>
                            <b-link :to="{name: routes.ARTICLES_DETAIL.name, params: {slug: item.slug}}">{{item.titre}}</b-link>
                          </b-card-title>
                          <b-card-text>
                            {{ item.description }}
                          </b-card-text>
                        </b-card>
                      </b-col>
                    </b-row>
                  </div>
                </div>
              </div>

            </div>
          </b-col>
        </b-row>
      </div>

      <!-- region DEBUGGING -->
      {{ selectedCategorie }}
      <l-jumbotron :data="data"/>
      <!-- endregion -->
    </div>
  </div>
</template>

<script>
import ApiService from "@/services/api.service"
import LemkaHelpers from "@/helpers";
import {commonMixin} from "@/mixins/common.mixin";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "VGRecherche",
  mixins: [commonMixin],
  data() {
    return {
      routes: LemkaHelpers.Routes,
      data: [],
      listShow: true,
      query: "",
      selectedCategorie: "Articles",
      selectedRayon: null,
      selectedSection: null,
      selectedTypeProduit: null,
    }
  },
  props: {
    propCategorie: {
      type: String
    },
    propQuery: {
      type: String
    }
  },
  computed: {
    ...mapGetters({rayons: 'Rayons/rayons', sections: "Sections/sections", typeProduits: "TypeProduits/typeProduits"})
  },
  watch: {
    $route() {
      this.searchQuery()
    },
    selectedRayon(newValue) {
      this.searchQuery(this.query, newValue, this.selectedSection, this.selectedTypeProduit, this.query)
    },
    selectedSection(newValue) {
      this.searchQuery(this.query, this.selectedRayon, newValue, this.selectedTypeProduit, this.query)
    },
    selectedTypeProduit(newValue) {
      this.searchQuery(this.query, this.selectedRayon, this.selectedSection, newValue, this.query)
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
      if (this.propCategorie !== undefined) {
        this.selectedCategorie = this.propCategorie
      }
    },
    searchQuery: async function (query = "", rayon = null, section = null, typeProduit = null, description = "") {
      let searchquery = this.articleQueryParams(query, rayon, section, typeProduit, description);
      let endpoint = LemkaHelpers.Endpoints.DOMAIN + '/public/articles/' + searchquery
      this.toggleLoading()
      await ApiService.GETDatas(endpoint).then(r => {
        this.data = r.data
      }, () => {
        this.makeToast('danger', 'Something went wrong', 'Error')
      })
      this.toggleLoading()
    },
    articleQueryParams: function (titre = "", ref_catalogue__ref_rayon = null, ref_catalogue__ref_section = null, ref_catalogue__ref_type_produit = null, description = "") {
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
        article = article + 's'
      }
      return count + ' ' + article
    },
    toggleListShow: function () {
      this.listShow = !this.listShow
    }
  },
  created() {
    this.initialisation()
    this.searchQuery()
  }
}
</script>

<style scoped lang="scss">
.box-shadow {
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
}
</style>