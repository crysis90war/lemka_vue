<template>
  <div>
    <l-spinner v-if="busy"></l-spinner>
    <b-row v-else>
      <b-col lg="7">
        <b-jumbotron>
          <pre style="white-space: pre-wrap">{{ devis }}</pre>
        </b-jumbotron>
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

export default {
  name: "VUDevisDetails",
  components: {Messenger},
  data() {
    return {
      devis: new DevisModel(),
    }
  },
  computed: {
    ...mapGetters({deviss: "Devis/deviss", busy: "Devis/devissLoadingStatus"})
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

