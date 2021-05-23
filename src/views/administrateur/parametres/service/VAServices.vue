<template>
  <div class="services">
    <div v-if="$route.name === routes.PARAMETRES_SERVICE.name">
      <l-table-view
          :table-busy="busy"
          :table-datas="typeServices"
          :table-fields="fields"
          :load-data="loadTypeServices"
          :update-route-to-name="routes.PARAMETRES_SERVICE_ADD_OR_UPDATE.name"
      >
        <template #cell(actions)="data">
          <l-table-button-update-delete
              :update-route-to-name="routes.PARAMETRES_SERVICE_ADD_OR_UPDATE.name"
              :item-id="data.item.id"
              @clickShowModal="showModal('delete-modal-' + data.item.id)"
          />

          <l-table-delete-modal
              :modal-id="data.item.id"
              :modal-title="data.item.type_service"
              :modal-text="data.item.type_service"
              @clickHideModal="hideModal('delete-modal-'+data.item.id)"
              @clickDelete="supprimerService(data.item)"
          />
        </template>
      </l-table-view>
    </div>

    <router-view v-else></router-view>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import LemkaHelpers from "@/helpers";
import TypeServiceModel from "@/models/type_service.model";
import LTableDeleteModal from "@/components/Table/LTableDeleteModal";
import LTableButtonUpdateDelete from "@/components/Table/LTableButtonUpdateDelete";
import LTableView from "@/components/Table/LTableView";
import {commonMixin} from "@/mixins/common.mixin";

export default {
  name: "VAServices",
  components: {LTableDeleteModal, LTableButtonUpdateDelete, LTableView},
  mixins: [commonMixin],
  data() {
    return {
      fields: TypeServiceModel.tableFields,
      routes: LemkaHelpers.Routes
    }
  },
  computed: {
    ...mapGetters({typeServices: 'TypeServices/typeServices', busy: 'TypeServices/loadingStatus'})
  },
  methods: {
    ...mapActions({deleteTypeService: 'TypeServices/deleteTypeService', loadTypeServices: "TypeServices/loadTypeServices"}),
    initialisation: async function () {
      if (this.typeServices.length === 0) {
        await this.loadTypeServices()
      }
    },
    supprimerService: function(item) {
      this.deleteTypeService(item)
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