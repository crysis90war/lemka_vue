<template>
  <div class="entreprise_update">
    <l-spinner v-if="isLoading === true"/>

    <b-card v-else title="Modifier entreprise" :class="BSClass.CARD_BORDERLESS_SHADOW">
      <b-card-body>
        <!-- region Nom de société / Numéro de TVA -->
        <b-row>
          <b-col lg="6">
            <l-input-field
                :input-type="true"
                v-model="$v.entreprise.nom_societe.$model"
                label="Nom de société"
                description="Veuillez encoder le nom de la société"
                placeholder="Nom de société ..."
                :state="validateState($v.entreprise, 'nom_societe')"
            >
              <template #invalid-feedback>
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
              </template>
            </l-input-field>
          </b-col>

          <b-col lg="6">
            <l-input-field
                :input-type="true"
                v-model="$v.entreprise.numero_tva.$model"
                label="Numéro de TVA"
                description="Veuillez encoder le numéro de TVA de la société"
                placeholder="Numero de tva ..."
                :state="validateState($v.entreprise, 'numero_tva')"
            >
              <template #invalid-feedback>
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
              </template>
            </l-input-field>
          </b-col>
        </b-row>
        <!-- endregion -->

        <!-- region Email / Tél / Site Web -->
        <b-row>
          <b-col lg="6">
            <l-input-field
                :input-type="true"
                v-model="$v.entreprise.mail_contact.$model"
                label="Email"
                description="Veuillez encoder l'email de la société"
                placeholder="Email ..."
                type="email"
                :state="validateState($v.entreprise, 'mail_contact')"
            >
              <template #invalid-feedback>
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
              </template>
            </l-input-field>
          </b-col>

          <b-col lg="6">
            <l-input-field
                :input-type="true"
                v-model="$v.entreprise.numero_tel.$model"
                label="Tél."
                description="Veuillez encoder le numéro de téléphone"
                placeholder="Tél ..."
                type="tel"
                :state="validateState($v.entreprise, 'numero_tel')"
            >
              <template #invalid-feedback>
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
              </template>
            </l-input-field>
          </b-col>
        </b-row>
        <!-- endregion -->

        <!-- region Commune -->
        <hr>
        <b-form-group
            label="Commune"
            description="Veuillez selectionner la Commune ou se trouve votre entreprise"
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
              <span>{{ option.code_postale }} - {{ option.ville }}</span>
            </template>
            <template slot="option" slot-scope="{ option }">
              <span>{{ option.code_postale }} - {{ option.ville }}</span>
            </template>
            <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
          </multiselect>
        </b-form-group>
        <!-- endregion -->

        <!-- region Rue / Numéro -->
        <b-row>
          <b-col lg="8">
            <l-input-field
                :input-type="true"
                v-model="$v.entreprise.rue.$model"
                label="Rue"
                description="Veuillez encoder la rue de l'entreprise"
                placeholder="Rue ..."
                :state="validateState($v.entreprise, 'rue')"
            >
              <template #invalid-feedback>
                <l-invalid-feedback
                    :condition="!$v.entreprise.rue.required"
                    :error-message="required"
                />
                <l-invalid-feedback
                    :condition="!$v.entreprise.rue.minLength"
                    :errorMessage="minLength($v.entreprise.rue.$params.minLength.min)"
                />
                <l-invalid-feedback
                    :condition="!$v.entreprise.rue.maxLength"
                    :errorMessage="maxLength($v.entreprise.rue.$params.maxLength.max)"
                />
              </template>
            </l-input-field>
          </b-col>

          <b-col lg="4">
            <l-input-field
                :input-type="true"
                v-model="$v.entreprise.numero.$model"
                label="Numéro"
                description="Veuillez encoder le numéro"
                placeholder="Numéro ..."
                :state="validateState($v.entreprise, 'numero')"
            >
              <template #invalid-feedback>
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
              </template>
            </l-input-field>
          </b-col>
        </b-row>
        <!-- endregion -->

        <!-- region A propos résumé -->
        <hr>
        <l-input-field
            :text-area-type="true"
            v-model="$v.entreprise.a_propos_resume.$model"
            label="À propos résumé"
            description="Veuillez encoder un petit résumé de votre entreprise"
            :state="validateState($v.entreprise, 'a_propos_resume')"
        >
          <template #invalid-feedback>
            <l-invalid-feedback
                :condition="!$v.entreprise.a_propos_resume.maxLength"
                :errorMessage="maxLength($v.entreprise.a_propos_resume.$params.maxLength.max)"
            />
          </template>
        </l-input-field>
        <!-- endregion -->

        <!-- region A propos résumé -->
        <l-input-field
            :text-area-type="true"
            v-model="$v.entreprise.a_propos_complet.$model"
            label="À propos complet"
            description="Veuillez encoder une description de vos activités"
            :state="validateState($v.entreprise, 'a_propos_complet')"
        >
          <template #invalid-feedback>
            <l-invalid-feedback
                :condition="!$v.entreprise.a_propos_complet.maxLength"
                :errorMessage="maxLength($v.entreprise.a_propos_complet.$params.maxLength.max)"
            />
          </template>
        </l-input-field>
        <!-- endregion -->

        <!-- region Web, facebook, instagram, twitter, linkedin-->
        <hr>
        <b-row>
          <b-col lg="4">
            <l-input-field
                :input-type="true"
                v-model="$v.entreprise.site_web.$model"
                label="Site web"
                description="Veuillez encoder le site web de l'entreprise"
                placeholder="https://www.exemple.be"
                type="url"
                :state="validateState($v.entreprise, 'site_web')"
            >
              <template #invalid-feedback>
                <l-invalid-feedback
                    :condition="!$v.entreprise.site_web.required"
                    :error-message="required()"
                />
                <l-invalid-feedback
                    :condition="!$v.entreprise.site_web.url"
                    :error-message="url()"
                />
              </template>
            </l-input-field>
          </b-col>

          <b-col lg="4">
            <l-input-field
                :input-type="true"
                v-model="$v.entreprise.facebook_link.$model"
                label="Facebook"
                description="Veuillez encoder le lien vers la page facebook"
                placeholder="https://www.exemple.be"
                type="url"
                :state="validateState($v.entreprise, 'facebook_link')"
            >
              <template #invalid-feedback>
                <l-invalid-feedback
                    :condition="!$v.entreprise.facebook_link.url"
                    :error-message="url()"
                />
              </template>
            </l-input-field>
          </b-col>

          <b-col lg="4">
            <l-input-field
                :input-type="true"
                v-model="$v.entreprise.instagram_link.$model"
                label="Instagram"
                description="Veuillez encoder le lien vers la page instagram"
                placeholder="https://www.exemple.be"
                type="url"
                :state="validateState($v.entreprise, 'instagram_link')"
            >
              <template #invalid-feedback>
                <l-invalid-feedback
                    :condition="!$v.entreprise.instagram_link.url"
                    :error-message="url()"
                />
              </template>
            </l-input-field>
          </b-col>

          <b-col lg="4">
            <l-input-field
                :input-type="true"
                v-model="$v.entreprise.twitter_link.$model"
                label="Twitter"
                description="Veuillez encoder le lien vers la page twitter"
                placeholder="https://www.exemple.be"
                type="url"
                :state="validateState($v.entreprise, 'twitter_link')"
            >
              <template #invalid-feedback>
                <l-invalid-feedback
                    :condition="!$v.entreprise.twitter_link.url"
                    :error-message="url()"
                />
              </template>
            </l-input-field>
          </b-col>

          <b-col lg="4">
            <l-input-field
                :input-type="true"
                v-model="$v.entreprise.linkedin_link.$model"
                label="LinkedIn"
                description="Veuillez encoder le lien vers la page linkedin"
                placeholder="https://www.exemple.be"
                type="url"
                :state="validateState($v.entreprise, 'linkedin_link')"
            >
              <template #invalid-feedback>
                <l-invalid-feedback
                    :condition="!$v.entreprise.linkedin_link.url"
                    :error-message="url()"
                />
              </template>
            </l-input-field>
          </b-col>
        </b-row>
        <!-- endregion -->

        <!-- region Boutons -->
        <hr>
        <l-button-group
            :to="routes.PARAMETRES_ENTREPRISE.name"
            :submit="submit"
            :submit-status="submitStatus"
        />
        <!-- endregion -->
      </b-card-body>
    </b-card>

  </div>
</template>

<script>
import {validationMixin} from "vuelidate";
import EntrepriseModel from "@/models/entreprise.model";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";
import {multiSelectValidationMixin} from "@/mixins/multiselect_validation.mixin";
import {commonMixin} from "@/mixins/common.mixin";
import LInputField from "@/components/LInputField";
import LButtonGroup from "@/components/LButtonGroup";

export default {
  name: "VAEntrepriseUpdate",
  components: {LButtonGroup, LInputField},
  mixins: [validationMixin, validationMessageMixin, multiSelectValidationMixin, commonMixin],
  validations: {
    entreprise: EntrepriseModel.validations
  },
  data() {
    return {
      entreprise: new EntrepriseModel(),
      submitStatus: null,
      BSClass: LemkaHelpers.BSClass,
      routes: LemkaHelpers.Routes
    }
  },
  computed: {
    ...mapGetters({villes: "Villes/villes", loadingStatus: "Villes/loadingStatus", entreprises: "Entreprises/entreprises"}),
    isInvalid() {
      return this.isTouched && this.entreprise.ville.id === null
    }
  },
  methods: {
    ...mapActions({
      updateEntreprise: "Entreprises/updateEntreprise",
      loadVilles: "Villes/loadVilles",
      loadEntreprise: 'Entreprises/loadEntreprises'
    }),

    initialisation: async function () {
      if (this.villes.length === 0) {
        await this.loadVilles()
      }
      if (this.entreprises.length === 0) {
        await this.loadEntreprise()
      }
    },

    chargerEntreprise: async function () {
      this.toggleLoading()
      await this.initialisation()
      Object.assign(this.entreprise, this.$store.getters["Entreprises/entreprise"])
      this.$route.meta.value = this.entreprise.nom_societe
      this.toggleLoading()
    },

    submit: function () {
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
  },

  created() {
    this.chargerEntreprise()
  }
}
</script>

<style scoped>

</style>