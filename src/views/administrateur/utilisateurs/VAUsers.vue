<template>
  <div v-if="$route.name === routes.UTILISATEURS.name" class="utilisateurs">
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
            <b-form-checkbox value="username">Username</b-form-checkbox>
            <b-form-checkbox value="first_name">Prénom</b-form-checkbox>
            <b-form-checkbox value="last_name">Nom</b-form-checkbox>
            <b-form-checkbox value="email">Email</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>

      <b-col lg="6">
        <b-form-group
            label="Par page"
            label-size="sm"
            label-cols-sm="2"
            label-align-sm="right"
            description="Veuillez selectionner le nombre d'utilisateurs par page"
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
        <l-create-refresh :load-or-refresh="loadOrRefresh"/>
      </b-col>

      <b-col lg="7" class="my-1">
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
        :items="utilisateurs"
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

      <template #cell(image)="data">
        <b-avatar variant="info" :src="data.item.image"/>
      </template>

      <template #cell(username)="data">
        <b-link :to="{name: routes.UTILISATEURS_DETAIL.name, params: {username: data.item.username}}">
          {{ data.item.username }}
        </b-link>
      </template>

      <template #cell(is_active)="data">
        <b-badge :variant="data.item.is_active === true ? 'success' : 'danger'">
          {{data.item.is_active === true ? 'Oui' : 'Non'}}
        </b-badge>
      </template>

      <template #cell(is_verified)="data">
        <b-badge :variant="data.item.is_verified === true ? 'success' : 'danger'">
          {{data.item.is_verified === true ? 'Oui' : 'Non'}}
        </b-badge>
      </template>

      <template #cell(is_staff)="data">
        <b-badge v-if="data.item.is_staff === true" pill variant="success">Administrateur</b-badge>
        <b-badge v-else pill variant="primary">Utilisateur</b-badge>
      </template>

<!--      <template #cell(actions)="data">-->
<!--        <b-button-->
<!--            :variant="data.item.is_active === true ? 'outline-danger' : 'outline-success'"-->
<!--            size="sm"-->
<!--            @click="alert(data.item.username)"-->
<!--        >-->
<!--          {{ data.item.is_active === true ? 'Desactiver' : 'Activer' }}-->
<!--        </b-button>-->
<!--      </template>-->
    </b-table>
  </div>

  <router-view v-else/>
</template>

<script>
import {htmlTitle} from "@/utils/tools";
import {tableViewMixin} from "@/mixins/table_view.mixin";
import {commonMixin} from "@/mixins/common.mixin";
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";
import UtilisateurModel from "@/models/user/utilisateur.model";

export default {
  name: "VAUsers",
  mixins: [tableViewMixin, commonMixin],
  title() {
    return htmlTitle('Utilisateurs')
  },
  data() {
    return {
      fields: UtilisateurModel.tableFields,
      routes: LemkaHelpers.Routes,
    }
  },
  computed: {
    ...mapGetters({utilisateurs: 'Utilisateurs/utilisateurs', busy: 'Utilisateurs/loadingStatus'})
  },
  created() {
    if (this.utilisateurs.length === 0) {
      this.loadOrRefresh()
      this.totalRows = this.utilisateurs.length
    }
  },
  methods: {
    ...mapActions({loadUtilisateurs: "Utilisateurs/loadUtilisateurs"}),
    initialisation: async function () {
      if (this.merceries.length === 0) {
        await this.loadMerceries()
      }
    },
    loadOrRefresh: async function () {
      await this.loadUtilisateurs()
      this.itemsLength(this.utilisateurs)
    },
    DesactiverUtilisateur: function() {
      // TODO : Implémentation du code pour la désactivation de l'utilisateur.
    },
    alert(item) {
      alert(item)
    }
  },
}
</script>

<style scoped>

</style>