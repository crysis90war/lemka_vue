<template>
  <div class="update_adresse">

    <b-card v-if="loading === false" title="Modifier l'adresse" class="my-4" :class="BSClass.CARD_BORDERLESS_SHADOW">
      <b-card-body>
        <b-form @submit.prevent="submit">

          <b-form-group label="Ville" description="Selectionn selectionner votre ville">
            <multiselect v-model="adresse.ville" :options="villes" :loading="loadingStatus" :class="{ 'invalid': isInvalid }"
                         label="ville" placeholder="Veuillez encoder pour lancer la recherche..." track-by="ville"
                         :multiple="false" :searchable="true" :internal-search="false" :allow-empty="false"
                         :clear-on-select="false" :close-on-select="true" :options-limit="20"
                         :max-height="600" :show-no-results="false" :hide-selected="true"
                         @search-change="updateSelect" @close="onTouch">
              <template slot="singleLabel" slot-scope="{ option }">
                <span>{{ option.code_postale }} - {{ option.ville }}</span>
              </template>
              <template slot="option" slot-scope="{ option }">
                <span>{{ option.code_postale }} - {{ option.ville }}</span>
              </template>
              <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
            </multiselect>
          </b-form-group>

          <b-form-group label="Rue" description="Veuillez encoder votre rue">
            <b-form-input v-model="$v.adresse.rue.$model"
                          placeholder="Rue :" :state="validateState('rue')"></b-form-input>
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
                <b-form-input v-model="$v.adresse.numero.$model"
                              placeholder="Numéro :" :state="validateState('numero')"></b-form-input>
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
                <b-form-input v-model="$v.adresse.boite.$model"
                              placeholder="Boite :" :state="validateState('boite')"></b-form-input>
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
            <b-button variant="outline-primary" type="submit" :disabled="submitStatus === 'PENDING'">
              Sauvegarder
            </b-button>
          </b-button-group>
        </b-form>
      </b-card-body>
    </b-card>

    <l-spinner v-else/>
  </div>
</template>

<script>
import {validationMixin} from "vuelidate";
import AdresseModel from "@/models/adresse.model";
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";
import {commonMixin} from "@/mixins/common.mixin";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import {multiSelectValidationMixin} from "@/mixins/multiselect_validation.mixin";
import {htmlTitle} from "@/utils/tools";

export default {
  name: "VUAdresseUpdate",
  mixins: [validationMixin, validationMessageMixin, commonMixin, multiSelectValidationMixin],
  validations: {
    adresse: AdresseModel.validations
  },
  title() {
    return htmlTitle("Modifier adresse")
  },
  data() {
    return {
      loading: false,
      submitStatus: null,
      BSClass: LemkaHelpers.BSClass,
      link: LemkaHelpers.Routes.INFORMATIONS.name,
    }
  },
  computed: {
    ...mapGetters({
      villes: "Villes/villes",
      loadingStatus: "Villes/loadingStatus",
      adresse: "Adresse/adresse"
    }),
    isInvalid() {
      return this.isTouched && this.adresse.ville.id === null
    }
  },
  methods: {
    ...mapActions({
      loadVilles: "Villes/loadVilles",
      loadCity: "Villes/loadCity",
      updateAdresse: "Adresse/updateAdresse",
    }),
    initialisation: async function () {
      this.toggleLoading()
      await this.loadVilles()
      this.toggleLoading()
    },

    updateSelect: async function (query) {
      await this.loadVilles(query)
    },

    submit: function () {
      if (this.$v.$invalid ||
          (this.isTouched === false && this.isInvalid === false) ||
          (this.isTouched === true && this.isInvalid === true)) {
        this.isTouched = true
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        this.updateAdresse(this.adresse.toUpdatePayload())

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
    this.initialisation()
  }
}
</script>

<style scoped>
</style>