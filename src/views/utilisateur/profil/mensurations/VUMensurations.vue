<template>
  <div>
    <b-card :title="$route.meta.value" class="my-4" :class="BSClass.CARD_BORDERLESS_SHADOW">
      <b-card-body>

        <b-button-group>
          <b-button v-if="userMensurations.length < 5" :to="{name: routes.USER_MENSURATION_ADD_OR_UPDATE.name}"
                    variant="outline-success" size="sm">
            Ajouter mensuration
          </b-button>
          <b-button variant="outline-primary" size="sm" @click="loadOrRefresh">
            <i class="fas fa-sync-alt"></i>
          </b-button>
        </b-button-group>

        <b-table :items="userMensurations" :fields="fields" :busy="busy"
                 show-empty hover fixed stacked="md" class="text-center mt-3" small>
          <template #table-busy>
            <TableBusy/>
          </template>

          <template #empty>
            <TableEmpty/>
          </template>

          <template #cell(is_main)="data">
            <b-badge pill :variant="data.item.is_main === true ? 'success': 'primary'">
              {{ data.item.is_main === true ? 'Principale' : 'Secondaire' }}
            </b-badge>
          </template>

          <template #cell(titre)="data">
            <b-link :to="{name: routes.USER_MESURES.name, params: {id: data.item.id}}">
              {{ data.item.titre }}
            </b-link>
          </template>

          <template #cell(actions)="data">
            <b-button-group>
              <b-button :to="{name: routes.USER_MENSURATION_ADD_OR_UPDATE.name, params: {id: data.item.id}}"
                        variant="outline-primary" size="sm">
                Modifier
              </b-button>
              <b-button variant="outline-danger" size="sm" @click.prevent="deleteUserMensuration(data.item)">
                Supprimer
              </b-button>
            </b-button-group>
          </template>
        </b-table>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import UserMensurationModel from "@/models/user_mensuration/user_mensuration.model";
import LemkaHelpers from "@/helpers";
import TableEmpty from "@/components/Table/LTableEmpty";
import TableBusy from "@/components/Table/LTableBusy";
import {mapActions, mapGetters} from "vuex";
import Tools from "@/utils/tools"

export default {
  name: "VUMensurations",
  components: {TableEmpty, TableBusy},
  title() {
    return Tools.htmlTitle('Mensurations')
  },
  data() {
    return {
      fields: UserMensurationModel.tableFields,
      routes: LemkaHelpers.Routes,
      icons: LemkaHelpers.FontAwesomeIcons,
      BSClass: LemkaHelpers.BSClass,
    }
  },
  computed: {
    ...mapGetters({userMensurations: "UserMensurations/userMensurations", busy: "UserMensurations/userMensurationsLoadingStatus"})
  },
  methods: {
    ...mapActions({
      deleteUserMensuration: "UserMensurations/deleteUserMensuration",
      loadMensuration: "UserMensurations/loadUserMensurations"
    }),
    loadOrRefresh: function () {
      this.loadMensuration()
    }
  },
  created() {
    if (this.userMensurations.length === 0) {
      this.loadOrRefresh()
    }
  }
}
</script>

<style scoped>

</style>