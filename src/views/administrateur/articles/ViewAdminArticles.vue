<template>
  <div v-if="$route.name === routes.ARTICLES.name" class="articles">
    <b-row>
      <b-col lg="6">
        <b-form-group label="Filtrer" label-size="sm" label-cols-sm="2" label-align-sm="right"
                      description="Veuillez encoder pour chercher">
          <b-input-group size="sm">
            <b-form-input v-model="filter" type="search" placeholder="Chercher ..."></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Supprimer</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6">
        <b-form-group label="Trier par" label-size="sm" label-cols-sm="2" label-align-sm="right"
                      description="Veuillez faire votre choix de tri"
                      v-slot="{ ariaDescribedby }">
          <b-input-group size="sm">
            <b-form-select v-model="sortBy" :options="sortOptions" :aria-describedby="ariaDescribedby" class="w-75">
              <template #first>
                <option value="">-- vide --</option>
              </template>
            </b-form-select>

            <b-form-select v-model="sortDesc" :disabled="!sortBy" :aria-describedby="ariaDescribedby" size="sm">
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
                      label="Filtrer sur" label-size="sm" label-cols-sm="2" label-align-sm="right"
                      description="Laissez tout décoché pour filtrer sur toutes les données"
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
        <b-button-group>
          <b-button variant="outline-success" size="sm" :to="{name: routes.ARTICLES_ADD_OR_UPDATE.name}">
            Créer un nouveau article
          </b-button>
          <b-button variant="outline-primary" size="sm" @click="loadOrRefresh">
            <i class="fas fa-sync-alt"></i>
          </b-button>
        </b-button-group>
      </b-col>

      <b-col lg="7" class="my-1">
        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                      align="fill" size="sm" class="my-0">
        </b-pagination>
      </b-col>
    </b-row>

    <b-table :items="articles" :fields="fields" :busy="busy"
             :per-page="perPage" :current-page="currentPage"
             :filter="filter" :filter-included-fields="filterOn"
             :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
             hover show-empty small stacked="md" @filtered="onFiltered" class="text-center">

      <template #table-busy>
        <div class="text-center text-secondary">
          <b-spinner small class="align-middle mr-2"></b-spinner>
          <strong class="align-middle">Chargement...</strong>
        </div>
      </template>

      <template #empty>
        <div class="text-center">
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
        <router-link :to="{name: routes.ARTICLES_ADD_OR_UPDATE.name, params: {slug: data.item.slug}}">
          {{ data.item.titre }}
        </router-link>
      </template>

      <template #cell(actions)="data">
        <b-button :variant="data.item.est_active === true ? 'outline-danger' : 'outline-success'"
                  size="sm" class="mr-1"
                  @click="activerDesactiverArticle(data.item.slug, data.item)">
          {{ data.item.est_active === true ? 'Désactiver' : 'Activer' }}
        </b-button>
      </template>
    </b-table>

    <pre>{{articles}}</pre>
  </div>

  <router-view v-else></router-view>

</template>

<script>
import ArticleModel from "@/models/article.model";
import ApiService from "@/services";
import LemkaHelpers from "@/helpers";
import {tableViewMixin} from "@/mixins/table_view.mixin";
import {mapGetters} from "vuex";

export default {
  name: "ViewAdminArticles",
  mixins: [tableViewMixin],
  data() {
    return {
      fields: ArticleModel.tableFields,
      routes: LemkaHelpers.Routes
    }
  },
  computed: {
    ...mapGetters({articles: 'Articles/articles', busy: 'Articles/loadingStatus'})
  },
  methods: {
    loadOrRefresh: function() {
      this.$store.dispatch('Articles/loadArticles')
    },
    activerDesactiverArticle: async function (articleSlug, article) {
      try {
        let data = {
          "est_active": !article.est_active
        }
        await ApiService.Articles.patchArticle(articleSlug, data)
      } catch (error) {
        console.log(error)
      } finally {
        await this.loadArticles()
      }
    }
  },
  created() {
    if (this.articles.length === 0) {
      this.loadOrRefresh()
    }
  }
}
</script>

<style scoped>

</style>