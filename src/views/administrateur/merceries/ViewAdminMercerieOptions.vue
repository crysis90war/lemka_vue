<template>
  <div class="options">
    <h2>{{ mercerie.nom }}</h2>
    <div class="mt-5">
      <b-button-group class="my-2">
        <b-button variant="outline-dark" @click="$router.push({name: routes.MERCERIES.name})">
          <i class="fas fa-arrow-left"></i>
        </b-button>
        <b-button variant="outline-success"
                  :to="{name: routes.MERCERIE_OPTIONS_ADD_OR_UPDATE.name, params: {mercerie_id: id}}">
          Ajouter option
        </b-button>
        <b-button variant="outline-primary" size="sm" @click="loadOrRefresh">
          <i class="fas fa-sync-alt"></i>
        </b-button>
      </b-button-group>
      <b-table :items="mercerie_options" :fields="fields" :busy="busy"
               hover show-empty small stacked="md" class="text-center">
        <template #table-busy>
          <TableBusy/>
        </template>

        <template #empty>
          <TableEmpty/>
        </template>

        <template #emptyfiltered>
          <TableEmptyFiltered/>
        </template>

        <template #cell(est_publie)="data">
          <b-button :variant="data.item.est_publie === true ? 'outline-danger' : 'outline-success'">
            {{ data.item.est_publie === true ? 'Désactiver' : 'Publier' }}
          </b-button>
        </template>

        <template #cell(actions)="data">
          <b-button-group>
            <b-button variant="outline-primary"
                      :to="{name: routes.MERCERIE_OPTIONS_ADD_OR_UPDATE.name, params: {mercerie_id: id, id: data.item.id}}">
              <i class="fas fa-edit"></i>
            </b-button>
            <b-button variant="outline-danger">
              <i class="fas fa-trash-alt"></i>
            </b-button>
          </b-button-group>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {fonctions} from "@/mixins/functions.mixin";
import MercerieOptionModel from "@/models/mercerie_option.model";
import MercerieModel from "@/models/mercerie.model";
import TableEmptyFiltered from "@/components/TableEmptyFiltered";
import TableEmpty from "@/components/TableEmpty";
import TableBusy from "@/components/TableBusy";
import LemkaHelpers from "@/helpers";

export default {
  name: "ViewMercerieOptions",
  components: {TableEmptyFiltered, TableEmpty, TableBusy},
  title() {
    return this.mercerie.nom
  },
  mixins: [fonctions],
  props: {
    id: {
      required: true
    }
  },
  data() {
    return {
      mercerie: new MercerieModel(),
      fields: MercerieOptionModel.tableFields,
      routes: LemkaHelpers.Routes
    }
  },
  computed: {
    ...mapGetters({
      mercerie_options: 'Options/mercerie_options',
      busy: 'Options/loadingStatus',
      merceries: 'Merceries/merceries',
      couleurs: 'Couleurs/couleurs'
    }),
  },
  methods: {
    ...mapActions({loadMercerieOptions: 'Options/loadMercerieOptions', loadCouleurs: 'Couleurs/loadCouleurs'}),
    loadOrRefresh: async function () {
      await this.loadMercerieOptions(this.id)
    },
    initialisation: async function () {
      if (this.id !== undefined) {
        Object.assign(this.mercerie, this.$store.getters["Merceries/mercerie"](this.id))
      }
    }
  },
  created() {
    // Object.assign(this.mercerie, this.$store.dispatch('merceries/loadMercerie', this.id))
    if (this.id) {
      this.loadOrRefresh()
    }
    this.initialisation()
  }
}
</script>

<style scoped>

</style>