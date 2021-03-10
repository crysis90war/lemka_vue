<template>
  <b-card :title="id !== undefined ? 'Modifier la mensuration' : 'Ajouter une mensuration'"
          class="my-4"
          :class="BSClass.CARD_BORDERLESS_SHADOW">
    <b-card-body>
      <b-form @submit.prevent="submit">
        <b-form-group :label="userMensuration.is_main === true ? 'Principale' : 'Secondaire'"
                      description="Veuillez spécifier si la mensuration est principale ou secondaire">
          <b-form-checkbox v-model="userMensuration.is_main" switch></b-form-checkbox>
        </b-form-group>
        <b-form-group id="input-group-titre"
                      label="Titre"
                      description="Veuillez encoder le titre pour cette mensuration"
                      label-for="input-titre">
          <b-form-input id="input-titre"
                        name="input-name"
                        placeholder="Titre ..."
                        v-model="$v.userMensuration.titre.$model"
                        :state="validateState('titre')"></b-form-input>
          <b-form-invalid-feedback>
            <invalid-feedback :condition="!$v.userMensuration.titre.required"
                              :error-message="required()">
            </invalid-feedback>
            <invalid-feedback :condition="!$v.userMensuration.titre.minLength"
                              :error-message="minLength($v.userMensuration.titre.$params.minLength.min)">
            </invalid-feedback>
            <invalid-feedback :condition="!$v.userMensuration.titre.maxLength"
                              :error-message="maxLength($v.userMensuration.titre.$params.maxLength.max)">
            </invalid-feedback>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button-group>
          <b-button type="submit"
                    :variant="id !== undefined ? 'outline-primary' : 'outline-success'"
                    :disabled="submitStatus === 'PENDING'">
            {{ id !== undefined ? 'Modifier' : 'Ajouter' }}
          </b-button>
          <b-button variant="outline-danger" @click="$router.go(-1)">Retour</b-button>
        </b-button-group>
      </b-form>
    </b-card-body>
  </b-card>
</template>

<script>
import {validationMixin} from "vuelidate";
import UserMensurationModel from "@/models/userMensuration.model";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import InvalidFeedback from "@/components/InvalidFeedback";
import LemkaHelpers from "@/helpers";

export default {
  name: "ViewUserUserMensurationAddOrUpdate",
  components: {InvalidFeedback},
  props: {
    id: {
      required: false
    }
  },
  mixins: [validationMixin, validationMessageMixin],
  validations: {
    userMensuration: UserMensurationModel.validations
  },
  data() {
    return {
      userMensuration: new UserMensurationModel(),
      submitStatus: null,
      links: {
        mensurationLink: LemkaHelpers.Routes.MENSURATIONS.name
      },
      BSClass: LemkaHelpers.BSClass,
    }
  },
  methods: {
    chargerUserMensuration: async function() {
      console.log('chargement')
      Object.assign(this.userMensuration, await UserMensurationModel.fetchUserMensuration(this.id))
    },

    submit: async function() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        if (this.id !== undefined) {
          await UserMensurationModel.updateUserMensuration(this.id, this.userMensuration.toUpdatePayload())
        } else {
          await UserMensurationModel.createUserMensuration(this.userMensuration.toCreatePayload())
        }

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.go(-1)
        }, 500)
      }
    },

    validateState(name) {
      const {$dirty, $error} = this.$v.userMensuration[name]
      return $dirty ? !$error : null;
    },
  },

  created() {
    if (this.id !== undefined) {
      this.chargerUserMensuration()
    }
  }
}
</script>

<style scoped>

</style>