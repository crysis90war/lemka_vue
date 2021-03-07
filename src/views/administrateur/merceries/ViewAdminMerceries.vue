<template>
  <div class="merceries">
    <b-row>
      <b-col lg="6">
        <b-form-group label="Filtrer" label-size="sm" label-cols-sm="2"
                      label-align-sm="right" description="Veuillez encoder pour chercher">
          <b-input-group size="sm">
            <b-form-input v-model="filter" type="search" placeholder="Chercher ..."></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Supprimer</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6">
        <b-form-group label="Trier par" label-size="sm" label-cols-sm="2"
                      label-align-sm="right" description="Veuillez faire votre choix de tri"
                      v-slot="{ ariaDescribedby }">
          <b-input-group size="sm">
            <b-form-select v-model="sortBy" :options="sortOptions"
                           :aria-describedby="ariaDescribedby" class="w-75">
              <template #first>
                <option value="">-- vide --</option>
              </template>
            </b-form-select>

            <b-form-select v-model="sortDesc" :disabled="!sortBy"
                           :aria-describedby="ariaDescribedby" size="sm">
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
                      label="Filtrer sur" label-size="sm" label-cols-sm="2"
                      label-align-sm="right" description="Laissez tout décoché pour filtrer sur toutes les données"
                      v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group v-model="filterOn" :aria-describedby="ariaDescribedby">
            <b-form-checkbox value="categorie">Catégorie</b-form-checkbox>
            <b-form-checkbox value="nom">Nom</b-form-checkbox>
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
        <b-button variant="outline-success" size="sm"
                  @click="toggleModal('create-modal'); loadCategories()">
          Créer un nouveau
        </b-button>
      </b-col>

      <b-col lg="7" class="my-1">
        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                      align="fill" size="sm" class="my-0">
        </b-pagination>
      </b-col>
    </b-row>

    <b-table :items="merceries" :fields="fields" :current-page="currentPage"
             :per-page="perPage" :filter="filter" :busy="busy"
             :filter-included-fields="filterOn" :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
             hover show-empty small stacked="md" class="text-center"
             @filtered="onFiltered">
      <template #table-busy>
        <div class="text-center text-secondary mt-3">
          <b-spinner class="align-middle mr-2"></b-spinner>
          <strong class="align-middle">Chargement...</strong>
        </div>
      </template>

      <template #empty>
        <div class="text-center my-2">
          <p>Il n'y a aucun enregistrement à afficher</p>
        </div>
      </template>

      <template #emptyfiltered>
        <div class="text-center my-2">
          <p>Il n'y a aucun enregistrement correspondant à votre demande</p>
        </div>
      </template>

      <template #cell(nom)="data">
        <b-link>
          {{ data.item.nom }}
        </b-link>
      </template>

      <template #cell(est_publie)="data">
        <b-button :variant="data.item.est_publie === true ? 'outline-danger' : 'outline-success'" size="sm">
          {{ data.item.est_publie === true ? 'Désactiver' : 'Publier' }}
        </b-button>
      </template>

      <template #cell(actions)>
        <b-button-group>
          <b-button size="sm" variant="outline-primary">
            <i class="fas fa-edit"></i>
          </b-button>
          <b-button size="sm" variant="outline-danger">
            <i class="fas fa-trash-alt"></i>
          </b-button>
        </b-button-group>
      </template>
    </b-table>

    <b-modal ref="create-modal" title="Ajouter un nouveau élément" hide-footer>
      <b-input-group class="my-1">
        <b-form-checkbox v-model="mercerie.est_publie" name="check-button" switch>
          <p v-if="mercerie.est_publie">Publier</p>
          <p v-else>En attente</p>
        </b-form-checkbox>
      </b-input-group>

      <b-form-group label="Catégorie" description="Veuillez choisir la catégorie">
        <multiselect v-model="mercerie.ref_categorie" :options="categories" :allow-empty="false"
                     label="nom" track-by="nom" placeholder="Veuillez selectionner la catégorie"
                     selectLabel="Appuyez sur enter pour selectionner"
                     deselectLabel="Appuyez sur enter pour retirer">
          <template slot="singleLabel" slot-scope="{ option }">
            <span>{{ option.nom }}</span>
          </template>
          <template slot="option" slot-scope="{ option }">
            <span>{{ option.nom }}</span>
          </template>
          <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
        </multiselect>
      </b-form-group>

      <b-form-group label="Nom" description="Veuillez encoder le nom de la mercerie">
        <b-form-input v-model="mercerie.nom" type="text"></b-form-input>
      </b-form-group>

      <b-button variant="success">Créer</b-button>
    </b-modal>

  </div>
</template>

<script>
import {tableViewMixin} from "@/mixins/table_view.mixin";
import {mapActions, mapGetters} from "vuex";
import MercerieModel from "@/models/mercerie.model";
import {fonctions} from "@/mixins/functions.mixin";

export default {
  name: "ViewAdminInventaire",
  mixins: [tableViewMixin, fonctions],
  data() {
    return {
      mercerie: new MercerieModel(),
      fields: [
        {key: 'id', label: '#'},
        {key: 'categorie', label: 'Catégorie', sortable: true},
        {key: 'nom', label: 'Nom', sortable: true},
        {key: 'est_publie', label: 'Publication', sortable: true},
        {key: 'actions', label: 'Actions'},
      ]
    }
  },
  computed: {
    ...mapGetters({
      merceries: 'Merceries/merceries',
      busy: 'Merceries/loadingStatus',
      categories: 'Categories/categories'
    })
  },
  methods: {
    ...mapActions({loadCategories: 'Categories/loadCategories'})
  },
  created() {
    if (this.merceries.length === 0) {
      this.$store.dispatch('Merceries/loadMerceries')
    }
  }
}
</script>

<style scoped>

</style>