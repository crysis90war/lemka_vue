<template>
  <div>
    <b-container>
      <b-input-group class="my-1">
        <b-form-checkbox v-model="mercerie.est_publie" name="check-button" switch>
          <p v-if="mercerie.est_publie">Publier</p>
          <p v-else>En attente</p>
        </b-form-checkbox>
      </b-input-group>

      <b-form-group label="Catégorie" description="Veuillez choisir la catégorie">
        <multiselect v-model="mercerie.ref_categorie" :options="categories" :allow-empty="false"
                     label="nom" track-by="nom" placeholder="Veuillez selectionner la catégorie"
                     selectLabel="Appuyez sur enter pour selectionner" :class="{ 'invalid': isInvalid }"
                     deselectLabel="Appuyez sur enter pour retirer" @close="onTouch">
          <template slot="singleLabel" slot-scope="{ option }">
            <span>{{ option.nom }}</span>
          </template>
          <template slot="option" slot-scope="{ option }">
            <span>{{ option.nom }}</span>
          </template>
          <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
        </multiselect>
        <span class="text-danger" v-show="isInvalid"><small>Ce champ est requis</small></span>
      </b-form-group>

      <b-form-group label="Nom" description="Veuillez encoder le nom de la mercerie">
        <b-form-input v-model="$v.mercerie.nom.$model" type="text" :state="validateState('nom')"></b-form-input>
        <b-form-invalid-feedback>
          <invalid-feedback :condition="!$v.mercerie.nom.required" :error-message="required()">
          </invalid-feedback>
          <invalid-feedback :condition="!$v.mercerie.nom.minLength"
                            :error-message="minLength($v.mercerie.nom.$params.minLength.min)">
          </invalid-feedback>
          <invalid-feedback :condition="!$v.mercerie.nom.maxLength"
                            :error-message="maxLength($v.mercerie.nom.$params.maxLength.max)">
          </invalid-feedback>
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button-group>
        <b-button variant="outline-dark" @click="$router.push({name: routes.MERCERIES.name})">
          <i class="fas fa-arrow-left"></i>
        </b-button>
        <b-button :variant="id !== undefined ? 'outline-primary' : 'outline-success'" @click.prevent="submit">
          {{ id !== undefined ? 'Modifier' : 'Créer' }}
        </b-button>
        <b-button v-if="id !== undefined" variant="outline-danger">
          Supprimer
        </b-button>
      </b-button-group>
    </b-container>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import MercerieModel from "@/models/mercerie/mercerie.model";
import LemkaHelpers from "@/helpers";
import {validationMixin} from "vuelidate";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import InvalidFeedback from "@/components/LInvalidFeedback";
import {multiSelectValidationMixin} from "@/mixins/multiselect_validation.mixin";
import {htmlTitle} from "@/utils/tools";

export default {
  name: "VAMercerieAddOrUpdate",
  components: {InvalidFeedback},
  props: {
    id: {}
  },
  mixins: [validationMixin, validationMessageMixin, multiSelectValidationMixin],
  validations: {
    mercerie: MercerieModel.validations
  },
  title() {
    return htmlTitle(this.id !== undefined ? this.mercerie.nom : "Créer mercerie")
  },
  data() {
    return {
      mercerie: new MercerieModel(),
      routes: LemkaHelpers.Routes,
      submitStatus: null
    }
  },
  computed: {
    ...mapGetters({categories: 'Categories/categories'}),
    isInvalid() {
      return this.isTouched && this.mercerie.ref_categorie.id === null
    }
  },
  methods: {
    ...mapActions({
      loadCategories: 'Categories/loadCategories',
      createMercerie: 'Merceries/createMercerie',
      updateMercerie: 'Merceries/updateMercerie'
    }),
    initialisation: async function (id) {
      if (this.categories.length === 0) {
        await this.loadCategories()
      }
      if (this.id !== undefined) {
        Object.assign(this.mercerie, this.$store.getters["Merceries/mercerie"](id))
        if (this.categories.length !== 0 && this.mercerie.ref_categorie !== undefined) {
          this.mercerie.ref_categorie = this.$store.getters["Categories/categorie"](this.mercerie.ref_categorie)
        }
      }
    },
    submit: function () {
      this.$v.$touch()
      if (this.$v.$invalid || (this.isTouched === false && this.isInvalid === true)) {
        this.isTouched = true
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        if (this.id !== undefined) {
          this.updateMercerie(this.mercerie.toUpdatePayload())
        } else {
          this.createMercerie(this.mercerie.toCreatePayload())
        }

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: this.routes.MERCERIES.name})
        }, 500)
      }
    },
    validateState: function (name) {
      const {$dirty, $error} = this.$v.mercerie[name];
      return $dirty ? !$error : null;
    }
  },
  created() {
    if (this.id !== undefined) {
      this.initialisation(this.id)
    } else {
      if (this.categories.length === 0) {
        this.loadCategories()
      }
    }
  },
}
</script>

<style scoped>

</style>