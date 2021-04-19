<template>
  <div class="devis_detail" :class="BSClass.CARD_BORDERLESS_SHADOW">
    <l-spinner v-if="busy"></l-spinner>
    <b-row v-else>
      <b-col lg="7">
        <b-button-group class="w-100">
          <b-button variant="outline-success"><i class="fas fa-check"></i></b-button>
          <b-button variant="outline-danger"><i class="fas fa-times"></i></b-button>
        </b-button-group>
        <l-jumbotron :data="devis"/>
      </b-col>

      <b-col lg="5">
        <Messenger/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import DevisModel from "@/models/devis.model";
import Messenger from "@/views/utilisateur/devis/Messenger";
import {mapActions, mapGetters} from "vuex";
import LemkaHelpers from "@/helpers";

export default {
  name: "VUDevisDetails",
  components: {Messenger},
  data() {
    return {
      devis: new DevisModel(),
      BSClass: LemkaHelpers.BSClass
    }
  },
  computed: {
    ...mapGetters({deviss: "Devis/deviss", busy: "Devis/loadingStatus"})
  },
  methods: {
    ...mapActions({loadDevis: "Devis/loadUserDevis"}),
    loadOrRefresh: async function () {
      await this.loadDevis()
    },
    initialisation: async function (numero_devis) {
      await this.loadOrRefresh()
      let devis = await this.$store.getters["Devis/devisNumberDevis"](parseInt(numero_devis))
      Object.assign(this.devis, devis)
      if (this.devis.id === null) {
        await this.$router.push({name: "VUDevis"})
      }
    }
  },
  created() {
    this.initialisation(this.$route.params.numero_devis)
  }
}
</script>

