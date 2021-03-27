<template>
  <div class="update_informations">

    <b-card v-if="loading === false" title="Update" :class="BSClass.CARD_BORDERLESS_SHADOW">
      <b-card-body>
        <b-form @submit.prevent="submit">
          <b-form-group label="Username" description="Veuillez encoder votre nom d'utilisateur">
            <b-form-input v-model="$v.profil.username.$model"
                          placeholder="Username ..." type="text"
                          :state="validateState('username')"></b-form-input>
            <b-form-invalid-feedback>
              <l-invalid-feedback :condition="!$v.profil.username.required" :error-message="required()"/>
              <l-invalid-feedback :condition="!$v.profil.username.minLength"
                                  :error-message="minLength($v.profil.username.$params.minLength.min)"/>
              <l-invalid-feedback :condition="!$v.profil.username.maxLength"
                                  :error-message="minLength($v.profil.username.$params.maxLength.max)"/>
              <l-invalid-feedback :condition="!$v.profil.username.alphaNum" :error-message="alphaNum()"/>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-row>
            <b-col>
              <b-form-group label="Nom" description="Veuillez encoder votre nom">
                <b-form-input v-model="$v.profil.last_name.$model"
                              placeholder="Nom ..." type="text"
                              :state="validateState('last_name')"></b-form-input>
                <b-form-invalid-feedback>
                  <span v-if="!$v.profil.last_name.minLength">Ce champ doit contenir au moins 2 caractères.</span><br>
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Prénom" description="Veuillez encoder votre prénom">
                <b-form-input v-model="$v.profil.first_name.$model"
                              placeholder="Prénom ..." type="text"
                              :state="validateState('first_name')"></b-form-input>
                <b-form-invalid-feedback>
                  <span v-if="!$v.profil.first_name.minLength">Ce champ doit contenir au moins 2 caractères.</span><br>
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>

          <b-form-group label="Numéro téléphone" description="Veuillez encoder votre numéro de téléphone">
            <b-form-input v-model="$v.profil.numero_tel.$model"
                          placeholder="Numero téléphone ..." type="text"
                          :state="validateState('numero_tel')"></b-form-input>
            <b-form-invalid-feedback>
              <span v-if="!$v.profil.numero_tel.minLength">Ce champ doit contenir au moins 6 caractères.</span><br>
              <span v-if="!$v.profil.numero_tel.alphaNum">Ce champ doit être numérique.</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group label="Sexe" description="Veuillez selectionner votre sexe">
            <multiselect v-model="profil.ref_genre" :options="genres" :loading="loading"
                         :multiple="false" :searchable="true" :internal-search="false"
                         :clear-on-select="false" :close-on-select="true" :options-limit="20"
                         :max-height="600" :show-no-results="true" :allow-empty="false"
                         label="Genre" track-by="genre" placeholder="Veuillez encoder pour lancer la recherche..."
                         open-direction="bottom">
              <template slot="singleLabel" slot-scope="{ option }">
                <span>{{ option.genre }}</span>
              </template>
              <template slot="option" slot-scope="{ option }">
                <span>{{ option.genre }}</span>
              </template>
              <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
            </multiselect>
          </b-form-group>

          <b-button-group>
            <b-button variant="outline-dark" :to="{name: link}">
              <i class="fas fa-arrow-left"></i>
            </b-button>
            <b-button variant="outline-primary" type="submit" :disabled="submitStatus === 'PENDING'">Sauvegarder
            </b-button>
          </b-button-group>
        </b-form>
      </b-card-body>
    </b-card>

    <l-spinner v-else></l-spinner>
  </div>
</template>

<script>
import {validationMixin} from "vuelidate";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import ProfilModel from "@/models/profil.model";
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";
import {fonctions} from "@/mixins/functions.mixin";
import {htmlTitle} from "@/utils/tools";

export default {
  name: "VUInformationsUpdate",
  mixins: [validationMixin, validationMessageMixin, fonctions],
  validations: {
    profil: ProfilModel.validations
  },
  title() {
    return htmlTitle("Modifier profil")
  },
  data() {
    return {
      profil: new ProfilModel(),
      link: LemkaHelpers.Routes.INFORMATIONS.name,
      BSClass: LemkaHelpers.BSClass,
      // profil: new ProfilModel(),
      genre: null,
      // genres: [],
      submitStatus: null,
      loading: false
    }
  },
  computed: {
    ...mapGetters({genres: "Genres/genres"})
  },
  methods: {
    ...mapActions({updateProfil: "Profil/updateProfil"}),
    initialisation: async function () {
      this.toggleLoading()
      await this.$store.dispatch("Profil/loadProfil")
      Object.assign(this.profil, await this.$store.getters["Profil/profil"])
      await this.$store.dispatch("Genres/loadGenres")
      this.profil.ref_genre = this.$store.getters["Genres/genre"](this.profil.ref_genre)

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
          this.$router.push({name: this.link})
        }, 500)
      }
    },

    validateState(name) {
      const {$dirty, $error} = this.$v.profil[name];
      return $dirty ? !$error : null;
    },

  },

  created() {
    this.$store.dispatch("Genres/loadGenres")
    this.initialisation()
  },
}
</script>

<style scoped>

</style>