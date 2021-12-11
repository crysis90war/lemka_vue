<template>
  <div v-if="$route.name === routes.DEVIS.name">
    <div>
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
                  placeholder="Chercher ..."/>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">
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
              description="Laissez tous décochés pour filtrer sur toutes les données"
              v-slot="{ ariaDescribedby }"
          >
            <b-form-checkbox-group
                v-model="filterOn"
                :aria-describedby="ariaDescribedby"
            >
              <b-form-checkbox value="created_at">Date de création</b-form-checkbox>
              <b-form-checkbox value="numero_devis">N° Devis</b-form-checkbox>
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
              description="Veuillez sélectionner le nombre d'articles par page"
          >
            <b-form-select
                v-model="perPage"
                :options="pageOptions"
                size="sm"
            >
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="mt-3 mb-2">
        <b-col lg="5" class="my-1">
          <l-create-refresh :load-or-refresh="loadDevis"/>
        </b-col>

        <b-col lg="7" class="my-1">
          <b-pagination
              v-model="currentPage"
              :total-rows="longueur"
              :per-page="perPage"
              align="fill"
              size="sm"
              class="my-0"
          >
          </b-pagination>
        </b-col>
      </b-row>


      <b-table
          :items="deviss"
          :fields="fields"
          :busy="busy"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filter-included-fields="filterOn"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          show-empty
          small
          hover
          stacked="md"
          class="text-center mt-3"
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

        <template #cell(est_accepte)="data">
          <b-badge :variant="devis.statutDevis(data.item).variant">
            {{ devis.statutDevis(data.item).etat }}
          </b-badge>
        </template>

        <template #cell(actions)="data">
          <b-button-group size="sm">
            <b-button :to="{name: routes.DEVIS_ADD_OR_UPDATE.name, params: {id: data.item.id}}"
                      variant="outline-primary">
              <i class="fas fa-edit"></i>
            </b-button>

            <b-button variant="outline-info">
              <i :class="FAIcons.INFO"></i>
            </b-button>
          </b-button-group>
        </template>
      </b-table>
    </div>
  </div>
  <router-view v-else></router-view>
</template>

<script>
import DevisModel from "@/models/devis/devis.model";
import {mapActions, mapGetters} from "vuex";
import {tableViewMixin} from "@/mixins/table_view.mixin";
import LemkaHelpers from "@/helpers";
import {htmlTitle} from "@/utils/tools";

export default {
  name: "VADevis",
  mixins: [tableViewMixin],
  title() {
    return htmlTitle('Devis')
  },
  data() {
    return {
      devis: new DevisModel(),
      routes: LemkaHelpers.Routes,
      fields: DevisModel.tableFields,
      FAIcons: LemkaHelpers.FontAwesomeIcons
    }
  },
  computed: {
    ...mapGetters({deviss: "Devis/deviss", busy: "Devis/loadingStatus"}),
    longueur() {
      return this.deviss.length
    }
  },
  methods: {
    ...mapActions({
      loadDevis: "Devis/loadDevis",
      updateDevis: "Devis/updateDevis",
      updateDemandeDevis: "DemandesDevis/updateAdminDD"
    }),
    loadOrRefresh: async function () {
      await this.loadDevis()
      this.itemsLength(this.deviss)
    }
  },
  created() {
    this.loadOrRefresh();
  },
}
</script>

<style scoped>

</style>