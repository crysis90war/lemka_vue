<template>
  <div class="add_update_genre">
    <l-spinner v-if="isLoading === true"/>

    <b-card
        v-else
        :title="id !== undefined ? genre.nom : 'Ajouter un genre'"
        :class="BSClass.CARD_BORDERLESS_SHADOW"
    >
      <b-card-body>
        <l-input-field
            :input-type="true"
            v-model="$v.genre.genre.$model"
            label="Genre"
            description="Veuillez encoder le genre"
            placeholder="exemple: Femme"
            :state="validateState($v.genre, 'genre')"
        >
          <template #invalid-feedback>
            <invalid-feedback
                :condition="!$v.genre.genre.required"
                :error-message="required()"
            />
            <invalid-feedback
                :condition="!$v.genre.genre.minLength"
                :error-message="minLength($v.genre.genre.$params.minLength.min)"
            />
            <invalid-feedback
                :condition="!$v.genre.genre.maxLength"
                :error-message="maxLength($v.genre.genre.$params.maxLength.max)"
            />
          </template>
        </l-input-field>

        <l-button-group
            :to="routes.PARAMETRES_GENRE.name"
            :submit="submit"
            :submit-status="submitStatus"
            :params="$route.params.id !== undefined"
        />
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import GenreModel from "@/models/genre.model";
import {validationMixin} from "vuelidate";
import LemkaHelpers from "@/helpers";
import InvalidFeedback from "@/components/LInvalidFeedback";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import {mapActions, mapGetters} from "vuex";
import LInputField from "@/components/LInputField";
import {commonMixin} from "@/mixins/common.mixin";
import LButtonGroup from "@/components/LButtonGroup";

export default {
  name: "VAGenreAddOrUpdate",
  components: {LButtonGroup, LInputField, InvalidFeedback},
  mixins: [validationMixin, validationMessageMixin, commonMixin],
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
      BSClass: LemkaHelpers.BSClass,
      routes: LemkaHelpers.Routes
    }
  },
  computed: {
    ...mapGetters({genres: "Genres/genres"})
  },
  methods: {
    ...mapActions({loadGenres: "Genres/loadGenres", createGenre: 'Genres/createGenre', updateGenre: 'Genres/updateGenre'}),
    initialisation: async function() {
      if (this.genres.length === 0) {
        await this.loadGenres()
      }
    },
    chargerGenre: async function() {
      await this.initialisation()
      if (this.$route.params.id !== undefined) {
        let genre = await this.$store.getters["Genres/genre"](parseInt(this.$route.params.id))
        if (genre !== undefined) {
          Object.assign(this.genre, await genre)
          this.$route.meta.value = this.genre.nom
        } else {
          await this.$router.push({name: this.routes.PARAMETRES_GENRE.name})
        }
      } else {
        this.$route.meta.value = "Ajout Genre"
      }
    },
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
    }
  },
  created() {
    this.chargerGenre()
  }
}
</script>

<style scoped>

</style>