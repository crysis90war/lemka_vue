<template>
  <div class="recherche">
    <div class="mx-5 px-5 py-3">
      <b-form-input
          placeholder="e.g. robe / tissu"
          size="lg"
          v-model="search"
          @keyup.enter="selectedCategorie === 'Articles'
          ? searchArticleQuery(search, selectedTypeService, selectedRayon, selectedSection, selectedTypeProduit, selectedTags)
          : searchMercerieQuery(search, selectedMercerieCategorie, selectedCouleur)"
      />
    </div>

    <div class="mx-5 px-5">
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
                    <b-button block v-b-toggle.accordion-1 variant="light">Articles/Merceries</b-button>
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

                <b-card no-body class="mb-1 border-0" v-if="selectedCategorie === 'Articles'">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-service variant="light">Service</b-button>
                  </b-card-header>
                  <b-collapse id="accordion-service" visible accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <b-form-radio-group
                          v-model="selectedRayon"
                          :options="typeServices"
                          value-field="id"
                          text-field="type_service"
                          stacked
                      >
                        <template #first>
                          <b-form-radio :value="null">Tous</b-form-radio>
                        </template>
                      </b-form-radio-group>
                    </b-card-body>
                  </b-collapse>
                </b-card>

                <b-card no-body class="mb-1 border-0" v-if="selectedCategorie === 'Articles'">
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

                <b-card no-body class="mb-1 border-0" v-if="selectedCategorie === 'Articles'">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-3 variant="light">Tags</b-button>
                  </b-card-header>
                  <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel" style="min-height: 600px;">
                    <b-card-body>
                      <b-card-text>
                        <multiselect
                            v-model="selectedTags"
                            :options="tags"
                            :multiple="true"
                            :hide-selected="true"
                            :show-labels="false"
                            :taggable="true"
                            tag-placeholder=""
                            label="tag"
                            track-by="tag"
                            placeholder="Tags"
                            open-direction="below"
                            :max="10"
                            @search-change="updateSelectTag"
                        >
                          <template slot="singleLabel" slot-scope="{ option }">
                            <span>{{ option.tag }}</span>
                          </template>

                          <template slot="option" slot-scope="{ option }">
                            <span>{{ option.tag }}</span>
                          </template>

                          <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
                          <span slot="noOptions">Aucun tag disponible. Veuillez encoder pour en créer.</span>
                        </multiselect>
                      </b-card-text>
                    </b-card-body>
                  </b-collapse>
                </b-card>

                <b-card no-body class="mb-1 border-0" v-if="selectedCategorie === 'Merceries'">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-mercerie-type variant="light">Catégorie</b-button>
                  </b-card-header>
                  <b-collapse id="accordion-mercerie-type" visible accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <b-form-radio-group
                          v-model="selectedMercerieCategorie"
                          :options="categories"
                          value-field="id"
                          text-field="nom"
                          stacked
                      >
                        <template #first>
                          <b-form-radio :value="null">Tous</b-form-radio>
                        </template>
                      </b-form-radio-group>
                    </b-card-body>
                  </b-collapse>
                </b-card>

                <b-card no-body class="mb-1 border-0" v-if="selectedCategorie === 'Merceries'">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-couleur variant="light">Couleur</b-button>
                  </b-card-header>
                  <b-collapse id="accordion-couleur" visible accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <b-form-radio-group
                          v-model="selectedCouleur"
                          :options="couleurs"
                          value-field="id"
                          text-field="nom"
                          stacked
                      >
                        <template #first>
                          <b-form-radio :value="null">Tous</b-form-radio>
                        </template>
                      </b-form-radio-group>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>
            </div>
          </b-col>
          <b-col cols="10">
            <div class="d-flex justify-content-between my-3">
              <div>
                <p class="text-muted">Résultats de recherche</p>
              </div>
              <div class="d-flex justify-content-end">
                <div class="align-middle">
                  <p class="text-muted">{{ searchResultCount() }}</p>
                </div>
                <div>
                  <b-button
                      size="sm"
                      variant="outline-secondary"
                      v-b-tooltip
                      title="Changer de vue"
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
                  <b-row>
                    <b-col :cols="!listShow ? '3' : '12'" v-for="item in data" :key="item.id" :class="!listShow ? 'd-flex justify-content-between' : ''">
                      <l-card-product
                          :list-show="listShow"
                          :img-src="getMainImage(item.images)"
                          :img-height="!listShow ? '':'180'"
                          :img-alt="selectedCategorie === 'Articles' ? item.titre : item.nom"
                          :img-left="listShow === true"
                          :img-top="listShow === false"
                          :title="selectedCategorie === 'Articles' ? item.titre : item.nom"
                          :to-route="selectedCategorie === 'Articles' ? routes.ARTICLES_DETAIL.name : routes.MERCERIES_DETAIL.name"
                          :to-param="selectedCategorie === 'Articles' ? item.slug : item.id"
                          :slug-true="selectedCategorie === 'Articles'"
                          :id-true="selectedCategorie === 'Merceries'"
                          :description="item.description"
                          :tags="item.tags"
                          tag-name="tag"
                          :style="!listShow ? 'max-width: 20rem;' : '' "
                      />
                    </b-col>
                  </b-row>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
    {{ selectedTags }}
  </div>
</template>

<script>
import LemkaHelpers from "@/helpers";
import {commonMixin} from "@/mixins/common.mixin";
import {mapActions, mapGetters} from "vuex";
import {htmlTitle} from "@/utils/tools";
import LCardProduct from "@/components/LCardProduct";

export default {
  name: "VGRecherche",
  components: {LCardProduct},
  mixins: [commonMixin],
  title() {
    return htmlTitle('Recherche')
  },
  data() {
    return {
      routes: LemkaHelpers.Routes,
      data: [],
      listShow: true,
      search: "",
      selectedCategorie: "Articles",
      selectedTypeService: null,
      selectedRayon: null,
      selectedSection: null,
      selectedTypeProduit: null,
      selectedTags: [],
      selectedMercerieCategorie: null,
      selectedCouleur: null
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
    ...mapGetters({
      rayons: 'Rayons/rayons',
      sections: "Sections/sections",
      typeProduits: "TypeProduits/typeProduits",
      typeServices: "TypeServices/typeServices",
      tags: "Tags/tags",
      couleurs: "Couleurs/couleurs",
      categories: "Categories/categories",
      merceries: "Merceries/globalMerceries",
      articles: "Articles/gloabalArticles"
    })
  },
  watch: {
    $route() {
      this.searchArticleQuery()
    },
    selectedCategorie(newValue) {
      switch (newValue) {
        case "Articles":
          this.searchArticleQuery()
          break;
        case "Merceries":
          this.searchMercerieQuery()
          break;
      }
    },
    selectedRayon() {
      this.searchArticleQuery()
    },
    selectedSection() {
      this.searchArticleQuery()
    },
    selectedTypeProduit() {
      this.searchArticleQuery()
    },
    selectedTypeService() {
      this.searchArticleQuery()
    },
    selectedTags() {
      this.searchArticleQuery()
    },
    selectedMercerieCategorie() {
      this.searchMercerieQuery()
    },
    selectedCouleur() {
      this.searchMercerieQuery()
    }
  },
  methods: {
    ...mapActions({
      loadRayons: "Rayons/loadRayons",
      loadSections: "Sections/loadSections",
      loadTypeProduits: "TypeProduits/loadTypeProduits",
      loadTypeServices: "TypeServices/loadTypeServices",
      loadTags: "Tags/loadTags",
      loadCouleur: "Couleurs/loadCouleurs",
      loadCategories: "Categories/loadCategories",
      loadGlobalMerceries: 'Merceries/loadGlobalMerceries',
      loadGlobalArticles: "Articles/loadGlobalArticles"
    }),
    initialisation: async function () {
      if (this.tags.length === 0) {
        await this.loadTags()
      }
      if (this.typeServices.length === 0) {
        await this.loadTypeServices()
      }
      if (this.rayons.length === 0) {
        await this.loadRayons()
      }
      if (this.sections.length === 0) {
        await this.loadSections()
      }
      if (this.typeProduits.length === 0) {
        await this.loadTypeProduits()
      }
      if (this.categories.length === 0) {
        await this.loadCategories()
      }
      if (this.couleurs.length === 0) {
        await this.loadCouleur()
      }
      if (this.propCategorie !== undefined) {
        this.selectedCategorie = this.propCategorie
      }
    },
    searchArticleQuery: async function () {
      this.toggleLoading()

      await this.loadGlobalArticles(this.articleQueryParams()).then(() => {
        this.data = this.articles
      }, () => {
        this.makeToast('danger', "Une erreur s'est produit lors de votre requete", 'Error')
      })

      this.toggleLoading()
    },
    searchMercerieQuery: async function () {
      this.toggleLoading()
      await this.loadGlobalMerceries(this.mercerieQueryParams()).then(() => {
        this.data = this.merceries
      }, () => {
        this.makeToast('danger', "Une erreur s'est produit lors de votre requete", 'Error')
      })
      this.toggleLoading()
    },
    articleQueryParams: function () {
      let search = this.search
      let ref_type_service = this.selectedTypeService
      let ref_catalogue__ref_rayon = this.selectedRayon
      let ref_catalogue__ref_section = this.selectedSection
      let ref_catalogue__ref_type_produit = this.selectedTypeProduit
      let ref_tags = this.selectedTags

      if (ref_type_service === null || ref_type_service === undefined) {
        ref_type_service = ""
      }
      if (ref_catalogue__ref_rayon === null || ref_catalogue__ref_rayon === undefined) {
        ref_catalogue__ref_rayon = ""
      }
      if (ref_catalogue__ref_section === null || ref_catalogue__ref_section === undefined) {
        ref_catalogue__ref_section = ""
      }
      if (ref_catalogue__ref_type_produit === null || ref_catalogue__ref_type_produit === undefined) {
        ref_catalogue__ref_type_produit = ""
      }
      let params = `?ref_type_service=${ref_type_service}&ref_catalogue__ref_rayon=${ref_catalogue__ref_rayon}&ref_catalogue__ref_section=${ref_catalogue__ref_section}&ref_catalogue__ref_type_produit=${ref_catalogue__ref_type_produit}&search=${search}`
      if (ref_tags.length > 0) {
        let text = '&ref_tags=';
        ref_tags.forEach(item => {
          params += text + item.id.toString()
        })
      }
      return params
    },
    mercerieQueryParams: function () {
      let search = this.search
      let ref_categorie = this.selectedMercerieCategorie
      let ref_couleur = this.selectedCouleur

      if (ref_categorie === null || ref_categorie === undefined) {
        ref_categorie = ""
      }
      if (ref_couleur === null || ref_couleur === undefined) {
        ref_couleur = ""
      }
      return `?ref_categorie=${ref_categorie}&ref_couleur=${ref_couleur}&search=${search}`
    },
    searchResultCount: function () {
      let count = this.data.length
      let text = this.selectedCategorie.slice(0, -1)
      if (count > 1) {
        text = text + 's'
      }
      return count + ' ' + text
    },
    toggleListShow: function () {
      this.listShow = !this.listShow
    },
    updateSelectTag: async function (query) {
      await this.loadTags(query)
    },
  },
  created() {
    this.initialisation()
    if (this.selectedCategorie === 'Articles') {
      this.searchArticleQuery()
    } else if (this.selectedCategorie === "Merceries") {
      this.searchMercerieQuery()
    } else {
      console.log("Une erreur s'est produite !")
    }
  }
}
</script>

<style scoped lang="scss">

</style>