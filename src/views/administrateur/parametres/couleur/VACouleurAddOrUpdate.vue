<template>
  <div class="add_update_couleur">
    <l-spinner v-if="isLoading === true"/>

    <b-card
        v-else
        :title="id !== undefined ? couleur.nom : 'Ajouter une couleur'"
        :class="BSClass.CARD_BORDERLESS_SHADOW"
    >
      <b-card-body>
        <l-input-field
            :input-type="true"
            v-model="$v.couleur.nom.$model"
            label="Couleur"
            description="Veuillez encoder la couleur"
            placeholder="exemple: Vert"
            :state="validateState($v.couleur, 'nom')"
        >
          <template #invalid-feedback>
            <invalid-feedback
                :condition="!$v.couleur.nom.required"
                :error-message="required()"
            />
            <invalid-feedback
                :condition="!$v.couleur.nom.minLength"
                :error-message="minLength($v.couleur.nom.$params.minLength.min)"
            />
            <invalid-feedback
                :condition="!$v.couleur.nom.maxLength"
                :error-message="maxLength($v.couleur.nom.$params.maxLength.max)"
            />
          </template>
        </l-input-field>

        <l-button-group
            :to="routes.PARAMETRES_COULEUR.name"
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
import CouleurModel from "@/models/mercerie/couleur.model";
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";
import {htmlTitle} from "@/utils/tools";

export default {
  name: "VACouleurAddOrUpdate",
  components: {LButtonGroup, LInputField, InvalidFeedback},
  mixins: [validationMixin, validationMessageMixin, commonMixin],
  title() {
    return htmlTitle('Couleur');
  },
  props: {
    id: {
      required: false
    }
  },
  validations: {
    couleur: CouleurModel.validations
  },
  data() {
    return {
      couleur: new CouleurModel(),
      submitStatus: null,
      BSClass: LemkaHelpers.BSClass,
      routes: LemkaHelpers.Routes
    }
  },
  computed: {
    ...mapGetters({couleurs: "Couleurs/couleurs"})
  },
  methods: {
    ...mapActions({
      loadCouleurs: "Couleurs/loadCouleurs",
      createCouleur: 'Couleurs/createCouleur',
      updateCouleur: 'Couleurs/updateCouleur'
    }),
    initialisation: async function () {
      if (this.couleurs.length === 0) {
        await this.loadCouleurs()
      }
    },
    chargerCouleur: async function() {
      await this.initialisation()
      if (this.id !== undefined) {
        Object.assign(this.couleur, await this.$store.getters["Couleurs/couleur"](this.id))
        this.$route.meta.value = this.couleur.nom
      } else {
        this.$route.meta.value = "Ajout couleur"
      }
    },
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        if (this.id !== undefined) {
          await this.updateCouleur(this.couleur.toUpdatePayload())
        } else {
          await this.createCouleur(this.couleur.toCreatePayload())
        }

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: LemkaHelpers.Routes.PARAMETRES_COULEUR.name})
        }, 500)
      }
    }
  },
  created() {
    this.chargerCouleur()
  }
}
</script>

<style scoped>

</style>