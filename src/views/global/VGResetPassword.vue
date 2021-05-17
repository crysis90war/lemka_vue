<template>
  <div class="mot-de-passe-oublie">
    <b-container>
      <div class="d-flex justify-content-center">
        <div class="w-50 text-center my-5">
          <img width="250" :src="require('@/assets/Lemka.png')" title="logo" alt="logo" class="mb-4">
          <h3>Mot de passe oublié</h3>
          <hr class="text-center w-50 my-4">
          <p>
            Nous ne pouvons pas simplement vous envoyer votre ancien mot de passe.
            Un lien unique pour réinitialiser votre mot de passe sera généré pour vous.
            Pour réinitialiser votre mot de passe, encodez votre email et suivez les instructions
          </p>
          <l-input-field
              :input-type="true"
              v-model="$v.form.email.$model"
              placeholder="Email"
              type="email"
              :state="validateState($v.form, 'email')"
          >
            <template #invalid-feedback>
              <l-invalid-feedback
                  :condition="!$v.form.email.required"
                  :error-message="required()"
              />
              <l-invalid-feedback
                  :condition="!$v.form.email.email"
                  :error-message="email()"
              />
            </template>
          </l-input-field>
          <b-button variant="outline-success" class="rounded-right">Réinisialiser</b-button>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import {email, required} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";
import {commonMixin} from "@/mixins/common.mixin";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import LInputField from "@/components/LInputField";

export default {
  name: "VGResetPassword",
  components: {LInputField},
  mixins: [validationMixin, commonMixin, validationMessageMixin],
  validations: {
    form: {
      email: {
        required,
        email
      }
    }
  },
  data() {
    return {
      form: {
        email: ""
      }
    }
  },

}
</script>

<style scoped lang="scss">

</style>