<template>
  <b-card title="Ajouter un genre">
    <b-card-body>
      <b-card :class="shadow">
        <b-card-body>
          <b-form @submit.prevent="submit">
            <b-form-group id="input-groupe-genre"
                          label="Genre"
                          description="Veuillez encoder le genre"
                          label-for="input-genre">
              <b-form-input id="input-genre"
                            name="input-genre"
                            placeholder="exemple: Femme"
                            v-model="$v.genre.genre.$model"
                            :state="validateState('genre')"></b-form-input>
              <b-form-invalid-feedback>
                <b-badge pill variant="danger" v-if="!$v.genre.genre.required">
                  Ce champ est obligatoire
                </b-badge>
                <b-badge pill variant="danger" v-if="!$v.genre.genre.minLength">
                  Ce champ doit avoir au moins 3 caractères.
                </b-badge>
                <b-badge pill variant="danger" v-if="!$v.genre.genre.maxLength">Ce champ doit avoir maximum 20
                  caractères.
                </b-badge>
              </b-form-invalid-feedback>
            </b-form-group>
            <pre>{{ genre }}</pre>
            <pre class="bg-warning">{{ response }}</pre>
            <b-button variant="outline-success" type="submit" :disabled="submitStatus === 'PENDING'">Créer</b-button>
          </b-form>
        </b-card-body>
      </b-card>
    </b-card-body>
  </b-card>
</template>

<script>
import {LemkaEnums} from "@/helpers/enums.helper";
import GenreModel from "@/models/genre.model";
import {validationMixin} from "vuelidate";

export default {
  name: "ViewAdminGenreAddOrUpdate",
  mixins: validationMixin,
  props: {
    id: {
      required: false
    }
  },
  validations: {
    genre: GenreModel.validations
  },
  data() {
    return {
      genre: new GenreModel(),
      submitStatus: null,
      shadow: LemkaEnums.BSClass.CARD_BORDERLESS_SHADOW,
      response: {}
    }
  },
  methods: {
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        try {
          let response = await GenreModel.createGenre(this.genre.toCreatePayload())
          if (response.status === 201) {
            setTimeout(() => {
              this.submitStatus = 'OK'
              this.$router.push({name: LemkaEnums.Routes.PARAMETRES_GENRE.name})
            }, 500)
          }
        } catch (e) {
          console.log(e)
        }
      }
    },

    validateState(name) {
      const {$dirty, $error} = this.$v.genre[name];
      return $dirty ? !$error : null;
    },
  },
}
</script>

<style scoped>

</style>