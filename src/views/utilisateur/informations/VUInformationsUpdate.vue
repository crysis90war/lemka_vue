<template>
  <div class="update_informations">
    <l-spinner v-if="isLoading === true"/>
    <b-card
        v-else
        title="Update"
        :class="`${BSClass.CARD_BORDERLESS_SHADOW} my-4`"
    >
      <b-card-body>
        <!-- region Username -->
        <l-input-field
            :input-type="true"
            v-model="$v.profil.username.$model"
            label="Username"
            description="Veuillez encoder votre nom d'utilisateur"
            placeholder="Username ..."
            :state="validateState($v.profil, 'username')"
        >
          <template #invalid-feedback>
            <l-invalid-feedback
                :condition="!$v.profil.username.required"
                :error-message="required()"
            />
            <l-invalid-feedback
                :condition="!$v.profil.username.minLength"
                :error-message="minLength($v.profil.username.$params.minLength.min)"
            />
            <l-invalid-feedback
                :condition="!$v.profil.username.maxLength"
                :error-message="minLength($v.profil.username.$params.maxLength.max)"
            />
            <l-invalid-feedback
                :condition="!$v.profil.username.alphaNum"
                :error-message="alphaNum()"
            />
          </template>
        </l-input-field>
        <!-- endregion -->
        <!-- region Nom et Prénom -->
        <b-row>
          <b-col lg="6">
            <l-input-field
                :input-type="true"
                v-model="$v.profil.last_name.$model"
                placeholder="Nom ..."
                label="Nom"
                description="Veuillez encoder votre nom"
                :state="validateState($v.profil, 'last_name')"
            >
              <template #invalid-feedback>
                <l-invalid-feedback
                    :condition="!$v.profil.last_name.minLength"
                    :error-message="minLength($v.profil.last_name.$params.minLength.min)"
                />
              </template>
            </l-input-field>
          </b-col>
          <b-col lg="6">
            <l-input-field
                :input-type="true"
                v-model="$v.profil.first_name.$model"
                placeholder="Prénom ..."
                label="Prénom"
                description="Veuillez encoder votre prénom"
                :state="validateState($v.profil, 'first_name')"
            >
              <template #invalid-feedback>
                <l-invalid-feedback
                    :condition="!$v.profil.last_name.minLength"
                    :error-message="minLength($v.profil.last_name.$params.minLength.min)"
                />
              </template>
            </l-input-field>
          </b-col>
        </b-row>
        <!-- endregion -->
        <!-- region Numéro -->
        <l-input-field
            :input-type="true"
            v-model="$v.profil.numero_tel.$model"
            placeholder="Numero téléphone ..."
            label="Numéro téléphone"
            description="Veuillez encoder votre numéro de téléphone"
            :state="validateState($v.profil, 'numero_tel')"
        >
          <template #invalid-feedback>
            <l-invalid-feedback
                :condition="!$v.profil.last_name.minLength"
                :error-message="minLength($v.profil.numero_tel.$params.minLength.min)"
            />
            <l-invalid-feedback
                :condition="!$v.profil.last_name.numeric"
                :error-message="numeric()"
            />
          </template>
        </l-input-field>
        <!-- endregion -->
        <!-- region Sexe -->
        <b-form-group
            label="Sexe"
            description="Veuillez selectionner votre sexe"
        >
          <multiselect
              v-model="profil.genre"
              :options="genres"
              :loading="genreLoading"
              :multiple="false"
              :internal-search="false"
              :clear-on-select="false"
              :close-on-select="true"
              :show-no-results="true"
              track-by="nom"
              placeholder="Veuillez encoder pour lancer la recherche..."
              open-direction="bottom"
          >
            <template slot="singleLabel" slot-scope="{ option }">
              <span>{{ option.nom }}</span>
            </template>
            <template slot="option" slot-scope="{ option }">
              <span>{{ option.nom }}</span>
            </template>
            <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
          </multiselect>
        </b-form-group>
        <!-- endregion -->
        <!-- region Buttons -->
        <l-button-group
            :to="routes.INFORMATIONS.name"
            :submit-status="submitStatus"
            :submit="submit"
            position="right"
            params=""
        />
        <!-- endregion -->
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import {validationMixin} from "vuelidate";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import ProfilModel from "@/models/profil.model";
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";
import {commonMixin} from "@/mixins/common.mixin";
import {htmlTitle} from "@/utils/tools";
import LInputField from "@/components/LInputField";
import LButtonGroup from "@/components/LButtonGroup";

export default {
  name: "VUInformationsUpdate",
  components: {LButtonGroup, LInputField},
  mixins: [validationMixin, validationMessageMixin, commonMixin],
  validations: {
    profil: ProfilModel.validations
  },
  title() {
    return htmlTitle("Modifier profil")
  },
  data() {
    return {
      routes: LemkaHelpers.Routes,
      BSClass: LemkaHelpers.BSClass,
      submitStatus: null,
      profil: new ProfilModel()
    }
  },
  computed: {
    ...mapGetters({genres: "Genres/genres", genreLoading: "Genres/loadingStatus"})
  },
  methods: {
    ...mapActions({updateProfil: "Profil/updateProfil", loadGenres: "Genres/loadGenres", loadProfil: "Profil/loadProfil"}),
    initialisation: async function () {
      if (this.genres.length === 0) {
        await this.loadGenres()
      }
    },
    chargerProfil: async function () {
      this.toggleLoading()
      await this.initialisation()
      await this.loadProfil()
      Object.assign(this.profil, this.$store.getters["Profil/profil"])
      this.toggleLoading()
    },
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        await this.updateProfil(this.profil.toUpdatePayload())

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: this.routes.INFORMATIONS.name})
        }, 500)
      }
    }
  },

  created() {
    this.chargerProfil()
  },
}
</script>

<style scoped>

</style>