<template>
  <div v-if="$route.name === routes.MERCERIES.name" class="merceries">
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
                      description="Veuillez faire votre choix de tri" v-slot="{ ariaDescribedby }">
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
        <b-form-group v-model="sortDirection" label="Filtrer sur" label-size="sm" label-cols-sm="2"
                      label-align-sm="right" description="Laissez tout décoché pour filtrer sur toutes les données"
                      v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group v-model="filterOn" :aria-describedby="ariaDescribedby">
            <b-form-checkbox value="categorie">Catégorie</b-form-checkbox>
            <b-form-checkbox value="nom">Nom</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>

      <b-col lg="6">
        <b-form-group label="Par page" label-size="sm" label-cols-sm="2" label-align-sm="right"
                      description="Veuillez selectionner le nombre d'article par page">
          <b-form-select v-model="perPage" :options="pageOptions" size="sm">
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row class="mt-3 mb-2">
      <b-col lg="5">
        <b-button-group>
          <b-button variant="outline-success" size="sm" :to="{name: routes.MERCERIES_ADD_OR_UPDATE.name}">
            Créer un nouveau
          </b-button>
          <b-button variant="outline-primary" size="sm" @click="loadOrRefresh">
            <i class="fas fa-sync-alt"></i>
          </b-button>
        </b-button-group>
      </b-col>

      <b-col lg="7">
        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                      align="fill" size="sm" class="my-0">
        </b-pagination>
      </b-col>
    </b-row>

    <b-table :items="merceries" :fields="fields" :busy="busy" :per-page="perPage" :filter="filter"
             :current-page="currentPage" :filter-included-fields="filterOn" :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
             hover show-empty small stacked="md" class="text-center"
             @filtered="onFiltered">
      <template #table-busy>
        <TableBusy/>
      </template>

      <template #empty>
        <TableEmpty/>
      </template>

      <template #emptyfiltered>
        <TableEmptyFiltered/>
      </template>

      <template #cell(nom)="data">
        <b-link :to="{name: routes.MERCERIE_OPTIONS.name, params: {id: data.item.id}}">
          {{ data.item.nom }}
        </b-link>
      </template>

      <template #cell(est_publie)="data">
        <b-button :variant="data.item.est_publie === true ? 'outline-danger' : 'outline-success'" size="sm">
          {{ data.item.est_publie === true ? 'Désactiver' : 'Publier' }}
        </b-button>
      </template>

      <template #cell(actions)="data">
        <b-button-group>
          <b-button size="sm" variant="outline-primary" :to="{name: routes.MERCERIES_ADD_OR_UPDATE.name, params: {id: data.item.id}}">
            <i class="fas fa-edit"></i>
          </b-button>

          <b-button size="sm" variant="outline-danger" @click="deleteMercerie(data.item)">
            <i class="fas fa-trash-alt"></i>
          </b-button>
        </b-button-group>
      </template>
    </b-table>
  </div>

  <router-view v-else></router-view>
</template>

<script>
import {tableViewMixin} from "@/mixins/table_view.mixin";
import {mapActions, mapGetters} from "vuex";
import MercerieModel from "@/models/mercerie.model";
import {fonctions} from "@/mixins/functions.mixin";
import TableBusy from "@/components/TableBusy";
import TableEmpty from "@/components/TableEmpty";
import TableEmptyFiltered from "@/components/TableEmptyFiltered";
import LemkaHelpers from "@/helpers";

export default {
  name: "VAMerceries",
  components: {TableEmptyFiltered, TableEmpty, TableBusy},
  mixins: [tableViewMixin, fonctions],
  title() {
    return this.$route.meta.value
  },
  data() {
    return {
      mercerie: new MercerieModel(),
      fields: MercerieModel.tableFields,
      routes: LemkaHelpers.Routes
    }
  },
  computed: {
    ...mapGetters({merceries: 'Merceries/merceries', busy: 'Merceries/loadingStatus'})
  },
  methods: {
    ...mapActions({loadMerceries: 'Merceries/loadMerceries', deleteMercerie: 'Merceries/deleteMercerie'}),

    loadOrRefresh: function () {
      this.loadMerceries()
    },
  },
  created() {
    if (this.merceries.length === 0) {
      this.loadOrRefresh()
    }
  }
}
</script>

<style scoped>

</style>