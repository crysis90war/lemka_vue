<template>
  <div class="add_update_caracteristique">
    <l-spinner v-if="isLoading === true"/>

    <b-card
        v-else
        :title="id !== undefined ? caracteristique.nom : 'Ajouter une caracteristique'"
        :class="BSClass.CARD_BORDERLESS_SHADOW"
    >
      <b-card-body>
        <l-input-field
            :input-type="true"
            v-model="$v.caracteristique.nom.$model"
            label="Characteristique"
            description="Veuillez encoder la characteristique"
            placeholder="exemple: Longueur"
            :state="validateState($v.caracteristique, 'nom')"
        >
          <template #invalid-feedback>
            <invalid-feedback
                :condition="!$v.caracteristique.nom.required"
                :error-message="required()"
            />
            <invalid-feedback
                :condition="!$v.caracteristique.nom.minLength"
                :error-message="minLength($v.caracteristique.nom.$params.minLength.min)"
            />
            <invalid-feedback
                :condition="!$v.caracteristique.nom.maxLength"
                :error-message="maxLength($v.caracteristique.nom.$params.maxLength.max)"
            />
          </template>
        </l-input-field>

        <l-button-group
            :to="routes.PARAMETRES_CHARACTERISTIQUE.name"
            :submit="submit"
            :submit-status="submitStatus"
            :params="id !== undefined"
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
import CaracteristiqueModel from "@/models/mercerie/caracteristique.model";
import {mapActions, mapGetters} from "vuex";
import LemkaHelpers from "@/helpers";

export default {
  name: "VACharacteristiqueAddOrUpdate",
  components: {LButtonGroup, LInputField, InvalidFeedback},
  mixins: [validationMixin, validationMessageMixin, commonMixin],
  title() {
    return htmlTitle('Characteristique');
  },
  props: {
    id: {
      required: false
    }
  },
  validations: {
    caracteristique: CaracteristiqueModel.validations
  },
  data() {
    return {
      caracteristique: new CaracteristiqueModel(),
      submitStatus: null,
      BSClass: LemkaHelpers.BSClass,
      routes: LemkaHelpers.Routes
    }
  },
  computed: {
    ...mapGetters({caracteristiques: "Characteristiques/caracteristiques"})
  },
  methods: {
    ...mapActions({
      loadCaracteristiques: "Characteristiques/loadCaracteristiques",
      createCaracteristique: "Characteristiques/createCaracteristique",
      updateCaracteristique: "Characteristiques/updateCaracteristique"
    }),
    initialisation: async function () {
      if (this.caracteristiques.length === 0) {
        await this.loadCaracteristiques()
      }
    },
    chargerCharacteristique: async function() {
      await this.initialisation()
      if (this.$route.params.id !== undefined) {
        let characteristique = await this.$store.getters["Characteristiques/caracteristique"](parseInt(this.$route.params.id))
        if (characteristique !== undefined) {
          Object.assign(this.caracteristique, await characteristique)
          this.$route.meta.value = this.caracteristique.nom
        } else {
          await this.$router.push({name: this.routes.PARAMETRES_CHARACTERISTIQUE.name})
        }
      } else {
        this.$route.meta.value = this.$t('add_characteristic')
      }
    },
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        if (this.id !== undefined) {
          await this.updateCaracteristique(this.caracteristique.toUpdatePayload())
        } else {
          await this.createCaracteristique(this.caracteristique.toCreatePayload())
        }

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: LemkaHelpers.Routes.PARAMETRES_CHARACTERISTIQUE.name})
        }, 500)
      }
    }
  },
  created() {
    this.chargerCharacteristique()
  }
}
</script>

<style scoped>

</style>