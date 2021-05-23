<template>
  <div class="characteristiques">
    <div v-if="$route.name === routes.PARAMETRES_CHARACTERISTIQUE.name">
      <l-table-view
          :table-busy="busy"
          :table-datas="characteristiques"
          :table-fields="fields"
          :load-data="loadCaracteristiques"
          :update-route-to-name="routes.PARAMETRES_CHARACTERISTIQUE_ADD_OR_UPDATE.name"
      >
        <template #cell(actions)="data">
          <l-table-button-update-delete
              :update-route-to-name="routes.PARAMETRES_CHARACTERISTIQUE_ADD_OR_UPDATE.name"
              :item-id="data.item.id"
              @clickShowModal="showModal('delete-modal-' + data.item.id)"
          />
          <l-table-delete-modal
              :modal-id="data.item.id"
              :modal-title="data.item.nom"
              :modal-text="data.item.nom"
              @clickHideModal="hideModal('delete-modal-' + data.item.id)"
              @clickDelete="supprimerCaracteristique(data.item)"
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
import CharacteristicModel from "@/models/characteristic.model";
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "VACharacteristiques",
  components: {LTableDeleteModal, LTableButtonUpdateDelete, LTableView},
  mixins: [commonMixin],
  data() {
    return {
      fields: CharacteristicModel.tableFields,
      routes: LemkaHelpers.Routes
    }
  },
  computed: {
    ...mapGetters({characteristiques: 'Characteristiques/characteristiques', busy: 'Characteristiques/loadingStatus'})
  },
  methods: {
    ...mapActions({
      loadCaracteristiques: "Characteristiques/loadCaracteristiques",
      deleteCaracteristique: "Characteristiques/deleteCaracteristique"
    }),
    initialisation: async function () {
      if (this.characteristiques.length === 0) {
        await this.loadCaracteristiques()
      }
    },
    supprimerCaracteristique: function (item) {
      this.deleteCaracteristique(item)
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