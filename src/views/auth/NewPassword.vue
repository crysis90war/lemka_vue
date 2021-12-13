<template>
  <div class="register">
    <div class="d-flex justify-content-center">
      <b-card class="my-5 text-center" :class="BSClass.CARD_BORDERLESS_SHADOW">
        <b-card-body>
          <div v-if="$route.query.token_valid === 'True' && $route.query.message === 'Identifiants Valides' ">
            <img :src="logo" alt="" style="max-width: 250px;" class="mb-5"/>

            <l-input-field
                :input-type="true"
                v-model="$v.form.password.$model"
                type="password"
                label="Nouveau mot de passe"
                placeholder="Nouveau mot de passe ..."
                :state="validateState($v.form, 'password')"
            >
              <template #invalid-feedback>
                <l-invalid-feedback
                    :condition="!$v.form.password.required"
                    :error-message="required()"
                />
                <l-invalid-feedback
                    :condition="!$v.form.password.minLength"
                    :error-message="minLength($v.form.password.$params.minLength.min)"
                />
              </template>
            </l-input-field>

            <l-input-field
                :input-type="true"
                v-model="$v.form.password2.$model"
                type="password"
                placeholder="Confirmer le nouveau mot de passe ..."
                :state="validateState($v.form, 'password2')"
            >
              <template #invalid-feedback>
                <l-invalid-feedback
                    :condition="!$v.form.password2.required"
                    :error-message="required()"
                />
                <l-invalid-feedback
                    :condition="!$v.form.password2.sameAsPassword"
                    :error-message="sameAs()"
                />
              </template>
            </l-input-field>

            <div class="mt-3">
              <b-alert variant="danger" :show="message !== ''">{{ message }}</b-alert>

              <b-button class="btn-grad" :disabled="submitStatus === 'PENDING'" @click.prevent="submit">
                <b-spinner variant="lgiht" type="grow" small v-show="submitStatus === 'PENDING'"/>
                Modifier
              </b-button>
            </div>
          </div>

          <div v-else>
            <b-alert variant="danger" show>Identifiants non valide</b-alert>
          </div>
        </b-card-body>
      </b-card>

    </div>
  </div>
</template>

<script>
import LInputField from "@/components/LInputField";
import LemkaHelpers from "@/helpers";
import {htmlTitle} from "@/utils/tools";
import {commonMixin} from "@/mixins/common.mixin";
import {minLength, required, sameAs} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import ApiService from "@/services/api.service";

export default {
  name: "NewPassword",
  components: {LInputField},
  mixins: [validationMixin, validationMessageMixin, commonMixin],
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(5)
      },
      password2: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  title() {
    return htmlTitle('Nouveau mot de passe')
  },
  data() {
    let token = this.$route.query.token
    let uidb64 = this.$route.query.uidb64
    return {
      form: {
        password: "",
        password2: "",
        token: token,
        uidb64: uidb64
      },
      submitStatus: null,
      BSClass: LemkaHelpers.BSClass
    }
  },
  methods: {
    submit: function () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        ApiService.PATCHData('auth/password-reset-complete/', this.form).then(() => {
          console.log('Changement de mot de passe avec succès ...')
          setTimeout(() => {
            this.submitStatus = 'OK'
            this.$router.push({name: "VGLogin"});
          }, 5000)
        }, error => {
          this.message = error.response.data.detail
          this.submitStatus = 'ERROR'
          setTimeout(() => {
            this.submitStatus = null
            this.message = ""
          }, 5000)
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/login";

.btn-grad {
  background-image: linear-gradient(to right, #834d9b 0%, #d04ed6 51%, #834d9b 100%);
  margin: 10px;
  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  display: inline-block;
}
</style>