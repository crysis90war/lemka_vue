<template>
  <div v-if="$route.name === routes.DEVIS_USER.name">
    <b-table :items="userDevis" :fields="fields" stacked="lg" fixed class="text-center">
      <template #cell(actions)="data">
        <b-button-group size="sm">
          <b-button variant="outline-info" :to="{name: 'VUDevisDetail', params: {numero_devis: data.item.numero_devis}}">
            <i :class="icons.INFO"></i>
          </b-button>
        </b-button-group>
      </template>
    </b-table>
  </div>
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
      routes: LemkaHelpers.Routes
    }
  },
  computed: {
    ...mapGetters({userDevis: "Devis/deviss"}),
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