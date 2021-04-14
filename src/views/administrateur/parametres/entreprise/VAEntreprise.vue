<template>
  <div v-if="$route.name === routes.PARAMETRES_ENTREPRISE.name">
    <div v-if="loadingStatus" class="text-center">
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
          <b-row>
            <b-col>
              <h3>{{ entreprise.nom_societe }}</h3>
              <h5>{{ entreprise.numero_tva }}</h5>
            </b-col>
          </b-row>
          <hr>
          <b-row>
            <b-col lg="4">
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
            </b-col>
            <b-col>
              <b-row>
                <b-col cols="1">
                  <div>
                    <span><i :class="icons.HOME" class="mr-2"></i></span>
                  </div>
                </b-col>
                <b-col cols="11">
                  <div v-if="entreprise.ville !== null">
                    <span>{{ entreprise.rue }}, {{ entreprise.numero }}</span><br>
                    <span>{{ entreprise.ville.code_postale }} - {{ entreprise.ville.ville }}</span><br>
                    <span>{{ entreprise.ville.pays.pays }}</span>
                  </div>
                  <div v-else>
                    <span>Aucune adresse entregistré</span>
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <hr>
        </div>
      </div>
    </div>
  </div>
  <router-view v-else></router-view>
</template>

<script>
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "VAEntreprise",
  data() {
    return {
      BSClass: LemkaHelpers.BSClass,
      routes: LemkaHelpers.Routes,
      icons: LemkaHelpers.FontAwesomeIcons,
    }
  },
  computed: {
    ...mapGetters({
      entreprises: "Entreprises/entreprises",
      entreprise: "Entreprises/entreprise",
      loadingStatus: "Entreprises/loadingStatus"
    })
  },
  methods: {
    ...mapActions({loadEntreprises: "Entreprises/loadEntreprises"})
  },
  created() {
    if (this.entreprises.length === 0) {
      this.loadEntreprises()
    }
  }
}
</script>