<template>
  <div class="couleurs">
    <div v-if="$route.name === routes.PARAMETRES_COULEUR.name">
      <l-table-view
          :table-busy="busy"
          :table-datas="couleurs"
          :table-fields="fields"
          :load-data="loadCouleurs"
          :create-route-to-name="routes.PARAMETRES_COULEUR_ADD_OR_UPDATE.name"
      >
        <template #cell(actions)="data">
          <l-table-button-update-delete
              :update-route-to-name="routes.PARAMETRES_COULEUR_ADD_OR_UPDATE.name"
              :item-id="data.item.id"
              @clickShowModal="showModal('delete-modal-' + data.item.id)"
          />
          <l-table-delete-modal
              :modal-id="data.item.id"
              :modal-title="data.item.nom"
              :modal-text="data.item.nom"
              @clickHideModal="hideModal('delete-modal-'+data.item.id)"
              @clickDelete="supprimerCouleur(data.item)"
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
import CouleurModel from "@/models/couleur.model";

export default {
  name: "VACouleurs",
  components: {LTableDeleteModal, LTableButtonUpdateDelete, LTableView},
  mixins: [commonMixin],
  data() {
    return {
      fields: CouleurModel.tableFields,
      routes: LemkaHelpers.Routes
    }
  },
  computed: {
    ...mapGetters({couleurs: 'Couleurs/couleurs', busy: 'Couleurs/loadingStatus'})
  },
  methods: {
    ...mapActions({loadCouleurs: "Couleurs/loadCouleurs", deleteCouleur: "Couleurs/deleteCouleur"}),
    initialisation: async function() {
      if (this.couleurs.length === 0) {
        await this.loadCouleurs()
      }
    },
    supprimerCouleur: function(item) {
      this.deleteCouleur(item)
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