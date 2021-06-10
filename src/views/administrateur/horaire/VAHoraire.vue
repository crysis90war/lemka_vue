<template>
  <div class="horaire">
    <l-spinner v-if="isLoading"/>
    <div v-else>
      <b-card>
        <b-tabs pills card vertical>
          <b-tab :title="horaire.jour" v-for="(horaire, index) in openings" :key="index" :active="index === 0">
            <b-card-text>
              <div class="d-flex justify-content-around">
                <b-form-checkbox v-model="horaire.sur_rdv" :disabled="horaire.est_ferme === true"><p>Sur rendez-vous</p></b-form-checkbox>
                <b-form-checkbox v-model="horaire.est_ferme"><p>Fermé</p></b-form-checkbox>
              </div>
              <hr>
              <b-row>
                <b-col lg="6">
                  <b-form-group label="Ouverture">
                    <b-timepicker v-model="horaire.heure_ouverture" :disabled="horaire.est_ferme === true"/>
                  </b-form-group>
                  <b-form-group label="Fermeture">
                    <b-timepicker v-model="horaire.heure_fermeture" :disabled="horaire.est_ferme === true"/>
                  </b-form-group>
                </b-col>
                <b-col lg="6">
                  <b-form-group label="Pause début">
                    <b-timepicker v-model="horaire.pause_debut" :disabled="disableIfClosed(horaire)"/>
                  </b-form-group>
                  <b-form-group label="Pause fin">
                    <b-timepicker v-model="horaire.pause_fin" :disabled="disableIfClosed(horaire)"/>
                  </b-form-group>
                </b-col>
              </b-row>
              <hr>
              <div class="">
                <b-button variant="outline-primary" @click="modifierHoraire(horaire)">Modifier</b-button>
                <b-alert :variant="variant" :show="message !== ''" dismissible>{{ message }}</b-alert>
              </div>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import {commonMixin} from "@/mixins/common.mixin";
import {mapActions, mapGetters} from "vuex";
import HoraireModel from "@/models/entreprise/horaire.model";

export default {
  name: "VAHoraire",
  mixins: [commonMixin],
  data() {
    return {
      openings: []
    }
  },
  computed: {
    ...mapGetters({horaires: "Horaires/horaires"})
  },
  methods: {
    ...mapActions({loadHoraires: "Horaires/loadHoraires", updateHoraire: "Horaires/updateHoraire"}),
    initialisation: async function() {
      if (this.horaires.length === 0) {
        await this.loadHoraires()
      }
    },
    getHoraires: async function() {
      this.toggleLoading()

      await this.initialisation()

      if (this.horaires.length !== 0) {
        this.horaires.forEach(item => {
          let horaire = new HoraireModel()
          Object.assign(horaire, item)
          this.openings.push(horaire)
        })
      }

      this.toggleLoading()
    },
    disableIfClosed: function (item) {
      return item.est_ferme === true || item.heure_ouverture === null || item.heure_fermeture === null
    },
    modifierHoraire: function(item) {
      let horaire = new HoraireModel()
      Object.assign(horaire, item)
      if (horaire.est_ferme === true) {
        horaire.heure_ouverture = null;
        horaire.heure_fermeture = null;
        horaire.pause_debut = null;
        horaire.pause_fin = null;
        horaire.sur_rdv = false;
      }
      this.updateHoraire(horaire.toUpdatePayload()).then(() => {
        this.customMessage('Horaire modifié avec succès', 'success', 10000)
      },() => {
        this.customMessage("Une erreur s'est produit lors de la requête", 'danger', 10000)
      })
    }
  },
  created() {
    this.getHoraires()
  }
}
</script>

<style scoped>

</style>