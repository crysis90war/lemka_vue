<template>
  <b-card title="Ajouter une adresse" :class="BSClass.CARD_BORDERLESS_SHADOW" class="my-2">
    <b-card-body>
      <b-form @submit.prevent="submit">
        <b-form-group label="Ville" description="Selectionn selectionner votre ville">
          <multiselect v-model="adresse.ref_ville" :options="villes" :loading="loading" :class="{ 'invalid': isInvalid }"
                       label="ville" placeholder="Veuillez encoder pour lancer la recherche..." track-by="ville"
                       :multiple="false" :searchable="true" :internal-search="false" :clear-on-select="false" :close-on-select="true"
                       :options-limit="20" :max-height="600" :show-no-results="false" :hide-selected="true" :allow-empty="false"
                       @search-change="updateSelect" @close="onTouch">
            <template slot="singleLabel" slot-scope="{ option }">
              <span>{{ option.code_postale }} - {{ option.ville }}</span>
            </template>
            <template slot="option" slot-scope="{ option }">
              <span>{{ option.code_postale }} - {{ option.ville }}</span>
            </template>
            <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
          </multiselect>
          <span class="text-danger" v-show="isInvalid"><small>Ce champ est requis</small></span>
        </b-form-group>

        <b-form-group label="Rue" description="Veuillez encoder votre rue">
          <b-form-input v-model="$v.adresse.rue.$model" placeholder="Rue :" :state="validateState('rue')"/>
          <b-form-invalid-feedback>
            <l-invalid-feedback :condition="!$v.adresse.rue.required" :error-message="required()"/>
            <l-invalid-feedback :condition="!$v.adresse.rue.minLength"
                                :error-message="minLength($v.adresse.rue.$params.minLength.min)"/>
            <l-invalid-feedback :condition="!$v.adresse.rue.maxLength"
                                :error-message="maxLength($v.adresse.rue.$params.maxLength.max)"/>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-row>
          <b-col lg="6">
            <b-form-group label="Numero" description="Veuillez encoder votre numero">
              <b-form-input v-model="$v.adresse.numero.$model" placeholder="Numéro :" :state="validateState('numero')"/>
              <b-form-invalid-feedback>
                <l-invalid-feedback :condition="!$v.adresse.numero.required" :error-message="required()"/>
                <l-invalid-feedback :condition="!$v.adresse.numero.alphaNum" :error-message="alphaNum()"/>
                <l-invalid-feedback :condition="!$v.adresse.numero.minLength"
                                    :error-message="minLength($v.adresse.numero.$params.minLength.min)"/>
                <l-invalid-feedback :condition="!$v.adresse.numero.maxLength"
                                    :error-message="maxLength($v.adresse.numero.$params.maxLength.max)"/>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col lg="6">
            <b-form-group label="Boite" description="Veuillez encoder votre boite">
              <b-form-input v-model="$v.adresse.boite.$model" placeholder="Boite :" :state="validateState('boite')"/>
              <b-form-invalid-feedback>
                <l-invalid-feedback :condition="!$v.adresse.boite.alphaNum" :error-message="alphaNum()"/>
                <l-invalid-feedback :condition="!$v.adresse.boite.minLength"
                                    :error-message="minLength($v.adresse.boite.$params.minLength.min)"/>
                <l-invalid-feedback :condition="!$v.adresse.boite.maxLength"
                                    :error-message="maxLength($v.adresse.boite.$params.maxLength.max)"/>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-button-group>
          <b-button variant="outline-dark" :to="{name: link}">
            <i class="fas fa-arrow-left"></i>
          </b-button>
          <b-button variant="outline-success" type="submit" :disabled="submitStatus === 'PENDING'">
            Ajouter
          </b-button>
        </b-button-group>
      </b-form>
    </b-card-body>
  </b-card>
</template>

<script>
import AdresseModel from "@/models/adresse.model";
import {validationMixin} from "vuelidate";
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";
import {fonctions} from "@/mixins/functions.mixin";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import {multiSelectValidationMixin} from "@/mixins/multiselect_validation.mixin";
import {htmlTitle} from "@/utils/tools";

export default {
  name: "VUAdresseAdd",
  mixins: [validationMixin, fonctions, validationMessageMixin, multiSelectValidationMixin],
  validations: {
    adresse: AdresseModel.validations
  },
  title() {
    return htmlTitle()
  },
  data() {
    return {
      adresse: new AdresseModel(),
      loading: false,
      submitStatus: null,
      BSClass: LemkaHelpers.BSClass,
      link: LemkaHelpers.Routes.INFORMATIONS.name,
    }
  },
  computed: {
    ...mapGetters({villes: "Villes/villes"}),
    isInvalid() {
      return this.isTouched && this.adresse.ref_ville.id === null
    }
  },
  methods: {
    ...mapActions({loadVilles: "Villes/loadVilles", createAdresse: "Profil/createAdresse"}),

    submit: function () {
      this.$v.$touch()
      if (this.$v.$invalid ||
          (this.isTouched === false && this.isInvalid === false) ||
          (this.isTouched === true && this.isInvalid === true)) {
        this.isTouched = true
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        this.createAdresse(this.adresse.toCreatePayload())

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: this.link})
        }, 500)
      }
    },

    updateSelect: async function (query) {
      this.toggleLoading()
      await this.loadVilles(query)
      this.toggleLoading()
    },

    validateState(name) {
      const {$dirty, $error} = this.$v.adresse[name];
      return $dirty ? !$error : null;
    },
  },
  created() {
    this.loadVilles()
  }
}
</script>

<style scoped>

</style>