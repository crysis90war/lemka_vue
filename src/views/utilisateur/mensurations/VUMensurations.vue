<template>
  <section class="mensurations">
    <b-card
        :title="$route.meta.value"
        class="my-4"
        :class="BSClass.CARD_BORDERLESS_SHADOW"
    >
      <b-card-body>
        <l-create-refresh
            create_message="Ajouter Mensuration"
            :route="routes.USER_MENSURATION_ADD_OR_UPDATE.name"
            :load-or-refresh="loadOrRefresh"
        />
        <b-table
            :items="userMensurations"
            :fields="fields"
            :busy="busy"
            show-empty
            hover
            fixed
            stacked="md"
            class="text-center mt-3"
            small
        >
          <template #table-busy>
            <TableBusy/>
          </template>

          <template #empty>
            <TableEmpty/>
          </template>

          <template #cell(is_main)="data">
            <b-badge
                pill
                :variant="data.item.is_main === true ? 'success': 'primary'"
            >
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
  </section>
</template>

<script>
import UserMensurationModel from "@/models/user/user_mensuration.model";
import LemkaHelpers from "@/helpers";
import TableEmpty from "@/components/Table/LTableEmpty";
import TableBusy from "@/components/Table/LTableBusy";
import {mapActions, mapGetters} from "vuex";
import {htmlTitle} from "@/utils/tools"

export default {
  name: "VUMensurations",
  components: {TableEmpty, TableBusy},
  title() {
    return htmlTitle('Mensurations')
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
    ...mapGetters({userMensurations: "UserMensurations/userMensurations", busy: "UserMensurations/loadingStatus"})
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