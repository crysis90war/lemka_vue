<template>
  <b-card v-if="$route.name === AdminRouteName.ARTICLES.name">
    <b-card-body>
      <b-container>
        <b-row>
          <b-col lg="6" class="my-1">
            <b-form-group label-for="filter-input"
                          label-align-sm="right"
                          label-size="sm"
                          class="mb-0">
              <b-input-group size="sm">
                <template #prepend>
                  <b-input-group-text>Filtrer</b-input-group-text>
                </template>

                <b-form-input id="filter-input"
                              v-model="filter"
                              type="search"
                              placeholder="Écrire pour chercher">
                </b-form-input>

                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''">Supprimer</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col lg="6" class="my-1">
            <b-form-group label-for="sort-by-select"
                          label-size="sm"
                          class="mb-0"
                          v-slot="{ ariaDescribedby }">
              <b-input-group size="sm">
                <template #prepend>
                  <b-input-group-text>Trier par</b-input-group-text>
                </template>

                <b-form-select id="sort-by-select"
                               v-model="sortBy"
                               :options="sortOptions"
                               :aria-describedby="ariaDescribedby"
                               class="w-50">
                  <template #first>
                    <option value="">-- vide --</option>
                  </template>
                </b-form-select>

                <b-form-select v-model="sortDesc"
                               :disabled="!sortBy"
                               :aria-describedby="ariaDescribedby"
                               size="sm">
                  <option :value="false">Asc</option>
                  <option :value="true">Desc</option>
                </b-form-select>
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col lg="6" class="my-1">
            <b-form-group class="mb-0">
              <b-input-group size="sm">
                <template #prepend>
                  <b-input-group-text>Par page</b-input-group-text>
                </template>
                <b-form-select id="per-page-select"
                               v-model="perPage"
                               :options="pageOptions">
                </b-form-select>
              </b-input-group>
            </b-form-group>

          </b-col>

          <b-col lg="6" class="my-1">
            <b-form-group v-model="sortDirection"
                          label="Filtrer sur"
                          description="Laissez tout décoché pour filtrer sur toutes les données"
                          label-cols-sm="3"
                          label-align-sm="right"
                          label-size="sm"
                          class="mb-0"
                          v-slot="{ ariaDescribedby }">
              <b-form-checkbox-group v-model="filterOn" :aria-describedby="ariaDescribedby">
                <b-form-checkbox value="created_at">Date création</b-form-checkbox>
                <b-form-checkbox value="titre">Titre</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>

      <b-row class="mt-3">
        <b-col lg="5" class="my-1">
          <b-button variant="outline-success" size="sm" :to="{name: AdminRouteName.ARTICLE_ADD.name}">Créer un nouveau article</b-button>
        </b-col>
        <b-col lg="7" class="my-1">
          <b-pagination v-model="currentPage"
                        :total-rows="totalRows"
                        :per-page="perPage"
                        align="fill"
                        size="sm"
                        class="my-0">
          </b-pagination>
        </b-col>
      </b-row>

      <b-table :items="items"
               :fields="fields"
               :current-page="currentPage"
               :per-page="perPage"
               :filter="filter"
               :busy="isBusy"
               :filter-included-fields="filterOn"
               :sort-by.sync="sortBy"
               :sort-desc.sync="sortDesc"
               :sort-direction="sortDirection"
               stacked="md"
               show-empty
               small
               class="mt-1"
               @filtered="onFiltered">
        <template #table-busy>
          <div class="text-center text-secondary mt-3">
            <b-spinner class="align-middle mr-2"></b-spinner>
            <strong class="align-middle">Chargement...</strong>
          </div>
        </template>

        <template #empty>
          <div class="text-center my-2">
            <p>Il n'y a aucun enregistrement à afficher</p>
          </div>
        </template>

        <template #emptyfiltered>
          <div class="text-center my-2">
            <p>Il n'y a aucun enregistrement correspondant à votre demande</p>
          </div>
        </template>

        <template #cell(titre)="data">
          <router-link :to="{name: AdminRouteName.ARTICLES_DETAIL.name, params: {slug: data.item.slug}}">
            {{ data.item.titre }}
          </router-link>
        </template>

        <template #cell(actions)="data">
          <b-button v-if="data.item.est_active === true" size="sm"
                    @click="activerDesactiverArticle(data.item.slug, data.item)"
                    class="mr-1"
                    variant="outline-danger">
            Desactiver
          </b-button>
          <b-button v-else size="sm"
                    @click="activerDesactiverArticle(data.item.slug, data.item)"
                    variant="outline-success">
            Activer
          </b-button>
        </template>
      </b-table>

    </b-card-body>
  </b-card>

  <router-view v-else></router-view>
</template>

<script>
import AdminApiService from "@/services/administrateur";
import {AdminRouteName, FontAwesomeIcons} from '@/helpers/enums.helper';

export default {
  name: "ViewArticles",
  data() {
    return {
      AdminRouteName,
      FontAwesomeIcons,
      items: [],
      fields: [
        {key: 'created_at', label: 'Date création', sortable: true},
        {key: 'ref_type_service.type_service', label: 'Service', sortable: true},
        {key: 'titre', label: 'Titre', sortable: true},
        {key: 'images_count', label: 'Images', sortable: true},
        {key: 'ref_catalogue.ref_rayon.rayon', label: 'Rayon', sortable: true},
        {key: 'ref_catalogue.ref_section.section', label: 'Section', sortable: true, sortDirection: 'desc'},
        {
          key: 'ref_catalogue.ref_type_produit.type_produit',
          label: 'Type de produit',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'est_active', label: 'Active',
          // eslint-disable-next-line no-unused-vars
          formatter: (value, key, item) => {
            return value ? 'Oui' : 'Non'
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true
        },
        {key: 'actions', label: 'Actions'}
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 20, 50, {value: 100, text: "Show a lot"}],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      isBusy: false,
      options: []
    }
  },

  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return {text: f.label, value: f.key}
          })
    }
  },

  methods: {
    async loadArticles() {
      try {
        this.toggleBusy()
        let articles = []
        let typeService, catalogue, rayon, section, typeProduit;

        await AdminApiService.ArticleService.getArticleList().then(response => {
          response.data.forEach(item => {
            articles.push(item)
          })
        })

        for (let i = 0; i < articles.length; i++) {
          await AdminApiService.TypeServiceService.getTypeServiceDetail(articles[i].ref_type_service).then(response => {
            typeService = response.data;
          })
          await AdminApiService.CatalogueService.getCatalogueDetail(articles[i].ref_catalogue).then(response => {
            catalogue = response.data
          })
          await AdminApiService.RayonService.getRayonDetail(catalogue.ref_rayon).then(response => {
            rayon = response.data
          })
          await AdminApiService.SectionService.getSectionDetail(catalogue.ref_section).then(response => {
            section = response.data
          })
          await AdminApiService.TypeProduitService.getTypeProduitDetail(catalogue.ref_type_produit).then(response => {
            typeProduit = response.data
          })
          articles[i].ref_type_service = typeService
          articles[i].ref_catalogue = catalogue
          articles[i].ref_catalogue.ref_rayon = rayon
          articles[i].ref_catalogue.ref_section = section
          articles[i].ref_catalogue.ref_type_produit = typeProduit
        }

        this.items = articles
        this.totalRows = this.items.length
      } catch (error) {
        console.log(error)
      } finally {
        this.toggleBusy()
      }
    },

    chargerOptions() {
      if (this.items.length !== 0) {
        this.items.forEach(item => {
          this.options.push(item.key)
        })
      }
    },

    async activerDesactiverArticle(articleSlug, article) {
      try {
        let data = {
          "est_active": !article.est_active
        }
        await AdminApiService.ArticleService.patchArticle(articleSlug, data)
      } catch (error) {
        console.log(error)
      } finally {
        await this.loadArticles()
      }
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },

    toggleBusy() {
      this.isBusy = !this.isBusy
    }
  },

  created() {
    this.loadArticles()
  }
}
</script>

<style scoped>

</style>