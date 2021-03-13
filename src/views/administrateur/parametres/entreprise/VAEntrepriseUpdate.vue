<template>
  <b-card title="Modifier entreprise" :class="BSClass.CARD_BORDERLESS_SHADOW">
    <b-card-body>
      <b-form @submit.prevent="submit">
        <b-row>
          <b-col lg="6">
            <b-form-group id="intput-group-societe"
                          label-for="input-societe"
                          label="Nom de société"
                          description="Veuillez encoder le nom de la société">
              <b-form-input v-model="$v.entreprise.nom_societe.$model"
                            id="nom_societe"
                            name="nom_societe"
                            type="text"
                            placeholder="Nom de société ..."
                            :state="validateState('nom_societe')"></b-form-input>
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
            <b-form-group id="intput-group-tva"
                          label-for="input-tva"
                          label="Numéro de TVA"
                          description="Veuillez encoder le numéro de TVA de la société">
              <b-form-input v-model="$v.entreprise.numero_tva.$model"
                            id="input-tva"
                            name="intput-tva"
                            type="text"
                            placeholder="Numero de tva ..."
                            :state="validateState('numero_tva')"></b-form-input>
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
            <b-form-group id="intput-group-mail"
                          label-for="input-mail"
                          label="Email"
                          description="Veuillez encoder l'email de la société">
              <b-form-input v-model="$v.entreprise.mail_contact.$model"
                            id="intput-email"
                            name="intput-mail"
                            type="email"
                            placeholder="Email ..."
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
            <b-form-group id="intput-group-tel"
                          label-for="input-tel"
                          label="Tél."
                          description="Veuillez encoder le numéro de téléphone">
              <b-form-input v-model="$v.entreprise.numero_tel.$model"
                            id="intput-tel"
                            name="intput-tel"
                            type="tel"
                            placeholder="Tél ..."
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
            <b-form-group id="intput-group-web"
                          label-for="input-web"
                          label="Site web"
                          description="Veuillez encoder le site web de l'entreprise">
              <b-form-input v-model="$v.entreprise.site_web.$model"
                            id="intput-web"
                            name="intput-web"
                            type="url"
                            placeholder="https://www.exemple.be"
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
            <b-form-group id="intput-group-rue"
                          label-for="input-rue"
                          label="Rue"
                          description="Veuillez encoder la rue de l'entreprise">
              <b-form-input v-model="$v.entreprise.rue.$model"
                            id="intput-rue"
                            name="intput-rue"
                            type="text"
                            placeholder="Rue ..."
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
            <b-form-group id="input-group-numero"
                          label-for="input-numero"
                          label="Numéro"
                          description="Veuillez encoder le numéro">
              <b-form-input v-model="$v.entreprise.numero.$model"
                            id="input-numero"
                            name="intput-numero"
                            type="text"
                            placeholder="Numéro ..."
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

        <b-form-group id="input-group-ref_ville"
                      label-for="input-ref_ville"
                      label="Ville"
                      description="Veuillez selectionner la ville ou se trouve votre entreprise">
          <multiselect v-model="$v.entreprise.ref_ville.$model"
                       :options="villeOptions"
                       :loading="isLoading"
                       :multiple="false"
                       :searchable="true"
                       :internal-search="false"
                       :clear-on-select="false"
                       :close-on-select="true"
                       :options-limit="20"
                       :max-height="600"
                       :show-no-results="true"
                       :hide-selected="true"
                       label="ville"
                       track-by="ville"
                       placeholder="Veuillez encoder pour lancer la recherche..."
                       open-direction="bottom"
                       @input="$v.entreprise.ref_ville.$touch()"
                       @search-change="updateSelect">
            <template slot="singleLabel" slot-scope="{ option }">
              <span>{{ option.code_postale }} - {{ option.ville }}</span>
            </template>
            <template slot="option" slot-scope="{ option }">
              <span>{{ option.code_postale }} - {{ option.ville }}</span>
            </template>
            <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
          </multiselect>
          <b-form-invalid-feedback>
            <b-badge v-if="!$v.entreprise.ref_ville.required" pill variant="danger">
              {{ required() }}
            </b-badge>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button-group>
          <b-button variant="outline-primary" type="submit" :disabled="submitStatus === 'PENDING'">
            Modifier
          </b-button>
          <b-button variant="outline-danger" @click.prevent="$router.go(-1)">Retour</b-button>
        </b-button-group>
      </b-form>
    </b-card-body>
  </b-card>
</template>

<script>
import {validationMixin} from "vuelidate";
import EntrepriseModel from "@/models/entreprise.model";
import VilleModel from "@/models/ville.model";
import PaysModel from "@/models/pays.model";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import LemkaHelpers from "@/helpers";

export default {
  name: "VAEntrepriseUpdate",
  mixins: [validationMixin, validationMessageMixin],
  validations: {
    entreprise: EntrepriseModel.validations
  },
  data() {
    return {
      entreprise: new EntrepriseModel(),
      isLoading: false,
      villeOptions: [],
      submitStatus: null,

      BSClass: LemkaHelpers.BSClass,
    }
  },

  methods: {
    async chargerEntreprise() {
      this.entLength = (await this.checkEntreprise()).length
      let entrepriseId = (await this.checkEntreprise()).id
      if (entrepriseId !== null && entrepriseId !== undefined) {
        let entreprise = await EntrepriseModel.getEntrepriseDetail(entrepriseId)
        if (entreprise.ref_ville !== null && entreprise.ref_ville !== undefined) {
          let ville = await VilleModel.fetchVille(entreprise.ref_ville)
          entreprise.ref_ville = ville
          if (ville.ref_pays !== null && ville.ref_pays !== undefined) {
            ville.ref_pays = await PaysModel.fetchPays(ville.ref_pays)
          }
        }

        Object.assign(this.entreprise, entreprise)
      } else {
        this.entreprise = new EntrepriseModel()
      }
    },

    async checkEntreprise() {
      let id = null
      let entreprises = await EntrepriseModel.getEntrepriseList()
      let length = entreprises.length
      if (length > 0) {
        id = entreprises[0].id
      }
      return {
        length: length,
        id: id
      }
    },

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
        await EntrepriseModel.updateEntreprise(this.entreprise.toUpdatePayload())
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
  },

  created() {
    this.chargerVilles()
    this.chargerEntreprise()
  },

  async beforeRouteEnter(to, from, next) {
    async function isValid() {
      let entreprise = await EntrepriseModel.getEntrepriseList()
      return entreprise.length === 0;
    }

    if (!await isValid()) {

      next();
    } else {
      next({name: LemkaHelpers.Routes.PARAMETRES.name})
    }
  }
}
</script>

<style scoped>

</style>