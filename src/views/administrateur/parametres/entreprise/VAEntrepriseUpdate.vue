<template>
  <b-card title="Modifier entreprise" :class="BSClass.CARD_BORDERLESS_SHADOW">
    <b-card-body>
      <b-form @submit.prevent="submit">
        <b-row>
          <b-col lg="6">
            <b-form-group label="Nom de société" description="Veuillez encoder le nom de la société">
              <b-form-input v-model="$v.entreprise.nom_societe.$model" placeholder="Nom de société ..."
                            :state="validateState('nom_societe')"/>
              <b-form-invalid-feedback>
                <b-badge v-if="!$v.entreprise.nom_societe.required" pill variant="danger">
                  {{ required() }}
                </b-badge>
                <b-badge v-if="!$v.entreprise.nom_societe.minLength" pill variant="danger">
                  {{ minLength($v.entreprise.nom_societe.$params.minLength.min) }}
                </b-badge>
                <b-badge v-if="!$v.entreprise.nom_societe.maxLength" pill variant="danger">
                  {{ maxLength($v.entreprise.nom_societe.$params.maxLength.max) }}
                </b-badge>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col lg="6">
            <b-form-group label="Numéro de TVA" description="Veuillez encoder le numéro de TVA de la société">
              <b-form-input v-model="$v.entreprise.numero_tva.$model" type="text" placeholder="Numero de tva ..."
                            :state="validateState('numero_tva')"/>
              <b-form-invalid-feedback>
                <b-badge v-if="!$v.entreprise.numero_tva.required" pill variant="danger">
                  {{ required() }}
                </b-badge>
                <b-badge v-if="!$v.entreprise.numero_tva.alphaNum" pill variant="danger">
                  {{ alphaNum() }}
                </b-badge>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="4">
            <b-form-group label="Email" description="Veuillez encoder l'email de la société">
              <b-form-input v-model="$v.entreprise.mail_contact.$model" type="email" placeholder="Email ..."
                            :state="validateState('mail_contact')"></b-form-input>
              <b-form-invalid-feedback>
                <b-badge v-if="!$v.entreprise.mail_contact.required" pill variant="danger">
                  {{ required() }}
                </b-badge>
                <b-badge v-if="!$v.entreprise.mail_contact.minLength" pill variant="danger">
                  {{ minLength($v.entreprise.mail_contact.$params.minLength.min) }}
                </b-badge>
                <b-badge v-if="!$v.entreprise.mail_contact.maxLength" pill variant="danger">
                  {{ maxLength($v.entreprise.mail_contact.$params.maxLength.max) }}
                </b-badge>
                <b-badge v-if="!$v.entreprise.mail_contact.email" pill variant="danger">
                  {{ email() }}
                </b-badge>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col lg="4">
            <b-form-group label="Tél." description="Veuillez encoder le numéro de téléphone">
              <b-form-input v-model="$v.entreprise.numero_tel.$model" type="tel" placeholder="Tél ..."
                            :state="validateState('numero_tel')"></b-form-input>
              <b-form-invalid-feedback>
                <b-badge v-if="!$v.entreprise.numero_tel.required" pill variant="danger">
                  {{ required() }}
                </b-badge>
                <b-badge v-if="!$v.entreprise.numero_tel.numeric" pill variant="danger">
                  {{ numeric() }}
                </b-badge>
                <b-badge v-if="!$v.entreprise.numero_tel.minLength" pill variant="danger">
                  {{ minLength($v.entreprise.numero_tel.$params.minLength.min) }}
                </b-badge>
                <b-badge v-if="!$v.entreprise.numero_tel.maxLength" pill variant="danger">
                  {{ maxLength($v.entreprise.numero_tel.$params.maxLength.max) }}
                </b-badge>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col lg="4">
            <b-form-group label="Site web" description="Veuillez encoder le site web de l'entreprise">
              <b-form-input v-model="$v.entreprise.site_web.$model" type="url" placeholder="https://www.exemple.be"
                            :state="validateState('site_web')"></b-form-input>
              <b-form-invalid-feedback>
                <b-badge v-if="!$v.entreprise.site_web.required" pill variant="danger">
                  {{ required() }}
                </b-badge>
                <b-badge v-if="!$v.entreprise.site_web.url" pill variant="danger">
                  {{ url() }}
                </b-badge>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="8">
            <b-form-group label="Rue" description="Veuillez encoder la rue de l'entreprise">
              <b-form-input v-model="$v.entreprise.rue.$model" type="text" placeholder="Rue ..."
                            :state="validateState('rue')"></b-form-input>
              <b-form-invalid-feedback>
                <b-badge v-if="!$v.entreprise.rue.required" pill variant="danger">
                  {{ required() }}
                </b-badge>
                <b-badge v-if="!$v.entreprise.rue.minLength" pill variant="danger">
                  {{ minLength($v.entreprise.rue.$params.minLength.min) }}
                </b-badge>
                <b-badge v-if="!$v.entreprise.rue.maxLength" pill variant="danger">
                  {{ maxLength($v.entreprise.rue.$params.maxLength.max) }}
                </b-badge>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col lg="4">
            <b-form-group label="Numéro" description="Veuillez encoder le numéro">
              <b-form-input v-model="$v.entreprise.numero.$model" type="text" placeholder="Numéro ..."
                            :state="validateState('numero')"></b-form-input>
              <b-form-invalid-feedback>
                <b-badge v-if="!$v.entreprise.numero.required" pill variant="danger">
                  {{ required() }}
                </b-badge>
                <b-badge v-if="!$v.entreprise.numero.alphaNum" pill variant="danger">
                  {{ alphaNum() }}
                </b-badge>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group label="Ville" description="Veuillez selectionner la ville ou se trouve votre entreprise">
            <multiselect v-model="entreprise.ville" :options="villes" :loading="loadingStatus" :class="{ 'invalid': isInvalid }"
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

        <b-button-group>
          <b-button variant="outline-primary" type="submit" :disabled="submitStatus === 'PENDING'">
            Modifier
          </b-button>
          <b-button variant="outline-danger" @click.prevent="$router.go(-1)">Retour</b-button>
        </b-button-group>
      </b-form>

    </b-card-body>
    <b-jumbotron>
      <pre>{{ entreprise }}</pre>
      <pre>{{ entreprise.toUpdatePayload() }}</pre>
    </b-jumbotron>
  </b-card>
</template>

<script>
import {validationMixin} from "vuelidate";
import EntrepriseModel from "@/models/entreprise.model";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";
import {multiSelectValidationMixin} from "@/mixins/multiselect_validation.mixin";

export default {
  name: "VAEntrepriseUpdate",
  mixins: [validationMixin, validationMessageMixin, multiSelectValidationMixin],
  validations: {
    entreprise: EntrepriseModel.validations
  },
  data() {
    return {
      entreprise: new EntrepriseModel(),
      submitStatus: null,
      BSClass: LemkaHelpers.BSClass,
    }
  },
  computed: {
    ...mapGetters({villes: "Villes/villes", loadingStatus: "Villes/loadingStatus"}),
    isInvalid() {
      return this.isTouched && this.entreprise.ville.id === null
    }
  },
  methods: {
    ...mapActions({updateEntreprise: "Entreprises/updateEntreprise", loadVilles: "Villes/loadVilles"}),

    chargerEntreprise: function () {
      this.loadVilles()
      Object.assign(this.entreprise, this.$store.getters["Entreprises/entreprise"])
    },

    submit: function() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        this.updateEntreprise(this.entreprise.toUpdatePayload())
        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: LemkaHelpers.Routes.PARAMETRES_ENTREPRISE.name})
        }, 500)
      }
    },

    updateSelect: async function (query) {
      await this.loadVilles(query)
    },

    validateState(name) {
      const {$dirty, $error} = this.$v.entreprise[name];
      return $dirty ? !$error : null;
    },
  },

  created() {
    this.chargerEntreprise()
  }
}
</script>

<style scoped>

</style>