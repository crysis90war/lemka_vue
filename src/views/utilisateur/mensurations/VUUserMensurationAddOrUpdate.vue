<template>
  <b-card
      :title="id !== undefined ? 'Modifier la mensuration' : 'Ajouter une mensuration'"
      class="my-4"
      :class="BSClass.CARD_BORDERLESS_SHADOW"
  >
    <b-card-body>
      <b-form>
        <b-form-group
            :label="userMensuration.is_main === true ? 'Principale' : 'Secondaire'"
            description="Veuillez spécifier si la mensuration est principale ou secondaire"
        >
          <b-form-checkbox
              v-model="userMensuration.is_main"
              switch
          />
        </b-form-group>
        <b-form-group
            id="input-group-titre"
            label="Titre"
            description="Veuillez encoder le titre pour cette mensuration"
            label-for="input-titre"
        >
          <b-form-input
              id="input-titre"
              name="input-name"
              placeholder="Titre ..."
              v-model="$v.userMensuration.titre.$model"
              :state="validateState('titre')"
          />
          <b-form-invalid-feedback>
            <invalid-feedback
                :condition="!$v.userMensuration.titre.required"
                :error-message="required()"
            />
            <invalid-feedback
                :condition="!$v.userMensuration.titre.minLength"
                :error-message="minLength($v.userMensuration.titre.$params.minLength.min)"
            />
            <invalid-feedback
                :condition="!$v.userMensuration.titre.maxLength"
                :error-message="maxLength($v.userMensuration.titre.$params.maxLength.max)"
            />
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button-group>
          <b-button
              variant="outline-dark"
              @click="$router.push({name: routes.USER_MENSURATIONS.name})"
          >
            <i class="fas fa-arrow-left"></i>
          </b-button>
          <b-button
              :variant="id !== undefined ? 'outline-primary' : 'outline-success'"
              :disabled="submitStatus === 'PENDING'" @click.prevent="submit"
          >
            {{ id !== undefined ? 'Modifier' : 'Ajouter' }}
          </b-button>
        </b-button-group>
      </b-form>
    </b-card-body>
  </b-card>
</template>

<script>
import {validationMixin} from "vuelidate";
import UserMensurationModel from "@/models/user_mensuration/user_mensuration.model";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import InvalidFeedback from "@/components/LInvalidFeedback";
import LemkaHelpers from "@/helpers";
import {mapActions} from "vuex";

export default {
  name: "VUUserMensurationAddOrUpdate",
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
      routes: LemkaHelpers.Routes,
      BSClass: LemkaHelpers.BSClass,
    }
  },
  methods: {
    ...mapActions({
      createUserMensuration: "UserMensurations/createUserMensuration",
      updateUserMensuration: "UserMensurations/updateUserMensuration"
    }),
    submit: function () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        if (this.id !== undefined) {
          this.updateUserMensuration(this.userMensuration.toUpdatePayload())
        } else {
          this.createUserMensuration(this.userMensuration.toCreatePayload())
        }

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: this.routes.USER_MENSURATIONS.name})
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
      Object.assign(this.userMensuration, this.$store.getters["UserMensurations/userMensuration"](this.id))
    }
  }
}
</script>

<style scoped>

</style>