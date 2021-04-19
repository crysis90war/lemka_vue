<template>
  <section v-if="$route.name === routes.DEVIS_USER.name" class="user_devis">
    <b-card
        title="Devis"
        class="my-4"
        :class="BSClass.CARD_BORDERLESS_SHADOW"
    >
      <b-card-body>
        <l-create-refresh :load-or-refresh="loadOrRefresh"/>
        <b-table
            :items="userDevis"
            :fields="fields"
            :busy="busy"
            stacked="lg"
            fixed
            class="text-center"
            show-empty
            small
        >
          <template #empty><l-table-empty/></template>
          <template #table-busy><l-table-busy/></template>
          <template #cell(actions)="data">
            <b-button-group size="sm">
              <b-button
                  variant="outline-info"
                  :to="{name: 'VUDevisDetail', params: {numero_devis: data.item.numero_devis}}"
              >
                <i :class="icons.INFO"></i>
              </b-button>
            </b-button-group>
          </template>
        </b-table>
      </b-card-body>
    </b-card>
  </section>

  <router-view v-else></router-view>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import DevisModel from "@/models/devis.model";
import LemkaHelpers from "@/helpers";

export default {
  name: "VUDevis",
  data() {
    return {
      fields: DevisModel.userTableFields,
      icons: LemkaHelpers.FontAwesomeIcons,
      routes: LemkaHelpers.Routes,
      BSClass: LemkaHelpers.BSClass
    }
  },
  computed: {
    ...mapGetters({userDevis: "Devis/deviss", busy: "Devis/loadingStatus"}),
  },
  methods: {
    ...mapActions({loadUserDevis: "Devis/loadUserDevis"}),
    loadOrRefresh: async function() {
      await this.loadUserDevis()
    }
  },
  created() {
    this.loadOrRefresh()
  }
}
</script>

<style scoped>

</style>