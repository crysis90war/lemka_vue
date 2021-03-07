<template>
  <b-card :title="id !== undefined ? mensuration.nom : 'Ajouter une mensuration'" :class="shadow">
    <b-card-body>
      <b-form>
        <b-form-group label="Mensuration" description="Veuillez encoder la mensuration">
          <b-form-input v-model.trim="$v.mensuration.nom.$model" placeholder="Exemple: Hauteur"
                        :state="validateState('nom')">
          </b-form-input>
          <b-form-invalid-feedback>
            <invalid-feedback :condition="!$v.mensuration.nom.required"
                              :error-message="required()">
            </invalid-feedback>
            <invalid-feedback :condition="!$v.mensuration.nom.minLength"
                              :error-message="minLength($v.mensuration.nom.$params.minLength.min)">
            </invalid-feedback>
            <invalid-feedback :condition="!$v.mensuration.nom.maxLength"
                              :error-message="maxLength($v.mensuration.nom.$params.maxLength.max)">
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
import MensurationModel from "@/models/mensuration.model";
import {mapActions} from "vuex";
import InvalidFeedback from "@/components/InvalidFeedback";
import {validationMixin} from "vuelidate";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import LemkaHelpers from "@/helpers";

export default {
  name: "ViewAdminMensurationAdd",
  components: {InvalidFeedback},
  mixins: [validationMixin, validationMessageMixin],
  validations: {
    mensuration: MensurationModel.validations
  },
  props: {
    id: {}
  },
  data() {
    return {
      mensuration: new MensurationModel(),
      submitStatus: null,
      shadow: LemkaHelpers.BSClass.CARD_BORDERLESS_SHADOW,
      routes: LemkaHelpers.Routes
    }
  },
  methods: {
    ...mapActions({
      createMensuration: "Mensurations/createMensuration",
      updateMensuration: "Mensurations/updateMensuration"
    }),
    submit: async function () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        if (this.id !== undefined) {
          await this.updateMensuration(this.mensuration.toUpdatePayload())
        } else {
          await this.createMensuration(this.mensuration.toCreatePayload())
        }

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: this.routes.PARAMETRES_MENSURATION.name})
        }, 500)
      }
    },
    validateState: function (name) {
      const {$dirty, $error} = this.$v.mensuration[name];
      return $dirty ? !$error : null;
    }
  },
  created() {
    if (this.id !== undefined) {
      Object.assign(this.mensuration, this.$store.getters["Mensurations/mensuration"](this.id))
    }
  }
}
</script>

<style scoped>

</style>