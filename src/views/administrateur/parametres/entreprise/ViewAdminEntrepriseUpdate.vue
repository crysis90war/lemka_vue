<template>
    <b-card title="Modifier entreprise" :class="bootstrap.shadow">
      <b-card-body>
        <b-form @submit.prevent="submit">
          <b-row>
            <b-col lg="6">
              <b-form-group id="intput-groupe-societe" label="Nom de société"
                            description="Veuillez encoder le nom de la société" label-for="input-societe">
                <b-form-input v-model="$v.entreprise.nom_societe.$model" type="text" id="nom_societe" name="nom_societe"
                              placeholder="Nom de société ..." :state="validateState('nom_societe')"></b-form-input>
                <b-form-invalid-feedback>
                  <b-badge pill variant="danger" v-if="!$v.entreprise.nom_societe.required">Ce champ est obligatoire.
                  </b-badge>
                  <b-badge pill variant="danger" v-if="!$v.entreprise.nom_societe.minLength">Ce champ doit contenir au
                    moins 2 caractères.
                  </b-badge>
                  <b-badge pill variant="danger" v-if="!$v.entreprise.nom_societe.maxLength">Ce champ doit contenir au
                    moins 255 caractères.
                  </b-badge>
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col lg="6">
              <b-form-group id="intput-groupe-tva" label="Numéro de TVA"
                            description="Veuillez encoder le numéro de TVA de la société" label-for="input-tva">
                <b-form-input v-model="$v.entreprise.numero_tva.$model" type="text" id="input-tva" name="intput-tva"
                              placeholder="Numero de tva ..." :state="validateState('numero_tva')"></b-form-input>
                <b-form-invalid-feedback>
                  <b-badge pill variant="danger" v-if="!$v.entreprise.numero_tva.required">Ce champ est obligatoire.
                  </b-badge>
                  <b-badge pill variant="danger" v-if="!$v.entreprise.numero_tva.minLength">Ce champ doit contenir au
                    moins 2 caractères.
                  </b-badge>
                  <b-badge pill variant="danger" v-if="!$v.entreprise.numero_tva.maxLength">Ce champ doit contenir au
                    moins 255 caractères.
                  </b-badge>
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col lg="4">
              <b-form-group id="intput-groupe-mail" label="Email" description="Veuillez encoder l'email de la société"
                            label-for="input-mail">
                <b-form-input v-model="$v.entreprise.mail_contact.$model" type="email" id="intput-email"
                              name="intput-mail"
                              placeholder="Email ..." :state="validateState('mail_contact')"></b-form-input>
                <b-form-invalid-feedback>
                  <b-badge pill variant="danger" v-if="!$v.entreprise.mail_contact.required">Ce champ est obligatoire.
                  </b-badge>
                  <b-badge pill variant="danger" v-if="!$v.entreprise.mail_contact.minLength">Ce champ doit contenir au
                    moins 5 caractères.
                  </b-badge>
                  <b-badge pill variant="danger" v-if="!$v.entreprise.mail_contact.maxLength">Ce champ doit contenir au
                    moins 255 caractères.
                  </b-badge>
                  <b-badge pill variant="danger" v-if="!$v.entreprise.mail_contact.email">Ce champ doit être un email
                    valide.
                  </b-badge>
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col lg="4">
              <b-form-group id="intput-groupe-tel" label="Tél." description="Veuillez encoder le numéro de téléphone"
                            label-for="input-tel">
                <b-form-input v-model="$v.entreprise.numero_tel.$model" type="tel" id="intput-tel" name="intput-tel"
                              placeholder="Tél ..." :state="validateState('numero_tel')"></b-form-input>
                <b-form-invalid-feedback>
                  <b-badge pill variant="danger" v-if="!$v.entreprise.numero_tel.required">Ce champ est obligatoire.
                  </b-badge>
                  <b-badge pill variant="danger" v-if="!$v.entreprise.numero_tel.numeric">Ce champ doit être
                    numérique.
                  </b-badge>
                  <b-badge pill variant="danger" v-if="!$v.entreprise.numero_tel.minLength">Ce champ doit contenir au
                    moins 5 caractères.
                  </b-badge>
                  <b-badge pill variant="danger" v-if="!$v.entreprise.numero_tel.maxLength">Ce champ doit contenir au
                    moins 255 caractères.
                  </b-badge>
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col lg="4">
              <b-form-group id="intput-groupe-web" label="Site web" description="Veuillez encoder le site web"
                            label-for="input-web">
                <b-form-input v-model="$v.entreprise.site_web.$model" type="url" id="intput-web" name="intput-web"
                              placeholder="https://www.exemple.be" :state="validateState('site_web')"></b-form-input>
                <b-form-invalid-feedback>
                  <b-badge pill variant="danger" v-if="!$v.entreprise.site_web.required">Ce champ est obligatoire.
                  </b-badge>
                  <b-badge pill variant="danger" v-if="!$v.entreprise.site_web.url">Ce champ doit être un url valide.
                  </b-badge>
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col lg="8">
              <b-form-group id="intput-groupe-rue" label="Rue" description="Veuillez encoder la rue"
                            label-for="input-rue">
                <b-form-input v-model="$v.entreprise.rue.$model" type="text" id="intput-rue" name="intput-rue"
                              placeholder="Rue ..." :state="validateState('rue')"></b-form-input>
                <b-form-invalid-feedback>
                  <b-badge pill variant="danger" v-if="!$v.entreprise.rue.required">Ce champ est obligatoire.</b-badge>
                  <b-badge pill variant="danger" v-if="!$v.entreprise.rue.minLength">Ce champ doit contenir au moins 2
                    caractères.
                  </b-badge>
                  <b-badge pill variant="danger" v-if="!$v.entreprise.rue.maxLength">Ce champ doit contenir au moins 255
                    caractères.
                  </b-badge>
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col lg="4">
              <b-form-group id="input-groupe-numero" label="Numéro" description="Veuillez encoder le numéro"
                            label-for="input-numero">
                <b-form-input v-model="$v.entreprise.numero.$model" type="text" id="input-numero" name="intput-numero"
                              placeholder="Numéro ..." :state="validateState('numero')"></b-form-input>
                <b-form-invalid-feedback>
                  <b-badge pill variant="danger" v-if="!$v.entreprise.numero.minLength">
                    Ce champ doit contenir au moins 1 caractères.
                  </b-badge>
                  <br>
                  <b-badge pill variant="danger" v-if="!$v.entreprise.numero.alphaNum">
                    Ce champ doit être numérique.
                  </b-badge>
                  <b-badge pill variant="danger" v-if="!$v.entreprise.numero.required">
                    Ce champ est obligatoire.
                  </b-badge>
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>

          <b-form-group label="Ville"
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
              <b-badge pill variant="danger" v-if="!$v.entreprise.ref_ville.required">Ce champ est obligatoire.
              </b-badge>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-button-group>
            <b-button variant="outline-primary" type="submit" :disabled="submitStatus === 'PENDING'">Modifier
            </b-button>
            <b-button variant="outline-danger" :to="{name: link}">Retour</b-button>
          </b-button-group>
        </b-form>
      </b-card-body>
    </b-card>
</template>

<script>
import {validationMixin} from "vuelidate";
import EntrepriseModel from "@/models/entreprise.model";
import {LemkaEnums} from "@/helpers/enums.helper";
import VilleModel from "@/models/ville.model";
import PaysModel from "@/models/pays.model";

export default {
  name: "ViewAdminEntrepriseUpdate",
  mixins: validationMixin,
  validations: {
    entreprise: EntrepriseModel.validations
  },
  data() {
    return {
      entreprise: new EntrepriseModel(),
      isLoading: false,
      villeOptions: [],
      submitStatus: null,

      link: LemkaEnums.Routes.PARAMETRES_ENTREPRISE.name,
      bootstrap: {
        shadow: LemkaEnums.BSClass.CARD_BORDERLESS_SHADOW
      }
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
          this.$router.push({name: LemkaEnums.Routes.PARAMETRES_ENTREPRISE.name})
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
      next({name: LemkaEnums.Routes.PARAMETRES.name})
    }
  }
}
</script>

<style scoped>

</style>