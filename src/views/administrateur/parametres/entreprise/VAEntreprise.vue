<template>
  <div v-if="$route.name === routes.PARAMETRES_ENTREPRISE.name">
    <div v-if="entrepriseLoadingStatus" class="text-center">
      <b-spinner type="grow" label="Loading..."></b-spinner>
    </div>

    <div v-else>
      <div v-if="entreprises.length === 0">
        <b-button :to="{name: routes.PARAMETRES_ENTREPRISE_ADD.name}" variant="outline-success">
          Ajouter informations
        </b-button>
        <div class="mt-5">
          <p>Aucune information pour le moment, veuillez en ajouter</p>
        </div>
      </div>

      <div v-if="entreprises.length === 1">
        <b-button variant="outline-primary" :to="{name: routes.PARAMETRES_ENTREPRISE_UPDATE.name}" class="mb-3">
          Modifier
        </b-button>

        <div>
          <h3>{{ entreprise.nom_societe }}</h3>
          <h5>{{ entreprise.numero_tva }}</h5>
          <hr>
          <div>
            <span class="mr-2"><i :class="icons.EMAIL"></i></span>
            <span>{{ entreprise.mail_contact }}</span>
          </div>
          <div>
            <span class="mr-2"><i :class="icons.PHONE"></i></span>
            <span>{{ entreprise.numero_tel }}</span>
          </div>
          <div>
            <span class="mr-2"><i :class="icons.GLOBE"></i></span>
            <span>{{ entreprise.site_web }}</span>
          </div>
          <hr>
          <div>
            <span><i :class="icons.HOME" class="mr-2"></i></span>
          </div>

          <div v-if="entreprise.ref_ville !== null">
            <span>{{ entreprise.rue }}, {{ entreprise.numero }}</span><br>
            <span>{{ entreprise.ref_ville.code_postale }} - {{ entreprise.ref_ville.ville }}</span><br>
            <span>{{ entreprise.ref_ville.ref_pays.pays }}</span>
          </div>
        </div>
      </div>

      <b-jumbotron>
        <pre>{{ entreprises }}</pre>
        <pre>{{ entreprise }}</pre>
      </b-jumbotron>
    </div>
  </div>
  <router-view v-else></router-view>
</template>

<script>
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";
import EntrepriseModel from "@/models/entreprise.model";

export default {
  name: "VAEntreprise",
  data() {
    return {
      entreprise: new EntrepriseModel(),
      BSClass: LemkaHelpers.BSClass,
      routes: LemkaHelpers.Routes,
      icons: LemkaHelpers.FontAwesomeIcons,
    }
  },
  computed: {
    ...mapGetters({
      entreprises: "Entreprises/entreprises",
      entrepriseLoadingStatus: "Entreprises/entrepriseLoadingStatus"
    })
  },
  methods: {
    ...mapActions({
      loadEntreprises: "Entreprises/loadEntreprises",
      loadCity: "Villes/loadCity",
      loadPays: "Pays/loadPays"
    }),
    initialisation: async function () {
      await this.loadEntreprises()
      if (this.entreprises.length > 0) {
        Object.assign(this.entreprise, await this.$store.getters["Entreprises/entreprise"])
        await this.loadCity(this.entreprise.ref_ville)
        this.entreprise.ref_ville = this.$store.getters["Villes/city"]
        await this.loadPays(this.entreprise.ref_ville.ref_pays)
        this.entreprise.ref_ville.ref_pays = this.$store.getters["Pays/pays"]
      }
    }
  },
  created() {
    this.initialisation()
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>