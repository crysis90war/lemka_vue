<template>
  <b-card title="Ajouter entreprise" :class="BSClass.CARD_BORDERLESS_SHADOW">
    <b-card-body>
      <b-form>
        <b-row>
          <b-col lg="6">
            <b-form-group
                label="Nom de société"
                description="Veuillez encoder le nom de la société"
            >
              <b-form-input
                  v-model="$v.entreprise.nom_societe.$model"
                  type="text"
                  placeholder="Nom de société ..."
                  :state="validateState('nom_societe')"
              />
              <b-form-invalid-feedback>
                <l-invalid-feedback
                    :condition="!$v.entreprise.nom_societe.required"
                    :error-message="required()"
                />
                <l-invalid-feedback
                    :condition="!$v.entreprise.nom_societe.minLength"
                    :errorMessage="minLength($v.entreprise.nom_societe.$params.minLength.min)"
                />
                <l-invalid-feedback
                    :condition="!$v.entreprise.nom_societe.maxLength"
                    :errorMessage="minLength($v.entreprise.nom_societe.$params.maxLength.max)"
                />
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col lg="6">
            <b-form-group
                label="Numéro de TVA"
                description="Veuillez encoder le numéro de TVA de la société"
            >
              <b-form-input
                  v-model="$v.entreprise.numero_tva.$model"
                  type="text"
                  placeholder="Numero de tva ..."
                  :state="validateState('numero_tva')"
              />
              <b-form-invalid-feedback>
                <l-invalid-feedback
                    :condition="!$v.entreprise.numero_tva.required"
                    :error-message="required()"
                />
                <l-invalid-feedback
                    :condition="!$v.entreprise.numero_tva.minLength"
                    :errorMessage="minLength($v.entreprise.numero_tva.$params.minLength.min)"
                />
                <l-invalid-feedback
                    :condition="!$v.entreprise.numero_tva.maxLength"
                    :errorMessage="minLength($v.entreprise.numero_tva.$params.maxLength.max)"
                />
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="4">
            <b-form-group
                label="Email"
                description="Veuillez encoder l'email de la société"
            >
              <b-form-input
                  v-model="$v.entreprise.mail_contact.$model"
                  type="email"
                  placeholder="Email ..."
                  :state="validateState('mail_contact')"
              />
              <b-form-invalid-feedback>
                <l-invalid-feedback
                    :condition="!$v.entreprise.mail_contact.required"
                    :error-message="required()"
                />
                <l-invalid-feedback
                    :condition="!$v.entreprise.mail_contact.minLength"
                    :errorMessage="minLength($v.entreprise.mail_contact.$params.minLength.min)"
                />
                <l-invalid-feedback
                    :condition="!$v.entreprise.mail_contact.maxLength"
                    :errorMessage="minLength($v.entreprise.mail_contact.$params.maxLength.max)"
                />
                <l-invalid-feedback
                    :condition="!$v.entreprise.mail_contact.email"
                    :errorMessage="email()"
                />
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col lg="4">
            <b-form-group
                label="Tél."
                description="Veuillez encoder le numéro de téléphone"
            >
              <b-form-input
                  v-model="$v.entreprise.numero_tel.$model"
                  type="tel"
                  placeholder="Tél ..."
                  :state="validateState('numero_tel')"
              />
              <b-form-invalid-feedback>
                <l-invalid-feedback
                    :condition="!$v.entreprise.numero_tel.required"
                    :error-message="required()"
                />
                <l-invalid-feedback
                    :condition="!$v.entreprise.numero_tel.numeric"
                    :errorMessage="numeric()"
                />
                <l-invalid-feedback
                    :condition="!$v.entreprise.numero_tel.minLength"
                    :errorMessage="minLength($v.entreprise.numero_tel.$params.minLength.min)"
                />
                <l-invalid-feedback
                    :condition="!$v.entreprise.numero_tel.maxLength"
                    :errorMessage="maxLength($v.entreprise.numero_tel.$params.maxLength.max)"
                />
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col lg="4">
            <b-form-group
                label="Site web"
                description="Veuillez encoder le site web"
            >
              <b-form-input
                  v-model="$v.entreprise.site_web.$model"
                  type="url"
                  placeholder="https://www.exemple.be"
                  :state="validateState('site_web')"
              />
              <b-form-invalid-feedback>
                <l-invalid-feedback
                    :condition="!$v.entreprise.site_web.required"
                    :error-message="required()"
                />
                <l-invalid-feedback
                    :condition="!$v.entreprise.site_web.url"
                    :error-message="url()"
                />
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="8">
            <b-form-group
                label="Rue"
                description="Veuillez encoder la rue"
            >
              <b-form-input
                  v-model="$v.entreprise.rue.$model"
                  type="text"
                  placeholder="Rue ..."
                  :state="validateState('rue')"
              />
              <b-form-invalid-feedback>
                <l-invalid-feedback
                    :condition="!$v.entreprise.rue.required"
                    :error-message="required()"
                />
                <l-invalid-feedback
                    :condition="!$v.entreprise.rue.minLength"
                    :errorMessage="minLength($v.entreprise.rue.$params.minLength.min)"
                />
                <l-invalid-feedback
                    :condition="!$v.entreprise.rue.maxLength"
                    :errorMessage="maxLength($v.entreprise.rue.$params.maxLength.max)"
                />
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col lg="4">
            <b-form-group
                label="Numéro"
                description="Veuillez encoder le numéro"
            >
              <b-form-input
                  v-model="$v.entreprise.numero.$model"
                  type="text"
                  placeholder="Numéro ..."
                  :state="validateState('numero')"
              />
              <b-form-invalid-feedback>
                <l-invalid-feedback
                    :condition="!$v.entreprise.numero.required"
                    :error-message="required()"
                />
                <l-invalid-feedback
                    :condition="!$v.entreprise.numero.minLength"
                    :errorMessage="minLength($v.entreprise.numero.$params.minLength.min)"
                />
                <l-invalid-feedback
                    :condition="!$v.entreprise.numero.alphaNum"
                    :errorMessage="alphaNum()"
                />
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group
            label="Ville"
            description="Selectionn selectionner votre ville"
        >
          <multiselect
              v-model="entreprise.ville"
              :options="villes"
              :loading="loadingStatus"
              :class="{ 'invalid': isInvalid }"
              label="ville"
              placeholder="Veuillez encoder pour lancer la recherche..."
              track-by="ville"
              :multiple="false"
              :searchable="true"
              :internal-search="false"
              :allow-empty="false"
              :clear-on-select="false"
              :close-on-select="true"
              :options-limit="20"
              :max-height="600"
              :show-no-results="false"
              :hide-selected="true"
              @search-change="updateSelect"
              @close="onTouch"
          >
            <template slot="singleLabel" slot-scope="{ option }">
              <span>{{ cityOption(option) }}</span>
            </template>
            <template slot="option" slot-scope="{ option }">
              <span>{{ option.code_postale }} - {{ option.ville }}</span>
            </template>
            <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
          </multiselect>
        </b-form-group>

        <b-button-group>
          <b-button
              variant="outline-success"
              type="button"
              @click.stop.prevent="submit"
              :disabled="submitStatus === 'PENDING'"
          >
            Créer
          </b-button>
          <b-button
              variant="outline-danger"
              :to="{name: link}"
          >
            Retour
          </b-button>
        </b-button-group>
      </b-form>
    </b-card-body>
    <l-jumbotron :data="entreprise"/>
  </b-card>
</template>

<script>
import EntrepriseModel from "@/models/entreprise.model";
import {validationMixin} from "vuelidate";
import LemkaHelpers from "@/helpers";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import {fonctions} from "@/mixins/functions.mixin";
import {mapActions, mapGetters} from "vuex";
import {multiSelectValidationMixin} from "@/mixins/multiselect_validation.mixin";

export default {
  name: "VAEntrepriseAdd",
  mixins: [validationMixin, validationMessageMixin, multiSelectValidationMixin, fonctions],
  validations: {
    entreprise: EntrepriseModel.validations
  },
  data() {
    return {
      entreprise: new EntrepriseModel(),
      submitStatus: null,

      link: LemkaHelpers.Routes.PARAMETRES_ENTREPRISE.name,
      BSClass: LemkaHelpers.BSClass,
    }
  },
  computed: {
    ...mapGetters({villes: "Villes/villes", loadingStatus: "Villes/loadingStatus"}),
    isInvalid() {
      return this.isTouched && this.entreprise.ville.id === null
    },
  },
  methods: {
    ...mapActions({loadVilles: "Villes/loadVilles", createEntreprise: "Entreprises/createEntreprise"}),
    chargerVilles: async function () {
      await this.loadVilles()
    },

    updateSelect: async function (query) {
      await this.loadVilles(query)
    },

    submit: function () {
      this.$v.$touch()
      if (this.$v.$invalid ||
          (this.isTouched === false && this.isInvalid === false) ||
          (this.isTouched === true && this.isInvalid === true)) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        this.createEntreprise(this.entreprise.toCreatePayload())
        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: LemkaHelpers.Routes.PARAMETRES_ENTREPRISE.name})
        }, 500)
      }
    },

    validateState(name) {
      const {$dirty, $error} = this.$v.entreprise[name];
      return $dirty ? !$error : null;
    },

    cityOption: function(option) {
      if (option.id === null){
        return null
      } else {
        return `${option.code_postale} - ${option.ville}`
      }
    }
  },

  created() {
    this.chargerVilles()
  },

  async beforeRouteEnter(to, from, next) {
    next(vm => {
      const entreprises = vm.$store.getters["Entreprises/entreprises"]
      if (entreprises.length === 0) {
        vm.$store.dispatch("Entreprises/loadEntreprises")
      }
      if (entreprises.length === 0) {
        next()
      } else {
        next({name: LemkaHelpers.Routes.PARAMETRES_ENTREPRISE.name})
      }
    })
  }
}
</script>

<style scoped>

</style>