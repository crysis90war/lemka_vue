<template>
  <b-card :class="shadow" :title="id !== undefined ? genre.genre : 'Ajouter un genre'">
    <b-card-body>
      <b-form>
        <b-form-group label="Genre" description="Veuillez encoder le genre">
          <b-form-input v-model="$v.genre.genre.$model" placeholder="exemple: Femme"
                        :state="validateState('genre')"/>
          <b-form-invalid-feedback>
            <invalid-feedback :condition="!$v.genre.genre.required"
                              :error-message="required()">
            </invalid-feedback>
            <invalid-feedback :condition="!$v.genre.genre.minLength"
                              :error-message="minLength($v.genre.genre.$params.minLength.min)">
            </invalid-feedback>
            <invalid-feedback :condition="!$v.genre.genre.maxLength"
                              :error-message="maxLength($v.genre.genre.$params.maxLength.max)">
            </invalid-feedback>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button-group>
          <b-button variant="outline-dark" @click="$router.go(-1)">
            <i class="fas fa-arrow-left"></i>
          </b-button>
          <b-button :variant="id !== undefined ? 'outline-primary' : 'outline-success'"
                    :disabled="submitStatus === 'PENDING'" @click.prevent="submit">
            {{ id !== undefined ? 'Modifier' : 'Créer' }}
          </b-button>
        </b-button-group>
      </b-form>
    </b-card-body>
  </b-card>
</template>

<script>
import GenreModel from "@/models/genre.model";
import {validationMixin} from "vuelidate";
import LemkaHelpers from "@/helpers";
import InvalidFeedback from "@/components/LInvalidFeedback";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import {mapActions} from "vuex";

export default {
  name: "VAGenreAddOrUpdate",
  components: {InvalidFeedback},
  mixins: [validationMixin, validationMessageMixin],
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
      shadow: LemkaHelpers.BSClass.CARD_BORDERLESS_SHADOW,
    }
  },
  methods: {
    ...mapActions({createGenre: 'Genres/createGenre', updateGenre: 'Genres/updateGenre'}),
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        if (this.id !== undefined) {
          await this.updateGenre(this.genre.toUpdatePayload())
        } else {
          await this.createGenre(this.genre.toCreatePayload())
        }

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: LemkaHelpers.Routes.PARAMETRES_GENRE.name})
        }, 500)
      }
    },

    validateState(name) {
      const {$dirty, $error} = this.$v.genre[name];
      return $dirty ? !$error : null;
    },
  },
  created() {
    if (this.id !== undefined) {
      Object.assign(this.genre, this.$store.getters["Genres/genre"](this.id))
    }
  }
}
</script>

<style scoped>

</style>