<template>
  <div class="categories">
    <div v-if="$route.name === routes.PARAMETRES_CATEGORIE.name">

      <l-table-view
          :table-busy="busy"
          :table-datas="categories"
          :table-fields="fields"
          :load-data="loadCategories"
          :create-route-to-name="routes.PARAMETRES_CATEGORIE_ADD_OR_UPDATE.name"
      >
        <template #cell(actions)="data">
          <l-table-button-update-delete
              :update-route-to-name="routes.PARAMETRES_CATEGORIE_ADD_OR_UPDATE.name"
              :item-id="data.item.id"
              @clickShowModal="showModal('delete-modal-' + data.item.id)"
          />

          <l-table-delete-modal
              :modal-id="data.item.id"
              :modal-title="data.item.nom"
              :modal-text="data.item.nom"
              @clickHideModal="hideModal('delete-modal-'+data.item.id)"
              @clickDelete="supprimerCategorie(data.item)"
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
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";
import CategorieModel from "@/models/categorie.model";
import {htmlTitle} from "@/utils/tools";

export default {
  name: "VACategories",
  components: {LTableDeleteModal, LTableButtonUpdateDelete, LTableView},
  mixins: [commonMixin],
  title() {
    return htmlTitle('Catégories')
  },
  data() {
    return {
      fields: CategorieModel.tableFields,
      routes: LemkaHelpers.Routes,
      BSClass: LemkaHelpers.BSClass
    }
  },
  computed: {
    ...mapGetters({categories: 'Categories/categories', busy: 'Categories/loadingStatus'})
  },
  methods: {
    ...mapActions({loadCategories: "Categories/loadCategories", deleteCategorie: 'Categories/deleteCategorie'}),
    initialisation: async function() {
      if (this.categories.length === 0) {
        await this.loadCategories()
      }
    },
    supprimerCategorie: function(item) {
      this.deleteCategorie(item)
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