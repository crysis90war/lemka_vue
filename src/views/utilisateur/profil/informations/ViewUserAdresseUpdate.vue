<template>
  <b-card title="Modifier l'adresse" :class="bootstrap.shadow" class="my-2">
    <b-card-body>

      <b-form @submit="onSubmit">
        <b-form-group id="input-groupe-pays"
                      label="Pays"
                      description="Veuillez selectionner votre pays"
                      label-for="select-pays">
          <b-form-select id="select-pays"
                         name="select-pays"
                         v-model="pays"
                         :options="paysOptions">
            <template #first>
              <b-form-select-option :value="null" disabled>-- Veuillez selectionner votre pays --</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>

        <b-form-group label="Ville" description="Selectionner votre ville">
          <v-pack-select v-model="ville"
                         :options="villeOptions"
                         :select-on-tab="true"
                         placeholder="Veuillez selectionner votre ville">
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                Aucune ville correspond <em>{{ search }}</em>.
              </template>
              <em v-else>Veuillez selectionner votre ville</em>
            </template>
          </v-pack-select>
        </b-form-group>

        <b-form-group id="input-groupe-rue"
                      label="Rue"
                      description="Veuillez encoder votre rue"
                      label-for="input-rue">
          <b-form-input v-model="$v.adresse.rue.$model"
                        name="input-rue"
                        :state="validateState('rue')"
                        placeholder="Rue :"></b-form-input>
          <b-form-invalid-feedback>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-row>
          <b-col lg="6">
            <b-form-group id="input-groupe-numero"
                          label="Numero"
                          description="Veuillez encoder votre numero"
                          label-for="input-numero">
              <b-form-input v-model="$v.adresse.numero.$model"
                            name="input-numero"
                            :state="validateState('numero')"
                            placeholder="Numéro :"></b-form-input>
              <b-form-invalid-feedback>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group id="input-groupe-boite"
                          label="Boite"
                          description="Veuillez encoder votre boite"
                          label-for="input-boite">
              <b-form-input v-model="$v.adresse.boite.$model"
                            name="input-boite"
                            :state="validateState('boite')"
                            placeholder="Boite :"></b-form-input>
              <b-form-invalid-feedback>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-button-group class="float-right">
          <b-button variant="outline-primary" type="submit" :disabled="submitStatus === 'PENDING'">Sauvegarder
          </b-button>
          <b-button variant="outline-danger" :to="{name: link}">Retour</b-button>
        </b-button-group>
      </b-form>
    </b-card-body>
  </b-card>
</template>

<script>
import AdresseModel from "@/models/adresse.model";
import {LemkaEnums} from "@/helpers/enums.helper";
import VilleModel from "@/models/ville.model";
import PaysModel from "@/models/pays.model";
import {validationMixin} from "vuelidate";

export default {
  name: "ViewUserAdresseUpdate",

  data() {
    return {
      pays: null,
      paysOptions: [],

      ville: null,
      villeOptions: [],

      adresse: new AdresseModel(),

      submitStatus: null,

      bootstrap: {
        shadow: LemkaEnums.BSClass.CARD_BORDERLESS_SHADOW
      },
      link: LemkaEnums.Routes.INFORMATIONS.name,
    }
  },

  methods: {
    async chargerAdresses() {
      let adresse = {}
      let ville = {}
      let pays = {}
      adresse = await AdresseModel.fetchAdresse()
      if (adresse.ref_ville !== null && adresse.ref_ville) {
        ville = await VilleModel.fetchVille(adresse.ref_ville)
        adresse.ref_ville = ville
      }
      if (ville.ref_pays !== null && ville.ref_pays !== undefined) {
        pays = await PaysModel.fetchPays(ville.ref_pays)
        ville.ref_pays = pays
      }
      Object.assign(this.adresse, adresse)
    },

    async chargerPays() {
      let listPays = await PaysModel.fetchPaysList()
      if (listPays.length > 0) {
        listPays.forEach(item => {
          let pays = new PaysModel()
          Object.assign(pays, item)
          let optionPays = {
            value: pays.id,
            text: `${pays.code} - ${pays.pays}`
          }
          this.paysOptions.push(optionPays)
        })
      }
      this.pays = this.adresse.ref_ville.ref_pays.id
    },

    async chargerVilles() {
      let listVilles = await VilleModel.fetchVilles()
      if (listVilles.length > 0) {
        listVilles.forEach(item => {
          let villeOption = {
            value: item.id,
            label: `${item.code_postale} - ${item.ville}`
          }
          this.villeOptions.push(villeOption)
        })
      }
    },

    onSubmit() {

    },

    validateState(name) {
      const {$dirty, $error} = this.$v.adresse[name];
      return $dirty ? !$error : null;
    },

    async loadData() {
      await this.chargerAdresses()
      await this.chargerPays()
      await this.chargerVilles()
    }
  },

  mixins: validationMixin,

  validations: {
    adresse: AdresseModel.validations
  },

  created() {
    this.loadData()
  }
}
</script>

<style scoped>

</style>