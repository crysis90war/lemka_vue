<template>
  <div v-if="$route.name === routes.MERCERIES.name" class="merceries">
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
            <b-form-checkbox value="nom">Nom</b-form-checkbox>
            <b-form-checkbox value="reference">Réference</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>

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
        <create-refresh-button-group
            :load-or-refresh="loadMerceries"
            :route="routes.MERCERIES_ADD_OR_UPDATE.name"
            create_message="Ajouter mercerie"
        />
      </b-col>

      <b-col lg="7">
        <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
        />
      </b-col>
    </b-row>

    <b-table
        :items="merceries"
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

      <template #cell(categorie)="data">
        {{ data.item.categorie.nom }}
      </template>

      <template #cell(est_publie)="data">
        <b-button
            size="sm"
            :variant="data.item.est_publie === true ? 'outline-danger' : 'outline-success'"
            @click="activerDesactiver(data.item)"
        >
          <i class="fas fa-power-off"></i>
          {{ data.item.est_publie === true ? 'Désactiver' : 'Publier' }}
        </b-button>
      </template>

      <template #cell(actions)="data">
        <b-button-group>
          <b-button
              size="sm"
              variant="outline-primary"
              :to="{name: routes.MERCERIES_ADD_OR_UPDATE.name, params: {id: data.item.id}}"
          >
            <i class="fas fa-edit"></i>
          </b-button>

          <b-button
              size="sm"
              variant="outline-danger"
              @click="deleteMercerie(data.item)"
          >
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
import MercerieModel from "@/models/mercerie/mercerie.model";
import {fonctions} from "@/mixins/functions.mixin";
import LemkaHelpers from "@/helpers";
import CreateRefreshButtonGroup from "@/components/Table/LCreateRefresh";
import {htmlTitle} from "@/utils/tools";

export default {
  name: "VAMerceries",
  components: {CreateRefreshButtonGroup},
  mixins: [tableViewMixin, fonctions],
  title() {
    return htmlTitle("Merceries")
  },
  data() {
    return {
      fields: MercerieModel.tableFields,
      routes: LemkaHelpers.Routes
    }
  },
  computed: {
    ...mapGetters({merceries: 'Merceries/merceries', busy: 'Merceries/loadingStatus'})
  },
  methods: {
    ...mapActions({
      loadMerceries: 'Merceries/loadMerceries',
      updateMercerie: "Merceries/updateMercerie",
      deleteMercerie: 'Merceries/deleteMercerie'
    }),
    activerDesactiver: function (item) {
      let mercerie = new MercerieModel()
      Object.assign(mercerie, item)
      let payload = mercerie.toUpdatePayload()
      payload.est_publie = !payload.est_publie
      this.updateMercerie(payload)
    }
  },
  created() {
    if (this.merceries.length === 0) {
      this.loadMerceries()
    }
  }
}
</script>

<style scoped>

</style>