<template>
  <div v-if="$route.name === routes.DEMANDE_DE_DEVIS.name" class="demande_devis">
    <div :class="BSClass.CARD_BORDERLESS_SHADOW" class="my-4">
      <b-tabs pills card>
        <b-tab title="En rédaction">
          <b-card-text>
            <l-create-refresh :load-or-refresh="loadDemandeDevis" :route="routes.DEMANDE_DE_DEVIS_ADD_OR_UPDATE.name"/>
            <pre>{{ demandes_devis }}</pre>
          </b-card-text>
        </b-tab>
        <b-tab title="Soumis">
          <b-card-text>
            <pre>{{demande_devis_en_cours}}</pre>
          </b-card-text>
        </b-tab>
        <b-tab title="Traités">
          <b-card-text>
            Tab contents 1
          </b-card-text>
        </b-tab>
      </b-tabs>
    </div>
  </div>

  <router-view v-else/>
</template>

<script>

import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "VUDemandeDevis",
  props: {},
  data() {
    return {
      BSClass: LemkaHelpers.BSClass,
      routes: LemkaHelpers.Routes
    }
  },
  computed: {
    ...mapGetters({
      demandes_devis: "DemandesDevis/demandesDevis",
      busy: "DemandesDevis/demandesDevisLoadingStatus",
      demande_devis_en_cours: "DemandesDevis/demandesDevisEnCours"
    })
  },
  methods: {
    ...mapActions({loadDemandeDevis: "DemandesDevis/loadDemandeDevis"}),
    name() {

    }
  },
  created() {
    if (this.demandes_devis.length === 0) {
      this.loadDemandeDevis()
    }
  }
}
</script>

<style scoped>

</style>