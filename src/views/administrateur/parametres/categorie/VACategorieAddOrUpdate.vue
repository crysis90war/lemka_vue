<template>
  <div class="add_update_categorie">
    <l-spinner v-if="isLoading === true"/>

    <b-card
        v-else
        :title="parseInt(this.$route.params.id) !== undefined ? categorie.nom : 'Ajouter une catégorie'"
        :class="BSClass.CARD_BORDERLESS_SHADOW"
    >
      <b-card-body>
        <l-input-field
            :input-type="true"
            v-model="$v.categorie.nom.$model"
            label="Catégorie"
            description="Veuillez encoder la catégorie"
            placeholder="exemple: Tissu"
            :state="validateState($v.categorie, 'nom')"
        >
          <template #invalid-feedback>
            <invalid-feedback
                :condition="!$v.categorie.nom.required"
                :error-message="required()"
            />
            <invalid-feedback
                :condition="!$v.categorie.nom.minLength"
                :error-message="minLength($v.categorie.nom.$params.minLength.min)"
            />
            <invalid-feedback
                :condition="!$v.categorie.nom.maxLength"
                :error-message="maxLength($v.categorie.nom.$params.maxLength.max)"
            />
          </template>
        </l-input-field>

        <l-button-group
            :to="routes.PARAMETRES_CATEGORIE.name"
            :submit="submit"
            :submit-status="submitStatus"
            :params="this.$route.params.id !== undefined"
        />
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import LButtonGroup from "@/components/LButtonGroup";
import LInputField from "@/components/LInputField";
import InvalidFeedback from "@/components/LInvalidFeedback";
import {validationMixin} from "vuelidate";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import {commonMixin} from "@/mixins/common.mixin";
import {htmlTitle} from "@/utils/tools";
import CategorieModel from "@/models/categorie.model";
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "VACategorieAddOrUpdate",
  components: {LButtonGroup, LInputField, InvalidFeedback},
  mixins: [validationMixin, validationMessageMixin, commonMixin],
  title() {
    return htmlTitle('Charactéristique');
  },
  props: {
    id: {
      required: false
    }
  },
  validations: {
    categorie: CategorieModel.validations
  },
  data() {
    return {
      categorie: new CategorieModel(),
      BSClass: LemkaHelpers.BSClass,
      routes: LemkaHelpers.Routes
    }
  },
  computed: {
    ...mapGetters({categories: "Categories/categories"})
  },
  methods: {
    ...mapActions({
      loadCategories: "Categories/loadCategories",
      createCategorie: "Categories/createCategorie",
      updateCategorie: "Categories/updateCategorie"
    }),
    initialisation: async function () {
      if (this.categories.length === 0) {
        await this.loadCategories()
      }
    },
    chargerCategorie: async function () {
      await this.initialisation()
      if (this.$route.params.id !== undefined) {
        let categorie = await this.$store.getters["Categories/categorie"](parseInt(this.$route.params.id))
        if (categorie !== undefined) {
          Object.assign(this.categorie, await categorie)
          this.$route.meta.value = this.categorie.nom
        } else {
          await this.$router.push({name: this.routes.PARAMETRES_CATEGORIE.name})
        }
      } else {
        this.$route.meta.value = "Ajout catégorie"
      }
    },
    submit: async function () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        if (this.id !== undefined) {
          await this.updateCategorie(this.categorie.toUpdatePayload())
        } else {
          await this.createCategorie(this.categorie.toCreatePayload())
        }

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: LemkaHelpers.Routes.PARAMETRES_CATEGORIE.name})
        }, 500)
      }
    }
  },
  created() {
    this.chargerCategorie()
  }
}
</script>

<style scoped>

</style>