<template>
  <b-card title="Update" :class="bootstrap.shadow">
    <b-card-body>
      <b-form @submit.prevent="submit">
        <b-form-group id="input-groupe-username"
                      label="Username"
                      description="Veuillez encoder votre nom d'utilisateur"
                      label-for="input-username">
          <b-form-input id="input-username"
                        name="input-username"
                        placeholder="Username ..."
                        type="text"
                        v-model="$v.profil.username.$model"
                        :state="validateState('username')"></b-form-input>
          <b-form-invalid-feedback>
            <span v-if="!$v.profil.username.required">Ceci est un champ obligatoire.</span><br>
            <span v-if="!$v.profil.username.minLength">Ce champ doit contenir au moins 4 caractères.</span><br>
            <span v-if="!$v.profil.username.alphaNum">Ce champ doit être alphanumérique.</span>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-row>
          <b-col>
            <b-form-group id="input-groupe-last-name"
                          label="Nom"
                          description="Veuillez encoder votre nom"
                          label-for="input-last-name">
              <b-form-input id="input-last-name"
                            name="input-last-name"
                            placeholder="Nom ..."
                            type="text"
                            v-model="$v.profil.last_name.$model"
                            :state="validateState('last_name')"></b-form-input>
              <b-form-invalid-feedback>
                <span v-if="!$v.profil.last_name.minLength">Ce champ doit contenir au moins 2 caractères.</span><br>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="input-groupe-first-name"
                          label="Prénom"
                          description="Veuillez encoder votre prénom"
                          label-for="input-first-name">
              <b-form-input id="input-first-name"
                            name="input-first-name"
                            placeholder="Prénom ..."
                            type="text"
                            v-model="$v.profil.first_name.$model"
                            :state="validateState('first_name')"></b-form-input>
              <b-form-invalid-feedback>
                <span v-if="!$v.profil.first_name.minLength">Ce champ doit contenir au moins 2 caractères.</span><br>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group id="input-groupe-numero-tel"
                      label="Numéro téléphone"
                      description="Veuillez encoder votre numéro de téléphone"
                      label-for="input-numero-tel">
          <b-form-input id="input-numero-tel"
                        name="input-numero-tel"
                        placeholder="Numero téléphone ..."
                        type="text"
                        v-model="$v.profil.numero_tel.$model"
                        :state="validateState('numero_tel')"></b-form-input>
          <b-form-invalid-feedback>
            <span v-if="!$v.profil.numero_tel.minLength">Ce champ doit contenir au moins 6 caractères.</span><br>
            <span v-if="!$v.profil.numero_tel.alphaNum">Ce champ doit être numérique.</span>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Sexe" description="Veuillez spécifier votre sexe" label-for="select-genre">
          <b-form-select id="select-genre" name="select-genre" v-model="genre" :options="genres">
            <template #first>
              <b-form-select-option :value="null" disabled>-- Veuillez selectionner votre sexe --</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>

        <b-button-group class="float-right">
          <b-button variant="outline-primary" type="submit" :disabled="submitStatus === 'PENDING'">Sauvegarder</b-button>
          <b-button variant="outline-danger" :to="{name: link}">Retour</b-button>
        </b-button-group>
      </b-form>
    </b-card-body>
  </b-card>
</template>

<script>
import {LemkaEnums} from "@/helpers/enums.helper";
import {validationMixin} from "vuelidate";
import GenreModel from "@/models/genre.model";
import ProfilModel from "@/models/profil.model";

export default {
  name: "ViewUserInformationsUpdate",
  mixins: validationMixin,
  validations: {
    profil: ProfilModel.validations
  },

  data() {
    return {
      link: LemkaEnums.Routes.INFORMATIONS.name,
      bootstrap: {
        shadow: LemkaEnums.BSClass.CARD_BORDERLESS_SHADOW
      },
      profil: new ProfilModel(),
      genre: null,
      genres: [],
      submitStatus: null
    }
  },

  methods: {
    async chargerProfil() {
      let profil = {}
      let genre = {}
      profil = await ProfilModel.fetchProfil()
      if (profil.ref_genre !== null && profil.ref_genre !== undefined) {
        genre = await GenreModel.getGenreDetail(profil.ref_genre)
        profil.ref_genre = genre
      }
      Object.assign(this.profil, profil)
      this.genre = this.profil.ref_genre.id
    },

    async chargerGenres() {
      let genres = await GenreModel.getGenreList()
      genres.forEach(item => {
        let genre = new GenreModel()
        Object.assign(genre, item)
        let object = {
          value: genre.id,
          text: genre.genre
        }
        if (object.value !== null && object.value !== undefined) {
          this.genres.push(object)
        }
      })
    },

    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        let object = new GenreModel()
        object = await GenreModel.getGenreDetail(this.genre)
        let payload = this.profil
        payload.ref_genre = object
        await ProfilModel.updateProfil(this.profil.toUpdatePayload())
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
    this.chargerProfil()
    this.chargerGenres()
  },
}
</script>

<style scoped>

</style>