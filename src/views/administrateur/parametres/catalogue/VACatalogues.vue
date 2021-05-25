<template>
  <div class="catalogues">
    <div v-if="$route.name === routes.PARAMETRES_CATALOGUE.name">
      <b-alert variant="warning" show>
        Attention ! En supprimant un catalogue, vous allez supprimer tous les articles qui lui sont associés ...
      </b-alert>
      <l-table-view
          :table-busy="busy"
          :table-datas="catalogues"
          :table-fields="fields"
          :load-data="loadCatalogues"
          :create-route-to-name="routes.PARAMETRES_CATALOGUE_ADD_OR_UPDATE.name"
      >
        <template #cell(rayon)="data">
          <p>{{ data.item.rayon.nom }}</p>
        </template>
        <template #cell(section)="data">
          <p>{{ data.item.section.nom }}</p>
        </template>
        <template #cell(type_produit)="data">
          <p>{{ data.item.type_produit.nom }}</p>
        </template>
        <template #cell(actions)="data">
          <l-table-button-update-delete
              :update-route-to-name="routes.PARAMETRES_CATALOGUE_ADD_OR_UPDATE.name"
              :item-id="data.item.id"
              @clickShowModal="showModal('delete-modal-' + data.item.id)"
          />

          <l-table-delete-modal
              :modal-id="data.item.id"
              :modal-title="getFullCatalogueName(data.item)"
              :modal-text="getFullCatalogueName(data.item)"
              @clickHideModal="hideModal('delete-modal-'+data.item.id)"
              @clickDelete="supprimerCatalogue(data.item)"
          />
        </template>
      </l-table-view>
    </div>

    <router-view v-else></router-view>
  </div>
</template>

<script>
import LTableDeleteModal from "@/components/Table/LTableDeleteModal";
import LTableButtonUpdateDelete from "@/components/Table/LTableButtonUpdateDelete";
import LTableView from "@/components/Table/LTableView";
import {commonMixin} from "@/mixins/common.mixin";
import {htmlTitle} from "@/utils/tools";
import LemkaHelpers from "@/helpers";
import CatalogueModel from "@/models/catalogue/catalogue.model";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "VACatalogues",
  components: {LTableDeleteModal, LTableButtonUpdateDelete, LTableView},
  mixins: [commonMixin],
  title() {
    return htmlTitle('Catégories')
  },
  data() {
    return {
      routes: LemkaHelpers.Routes,
      BSClass: LemkaHelpers.BSClass,
      fields: CatalogueModel.tableFields
    }
  },
  computed: {
    ...mapGetters({catalogues: 'Catalogues/catalogues', busy: 'Catalogues/loadingStatus'})
  },
  methods: {
    ...mapActions({loadCatalogues: "Catalogues/loadCatalogues", deleteCatalogue: 'Catalogues/deleteCatalogue'}),
    initialisation: async function () {
      if (this.catalogues.length === 0) {
        await this.loadCatalogues()
      }
    },
    supprimerCatalogue: function (item) {
      this.deleteCatalogue(item)
      this.hideModal('delete-modal-' + item.id)
    },
    getFullCatalogueName: function (item) {
      let rayon = item.rayon.nom;
      let section = item.section.nom;
      let type_produit = item.type_produit.nom
      return `${rayon} / ${section} / ${type_produit}`
    }
  },
  created() {
    this.initialisation()
  }
}
</script>

<style scoped>

</style>