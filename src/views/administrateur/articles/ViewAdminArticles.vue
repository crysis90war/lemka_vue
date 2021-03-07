<template>
  <div v-if="$route.name === links.articlesLink">
    <b-row>
      <b-col lg="6">
        <b-form-group label="Filtrer" label-size="sm"
                      label-cols-sm="2" label-align-sm="right"
                      description="Veuillez encoder pour chercher">
          <b-input-group size="sm">
            <b-form-input v-model="filter"
                          type="search" placeholder="Chercher ...">
            </b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">
                Supprimer
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6">
        <b-form-group label="Trier par" label-size="sm"
                      label-cols-sm="2" label-align-sm="right"
                      description="Veuillez faire votre choix de tri"
                      v-slot="{ ariaDescribedby }">
          <b-input-group size="sm">
            <b-form-select v-model="sortBy" :options="sortOptions"
                           :aria-describedby="ariaDescribedby" class="w-75">
              <template #first>
                <option value="">-- vide --</option>
              </template>
            </b-form-select>

            <b-form-select v-model="sortDesc" :disabled="!sortBy"
                           :aria-describedby="ariaDescribedby" size="sm">
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="6">
        <b-form-group v-model="sortDirection"
                      label="Filtrer sur" label-size="sm" label-cols-sm="2"
                      label-align-sm="right" description="Laissez tout décoché pour filtrer sur toutes les données"
                      v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group v-model="filterOn" :aria-describedby="ariaDescribedby">
            <b-form-checkbox value="created_at">Date création</b-form-checkbox>
            <b-form-checkbox value="titre">Titre</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>

      <b-col lg="6">
        <b-form-group label="Par page" label-size="sm" label-cols-sm="2"
                      label-align-sm="right" description="Veuillez selectionner le nombre d'article par page">
          <b-form-select v-model="perPage" :options="pageOptions" size="sm">
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row class="mt-3 mb-2">
      <b-col lg="5" class="my-1">
        <b-button variant="outline-success" size="sm"
                  :to="{name: links.addOrUpdate}">
          Créer un nouveau article
        </b-button>
      </b-col>

      <b-col lg="7" class="my-1">
        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                      align="fill" size="sm" class="my-0">
        </b-pagination>
      </b-col>
    </b-row>

    <b-table :items="items" :fields="fields" :current-page="currentPage"
             :per-page="perPage" :filter="filter" :busy="isBusy"
             :filter-included-fields="filterOn" :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
             hover show-empty small stacked="md" @filtered="onFiltered">
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

      <template #cell(created_at)="data">
        {{ data.item.created_at | localTimeStr }}
      </template>

      <template #cell(titre)="data">
        <router-link :to="{name: links.articleDetailLink, params: {slug: data.item.slug}}">
          {{ data.item.titre }}
        </router-link>
      </template>

      <template #cell(actions)="data">
        <b-button size="sm"
                  class="mr-1"
                  :variant="data.item.est_active === true ? 'outline-danger' : 'outline-success'"
                  @click="activerDesactiverArticle(data.item.slug, data.item)">
          {{ data.item.est_active === true ? 'Désactiver' : 'Activer' }}
        </b-button>
      </template>
    </b-table>
    <b-jumbotron>
      <pre>{{ items }}</pre>
    </b-jumbotron>
  </div>

  <router-view v-else></router-view>

</template>

<script>
import ApiService from "@/services";
import {LemkaEnums} from '@/helpers/enums.helper';
import ArticleModel from "@/models/article.model";
import {tableViewMixin} from "@/mixins/table_view.mixin";
import LemkaHelpers from "@/helpers";

export default {
  name: "ViewAdminArticles",
  mixins: [tableViewMixin],
  data() {
    return {
      fields: [
        {key: 'created_at', label: 'Date de création', sortable: true},
        {key: 'type_service', label: 'Service', sortable: true},
        {key: 'titre', label: 'Titre', sortable: true},
        {key: 'images_count', label: 'Images', sortable: true},
        {key: 'likes_count', label: 'Likes', sortable: true},
        {key: 'rayon', label: 'Rayon', sortable: true},
        {key: 'section', label: 'Section', sortable: true},
        {key: 'type_produit', label: 'Type de produit', sortable: true},
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

      links: {
        articlesLink: LemkaEnums.Routes.ARTICLES.name,
        articleDetailLink: LemkaEnums.Routes.ARTICLES_DETAIL.name,
        addOrUpdate: LemkaHelpers.Routes.ARTICLES_ADD_OR_UPDATE.name,
      },
    }
  },

  methods: {
    loadArticles: async function () {
      try {
        this.toggleBusy()
        this.items = await ArticleModel.fetch_articles()
      } catch (error) {
        console.log(error)
      } finally {
        this.toggleBusy()
      }
    },

    activerDesactiverArticle: async function (articleSlug, article) {
      try {
        let data = {
          "est_active": !article.est_active
        }
        await ApiService.ArticleService.patchArticle(articleSlug, data)
      } catch (error) {
        console.log(error)
      } finally {
        await this.loadArticles()
      }
    },
  },

  mounted() {
    this.loadArticles()
  }
}
</script>

<style scoped>

</style>