<template>
  <div class="mensurations">
    <div v-if="$route.name === routes.PARAMETRES_MENSURATION.name">

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
        <b-col lg="6"></b-col>

        <b-col lg="6">
          <b-form-group
              label="Par page"
              label-size="sm"
              label-cols-sm="2"
              label-align-sm="right"
              description="Veuillez selectionner le nombre d'article par page"
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
        <b-col lg="5">
          <b-button-group size="sm">
            <b-button
                variant="outline-success"
                :to="{name: routes.PARAMETRES_MENSURATION_ADD_OR_UPDATE.name}"
            >
              {{ routes.PARAMETRES_MENSURATION_ADD_OR_UPDATE.value }}
            </b-button>
            <b-button
                variant="outline-primary"
                @click="loadMensurations"
            >
              <i class="fas fa-sync-alt"></i>
            </b-button>
          </b-button-group>
        </b-col>

        <b-col lg="7">
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
          :items="mensurations"
          :fields="fields"
          :busy="busy"
          :per-page="perPage"
          :filter="filter"
          :current-page="currentPage"
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
          <TableBusy/>
        </template>
        <template #empty>
          <TableEmpty/>
        </template>
        <template #emptyfiltered>
          <TableEmptyFiltered/>
        </template>

        <template #cell(actions)="data">
          <l-table-button-update-delete
              :update-route-to-name="routes.PARAMETRES_MENSURATION_ADD_OR_UPDATE.name"
              :item-id="data.item.id"
              @clickShowModal="showModal('delete-modal-' + data.item.id)"
          />
          <l-table-delete-modal
              :modal-id="data.item.id"
              :modal-title="data.item.nom"
              :modal-text="data.item.nom"
              @clickHideModal="hideModal('delete-modal-' + data.item.id)"
              @clickDelete="supprimerMensuration(data.item)"
          />
        </template>
      </b-table>
    </div>

    <router-view v-else></router-view>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import LemkaHelpers from "@/helpers";
import MensurationModel from "@/models/user/mensuration.model";
import TableEmptyFiltered from "@/components/Table/LTableEmptyFiltered";
import TableEmpty from "@/components/Table/LTableEmpty";
import TableBusy from "@/components/Table/LTableBusy";
import {tableViewMixin} from "@/mixins/table_view.mixin";
import {commonMixin} from "@/mixins/common.mixin";
import LTableButtonUpdateDelete from "@/components/Table/LTableButtonUpdateDelete";
import LTableDeleteModal from "@/components/Table/LTableDeleteModal";

export default {
  name: "VAMensurations",
  components: {LTableDeleteModal, LTableButtonUpdateDelete, TableEmptyFiltered, TableEmpty, TableBusy},
  mixins: [tableViewMixin, commonMixin],
  data() {
    return {
      fields: MensurationModel.tableFields,
      routes: LemkaHelpers.Routes,
      icons: LemkaHelpers.FontAwesomeIcons
    }
  },
  computed: {
    ...mapGetters({mensurations: 'Mensurations/mensurations', busy: 'Mensurations/mensurationLoadingStatus'}),
  },
  methods: {
    ...mapActions({
      deleteMensuration: 'Mensurations/deleteMensuration',
      loadMensurations: "Mensurations/loadMensurations"
    }),
    initialisation: async function() {
      if (this.mensurations.length === 0) {
        await this.loadMensurations()
      }
      this.itemsLength(this.mensurations)
    },
    supprimerMensuration: function (item) {
      this.deleteMensuration(item)
      this.hideModal('delete-modal-' + item.id)
    }
  },
  created() {
    this.initialisation()
  }
}
</script>

<style scoped>

</style>