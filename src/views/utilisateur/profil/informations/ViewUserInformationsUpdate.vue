<template>
  <b-card title="Update" :class="bootstrap.shadow">
    <b-card-body>
      <b-form @submit.prevent="submit">
        <b-form-group id="input-groupe-username"
                      label="Username"
                      description="Veuillez encoder votre nom d'utilisateur"
                      label-for="input-username">
          <b-form-input v-model="$v.user.username.$model"
                        name="input-username"
                        :state="validateState('username')"
                        placeholder="Username:"></b-form-input>
          <b-form-invalid-feedback>
            <span v-if="!$v.user.username.required">Ceci est un champ obligatoire.</span><br>
            <span v-if="!$v.user.username.minLength">Ce champ doit contenir au moins 4 caractères.</span><br>
            <span v-if="!$v.user.username.alphaNum">Ce champ doit être alphanumérique.</span>
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
                            type="text"
                            v-model="$v.user.last_name.$model"
                            :state="validateState('last_name')"></b-form-input>
              <b-form-invalid-feedback>
                <span v-if="!$v.user.last_name.minLength">Ce champ doit contenir au moins 2 caractères.</span><br>
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
                            type="text"
                            placeholder="Prénom"
                            v-model="$v.user.first_name.$model"
                            :state="validateState('first_name')"></b-form-input>
              <b-form-invalid-feedback>
                <span v-if="!$v.user.first_name.minLength">Ce champ doit contenir au moins 2 caractères.</span><br>
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
                        type="text"
                        placeholder="Nom"
                        v-model="$v.user.numero_tel.$model"
                        :state="validateState('numero_tel')"></b-form-input>
          <b-form-invalid-feedback>
            <span v-if="!$v.user.numero_tel.minLength">Ce champ doit contenir au moins 6 caractères.</span><br>
            <span v-if="!$v.user.numero_tel.alphaNum">Ce champ doit être numérique.</span>
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
          <b-button variant="outline-primary" type="submit" :disabled="submitStatus === 'PENDING'">Sauvegarder
          </b-button>
          <b-button variant="outline-danger" :to="{name: link}">Retour</b-button>
        </b-button-group>
      </b-form>
    </b-card-body>
  </b-card>
</template>

<script>
import {LemkaEnums} from "@/helpers/enums.helper";
import UserModel from '@/models/user.model'
import ApiService from "@/services/";
import {validationMixin} from "vuelidate";
import GenreModel from "@/models/genre.model";

export default {
  name: "ViewUserInformationsUpdate",
  data() {
    return {
      link: LemkaEnums.Routes.INFORMATIONS.name,
      bootstrap: {
        shadow: LemkaEnums.BSClass.CARD_BORDERLESS_SHADOW
      },
      user: new UserModel(),
      genre: null,
      genres: [],
      submitStatus: null
    }
  },

  methods: {
    async chargerUser() {
      let user = {}
      let genre = {}
      await ApiService.ProfilService.getProfilDetail().then(response => {
        Object.assign(user, response.data)
      })

      await ApiService.GenreService.getGenreDetail(user.ref_genre).then(response => {
        Object.assign(genre, response.data)
        user.ref_genre = genre
      })

      Object.assign(this.user, user)
      this.genre = this.user.ref_genre.id
    },

    async chargerGenres() {
      await ApiService.GenreService.getGenreList().then(response => {
        let genres = response.data
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
          console.log(this.user.ref_genre.id)

        })
      })
    },

    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        let object = new GenreModel()
        await ApiService.GenreService.getGenreDetail(this.genre).then(response => {
          Object.assign(object, response.data)
        })
        let payload = this.user
        payload.ref_genre = object
        await ApiService.ProfilService.putProfil(this.user.toUpdatePayload())
        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: this.link})
        }, 500)
      }
    },

    validateState(name) {
      const {$dirty, $error} = this.$v.user[name];
      return $dirty ? !$error : null;
    },

  },

  mixins: validationMixin,

  validations: {
    user: UserModel.validations
  },

  created() {
    this.chargerUser()
    this.chargerGenres()
  },
}
</script>

<style scoped>

</style>