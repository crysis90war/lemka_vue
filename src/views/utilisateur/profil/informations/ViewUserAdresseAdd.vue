<template>
  <b-card title="Ajouter une adresse" :class="bootstrap.shadow" class="my-2">
    <b-card-body>
      <b-form @submit.prevent="submit">
<!--        <b-form-group id="input-groupe-pays"-->
<!--                      label="Pays"-->
<!--                      description="Veuillez selectionner votre pays"-->
<!--                      label-for="select-pays">-->
<!--          <b-form-select id="select-pays"-->
<!--                         name="select-pays"-->
<!--                         v-model="pays"-->
<!--                         :options="paysOptions">-->
<!--            <template #first>-->
<!--              <b-form-select-option :value="null" disabled>&#45;&#45; Veuillez selectionner votre pays &#45;&#45;</b-form-select-option>-->
<!--            </template>-->
<!--          </b-form-select>-->
<!--        </b-form-group>-->

        <b-form-group label="Ville"
                      description="Selectionn selectionner votre ville">
          <multiselect v-model="adresse.ref_ville"
                       label="ville"
                       track-by="ville"
                       placeholder="Veuillez encoder pour lancer la recherche..."
                       open-direction="bottom"
                       :options="villeOptions"
                       :multiple="false"
                       :searchable="true"
                       :loading="isLoading"
                       :internal-search="false"
                       :clear-on-select="false"
                       :close-on-select="true"
                       :options-limit="20"
                       :max-height="600"
                       :show-no-results="false"
                       :hide-selected="true"
                       @search-change="updateSelect">
            <template slot="singleLabel" slot-scope="{ option }">
              <span>{{ option.code_postale }} - {{ option.ville }}</span>
            </template>
            <template slot="option" slot-scope="{ option }">
              <span>{{ option.code_postale }} - {{ option.ville }}</span>
            </template>
            <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
          </multiselect>
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

        <b-button-group>
          <b-button variant="outline-success" type="submit" :disabled="submitStatus === 'PENDING'">Sauvegarder
          </b-button>
          <b-button variant="outline-danger" :to="{name: link}">Retour</b-button>
        </b-button-group>
      </b-form>
    </b-card-body>
  </b-card>
</template>

<script>
import {LemkaEnums} from "@/helpers/enums.helper";
import AdresseModel from "@/models/adresse.model";
import {validationMixin} from "vuelidate";
import VilleModel from "@/models/ville.model";

export default {
  name: "ViewUserAdresseAdd",
  mixins: validationMixin,
  validations: {
    adresse: AdresseModel.validations
  },
  data() {
    return {
      adresse: new AdresseModel(),

      pays: null,
      paysOptions: [],

      villeOptions: [],

      isLoading: false,

      submitStatus: null,

      bootstrap: {
        shadow: LemkaEnums.BSClass.CARD_BORDERLESS_SHADOW
      },
      link: LemkaEnums.Routes.INFORMATIONS.name,
    }
  },
  methods: {
    async chargerVilles() {
      this.villeOptions = await VilleModel.fetchVilles()
    },

    async updateSelect(query) {
      this.isLoading = true
      this.villeOptions = await VilleModel.fetchVilles(query)
      this.isLoading = false
    },

    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        await AdresseModel.createAdresse(this.adresse.toCreatePayload())

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: this.link})
        }, 500)
      }
    },

    validateState(name) {
      const {$dirty, $error} = this.$v.adresse[name];
      return $dirty ? !$error : null;
    },
  },
  created() {
    this.chargerVilles()
  }
}
</script>

<style scoped>

</style>