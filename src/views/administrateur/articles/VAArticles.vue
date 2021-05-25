<template>
  <div v-if="$route.name === routes.ARTICLES.name" class="articles">
    <b-row>
      <b-col lg="6">
        <b-form-group
            label="Filtrer"
            label-size="sm"
            label-cols-sm="2"
            label-align-sm="right"
            description="Veuillez encoder pour chercher"
        >
          <b-input-group size="sm">
            <b-form-input
                v-model="filter"
                type="search"
                placeholder="Chercher ..."
            />
            <b-input-group-append>
              <b-button
                  :disabled="!filter"
                  @click="filter = ''"
              >
                Supprimer
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6">
        <b-form-group
            label="Trier par"
            label-size="sm"
            label-cols-sm="2"
            label-align-sm="right"
            description="Veuillez faire votre choix de tri"
            v-slot="{ ariaDescribedby }"
        >
          <b-input-group size="sm">
            <b-form-select
                v-model="sortBy"
                :options="sortOptions"
                :aria-describedby="ariaDescribedby"
                class="w-75"
            >
              <template #first>
                <option value="">-- vide --</option>
              </template>
            </b-form-select>

            <b-form-select
                v-model="sortDesc"
                :disabled="!sortBy"
                :aria-describedby="ariaDescribedby"
                size="sm"
            >
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="6">
        <b-form-group
            v-model="sortDirection"
            label="Filtrer sur"
            label-size="sm"
            label-cols-sm="2"
            label-align-sm="right"
            description="Laissez tout décoché pour filtrer sur toutes les données"
            v-slot="{ ariaDescribedby }"
        >
          <b-form-checkbox-group
              v-model="filterOn"
              :aria-describedby="ariaDescribedby"
          >
            <b-form-checkbox value="created_at">Date création</b-form-checkbox>
            <b-form-checkbox value="titre">Titre</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>

      <b-col lg="6">
        <b-form-group
            label="Par page"
            label-size="sm"
            label-cols-sm="2"
            label-align-sm="right"
            description="Veuillez selectionner le nombre d'article par page">
          <b-form-select
              v-model="perPage"
              :options="pageOptions" size="sm"
          >
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row class="mt-3 mb-2">
      <b-col lg="5" class="my-1">
        <l-create-refresh
            create_message="Ajouter un article"
            :route="routes.ARTICLES_ADD_OR_UPDATE.name"
            :load-or-refresh="loadOrRefresh"
        />
      </b-col>

      <b-col lg="7" class="my-1">
        <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
        >
        </b-pagination>
      </b-col>
    </b-row>

    <b-table
        :items="articles"
        :fields="fields"
        :busy="busy"
        :per-page="perPage"
        :current-page="currentPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        hover
        show-empty
        small
        stacked="md"
        class="text-center"
        @filtered="onFiltered"
    >
      <template #table-busy>
        <l-table-busy/>
      </template>

      <template #empty>
        <l-table-empty/>
      </template>

      <template #emptyfiltered>
        <l-table-empty-filtered/>
      </template>

      <template #cell(created_at)="data">
        {{ data.item.created_at | localTimeStr }}
      </template>

      <template #cell(type_service)="data">
        {{ data.item.type_service.nom }}
      </template>

      <template #cell(titre)="data">
        <router-link :to="{name: routes.ARTICLES_ADD_OR_UPDATE.name, params: {slug: data.item.slug}}">
          {{ data.item.titre }}
        </router-link>
      </template>

      <template #cell(est_active)="data">
        <b-button
            :variant="data.item.est_active === true ? 'outline-danger' : 'outline-success'"
            size="sm"
            @click="activerDesactiver(data.item)"
        >
          <i class="fas fa-power-off"></i>
          {{ data.item.est_active === true ? 'Désactiver' : 'Publier' }}
        </b-button>
      </template>
    </b-table>
  </div>

  <router-view v-else/>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import LemkaHelpers from "@/helpers";
import ArticleModel from "@/models/article/article.model";
import {tableViewMixin} from "@/mixins/table_view.mixin";
import {htmlTitle} from "@/utils/tools";

export default {
  name: "VAArticles",
  mixins: [tableViewMixin],
  title() {
    return htmlTitle('Articles')
  },
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
    ...mapActions({loadArticles: "Articles/loadArticles", updateArticle: "Articles/updateArticle"}),
    loadOrRefresh: async function () {
      await this.loadArticles()
    },
    activerDesactiver: function (item) {
      let article = new ArticleModel()
      Object.assign(article, item)
      let payload = article.toUpdatePayload()
      payload.est_active = !payload.est_active
      this.updateArticle(payload)
    }
  },
  created() {
    if (this.articles.length === 0) {
      this.loadOrRefresh()
    }
  }
}
</script>