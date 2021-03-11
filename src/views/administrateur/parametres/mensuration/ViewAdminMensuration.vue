<template>
  <div v-if="$route.name === routes.PARAMETRES_MENSURATION.name">

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
        <b-button-group size="sm">
          <b-button variant="outline-success"
                    :to="{name: routes.PARAMETRES_MENSURATION_ADD_OR_UPDATE.name}">
            {{ routes.PARAMETRES_MENSURATION_ADD_OR_UPDATE.value }}
          </b-button>
          <b-button variant="outline-primary" @click="loadOrRefresh">
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

    <b-table :items="items" :fields="fields" :busy="busy" :per-page="perPage" :filter="filter"
             :current-page="currentPage" :filter-included-fields="filterOn" :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
             hover show-empty small stacked="md" class="text-center" @filtered="onFiltered">

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
        <b-link :to="{name: 'ViewAdminMensurationAddOrUpdate', params: {id: data.item.id}}">
          {{ data.item.nom }}
        </b-link>
      </template>

      <template #cell(actions)="data">
        <b-button variant="outline-danger" size="sm" class="mr-1"
                  @click="deleteMensuration(data.item)">
          Suprrimer
        </b-button>
      </template>

    </b-table>
  </div>

  <router-view v-else></router-view>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import LemkaHelpers from "@/helpers";
import MensurationModel from "@/models/mensuration.model";
import TableEmptyFiltered from "@/components/TableEmptyFiltered";
import TableEmpty from "@/components/TableEmpty";
import TableBusy from "@/components/TableBusy";
import {tableViewMixin} from "@/mixins/table_view.mixin";

export default {
  name: "ViewAdminMensuration",
  components: {TableEmptyFiltered, TableEmpty, TableBusy},
  mixins: [tableViewMixin],
  data() {
    return {
      fields: MensurationModel.tableFields,
      routes: LemkaHelpers.Routes
    }
  },
  computed: {
    ...mapGetters({busy: 'Mensurations/loadingStatus', items: 'Mensurations/mensurations'}),
  },
  methods: {
    ...mapActions({
      deleteMensuration: 'Mensurations/deleteMensuration',
      loadMensurations: "Mensurations/loadMensurations"
    }),
    loadOrRefresh: function() {
      this.loadMensurations()
    }
  },
  created() {
    if (this.items.length === 0) {
      this.loadOrRefresh()
    }
  }
}
</script>

<style scoped>

</style>