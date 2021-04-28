<template>
  <div class="admin_demande_de_devis">
    <div>
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
          <l-create-refresh :load-or-refresh="loadOrRefresh"/>
        </b-col>

        <b-col lg="7" class="my-1">
          <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                        align="fill" size="sm" class="my-0">
          </b-pagination>
        </b-col>
      </b-row>


      <b-table :items="adminDDEnCours" :fields="fields" :busy="busy" :current-page="currentPage" :per-page="perPage"
               :filter="filter" :filter-included-fields="filterOn" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
               :sort-direction="sortDirection" show-empty small hover stacked="md" class="text-center mt-3" @filtered="onFiltered">
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

        <template #cell(est_urgent)="data">
          <b-badge pill :variant="data.item.est_urgent === true ? 'success' : 'danger'">
            <i :class="`fas fa-${data.item.est_urgent  === true ? 'check' : 'times'}-circle`"></i>
          </b-badge>
        </template>

        <template #cell(est_traite)="data">
          <b-badge pill :variant="data.item.est_traite === true ? 'success' : 'danger'">
            <i :class="`fas fa-${data.item.est_traite  === true ? 'check' : 'times'}-circle`"></i>
          </b-badge>
        </template>

        <template #cell(actions)="data">
          <b-button-group size="sm">
            <b-button variant="outline-success" @click="creerDevis(data.item)">
              Créer un dévis
            </b-button>
          </b-button-group>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import DemandeDevisModel from "@/models/demande_devis.model";
import {mapActions, mapGetters} from "vuex";
import {tableViewMixin} from "@/mixins/table_view.mixin";
import LemkaHelpers from "@/helpers";
import {htmlTitle} from "@/utils/tools";
import DevisModel from "@/models/devis/devis.model";

export default {
  name: "VADemandeDeDevis",
  mixins: [tableViewMixin],
  title() {
    return htmlTitle("Demande de devis")
  },
  data() {
    return {
      fields: DemandeDevisModel.tableFields,
      routes: LemkaHelpers.Routes
    }
  },
  computed: {
    ...mapGetters({adminDDEnCours: "DemandesDevis/adminDDEnCours", busy: "DemandesDevis/adminDDLoadingStatus"})
  },
  methods: {
    ...mapActions({
      loadAdminDD: "DemandesDevis/loadAdminDD",
      updateAdminDD: "DemandesDevis/updateAdminDD",
      createDevis: "Devis/createDevis"
    }),
    loadOrRefresh: async function () {
      if (this.adminDDEnCours.length === 0) {
        await this.loadAdminDD()
      }
      this.itemsLength(this.adminDDEnCours)
    },
    creerDevis: function (demande_devis) {
      let DDToUpdate = new DemandeDevisModel(demande_devis)
      let devis = new DevisModel()
      devis.demande_devis = DDToUpdate
      this.createDevis(devis.toCreatePayload()).then(res => {
        DDToUpdate.en_cours = true
        this.updateAdminDD(DDToUpdate.toUpdatePayload()).then(() => {
          this.$router.push({name: this.routes.DEVIS_ADD_OR_UPDATE.name, params: {id: res.id}})
        })
      }, error => {
        console.log(error)
      })
    },
  },
  created() {
    this.loadOrRefresh()
  },
}
</script>

<style scoped>

</style>