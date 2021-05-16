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
        <b-card>
          <b-tabs>
            <b-tab title="Principale">
              <b-card-body>
                <h3>{{ entreprise.nom_societe }}</h3>
                <h5>
                  <l-link :tva="true" :link="entreprise.numero_tva"/>
                </h5>
                <div>
                  <span class="mr-2"><i :class="icons.EMAIL"></i></span>
                  <span>{{ entreprise.mail_contact }}</span>
                </div>
                <div>
                  <span class="mr-2"><i :class="icons.PHONE"></i></span>
                  <span>{{ entreprise.numero_tel }}</span>
                </div>
              </b-card-body>
            </b-tab>

            <b-tab title="Description">
              <b-card-body>
                <div style="white-space: pre-wrap">
                  <h5>À propos résumé</h5>
                  <p>{{ entreprise.a_propos_resume }}</p>
                  <h5>À propos complet</h5>
                  <p>{{ entreprise.a_propos_complet }}</p>
                </div>
              </b-card-body>
            </b-tab>

            <b-tab title="Adresse">
              <b-card-body>
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
              </b-card-body>
            </b-tab>

            <b-tab title="Liens">
              <b-card-body>
                <l-link :web="true" :link="entreprise.site_web"/>
                <l-link :facebook="true" :link="entreprise.facebook_link"/>
                <l-link :instagram="true" :link="entreprise.instagram_link"/>
                <l-link :twitter="true" :link="entreprise.twitter_link"/>
                <l-link :linkedin="true" :link="entreprise.linkedin_link"/>
              </b-card-body>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
    <l-jumbotron :data="entreprise"/>
  </div>
  <router-view v-else></router-view>
</template>

<script>
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";
import LLink from "@/components/LLink";

export default {
  name: "VAEntreprise",
  components: {LLink},
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