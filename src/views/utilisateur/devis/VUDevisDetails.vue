<template>
  <div class="devis_detail" :class="BSClass.CARD_BORDERLESS_SHADOW">
    <l-spinner v-if="busy"></l-spinner>
    <b-row v-else>
      <b-col lg="7">
        <b-button-group size="sm" class="w-100">
          <b-button variant="outline-success" v-b-tooltip.hover title="Accepter">
            <i class="fas fa-check"></i>
          </b-button>
          <b-button variant="outline-danger" v-b-tooltip.hover title="Refuser">
            <i class="fas fa-times"></i>
          </b-button>
          <b-button variant="outline-secondary" v-b-tooltip.hover title="Télécharger le PDF">
            <i class="fas fa-file-pdf"></i>
          </b-button>
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
import {htmlTitle} from "@/utils/tools";

export default {
  name: "VUDevisDetails",
  components: {Messenger},
  title() {
    return htmlTitle('Devis N° ' + this.$route.params.numero_devis)
  },
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
    chargerDevis: async function(numero_devis) {
      let devis = await this.$store.getters["Devis/devisNumberDevis"](parseInt(numero_devis))
      if (devis !== undefined) {
        Object.assign(this.devis, await this.$store.getters["Devis/devisNumberDevis"](parseInt(numero_devis)))
        this.$route.meta.value = this.devis.numero_devis
      } else {
        await this.$router.push({name: "VUDevis"})
      }
    },
    initialisation: async function () {
      if (this.deviss.length === 0) {
        await this.loadOrRefresh()
      }
      await this.chargerDevis(this.$route.params.numero_devis)
    }
  },
  created() {
    this.initialisation()
  }
}
</script>

