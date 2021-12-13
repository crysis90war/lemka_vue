<template>
  <div class="login">
    <div class="d-flex justify-content-center">
      <div class="my-5 text-center">
        <img :src="logo" alt="" style="max-width: 250px" class="mb-4"/>

        <!-- region Email -->

        <l-input-field v-model="$v.user.email.$model" type="email" placeholder="Email ..."
                       :input-type="true" :state="validateState($v.user, 'email')">
          <template #invalid-feedback>
            <invalid-feedback :condition="!$v.user.email.required" :error-message="required()"/>
            <invalid-feedback :condition="!$v.user.email.email" :error-message="email()"/>
          </template>
        </l-input-field>

        <!-- endregion -->

        <!-- region Password -->
        <l-input-field
            :input-type="true"
            v-model="$v.user.password.$model"
            type="password"
            placeholder="Mot de passe ..."
            :state="validateState($v.user, 'password')"
        >
          <template #invalid-feedback>
            <invalid-feedback
                :condition="!$v.user.password.required"
                :error-message="required()"
            />
            <invalid-feedback
                :condition="!$v.user.password.minLength"
                :error-message="minLength($v.user.password.$params.minLength.min)"
            />
          </template>
        </l-input-field>
        <!-- endregion -->

        <router-link :to="{name: 'VGResetPassword'}">Mot de passe oublié ?</router-link>

        <div class="mt-3">
          <b-alert variant="danger" v-if="message">{{ message }}</b-alert>
          <b-button class="btn-grad" :disabled="submitStatus === 'PENDING'" @click.prevent="submit">
            <b-spinner variant="success" type="grow" class="mr-2" small v-show="submitStatus === 'PENDING'"/>
            Se connecter
          </b-button>
          <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LInputField from "@/components/LInputField";
import InvalidFeedback from "@/components/LInvalidFeedback";
import {validationMixin} from "vuelidate";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import {commonMixin} from "@/mixins/common.mixin";
import AuthModel from "@/models/user/auth.model";
import {htmlTitle} from "@/utils/tools";
import {mapActions, mapGetters} from "vuex";
import LemkaHelpers from "@/helpers";

export default {
  name: "Login",
  components: {LInputField, InvalidFeedback},
  mixins: [validationMixin, validationMessageMixin, commonMixin],
  validations: {
    user: AuthModel.loginValidations
  },
  title() {
    return htmlTitle('Login')
  },
  data() {
    return {
      user: new AuthModel(),
      submitStatus: null,
      message: null
    }
  },
  computed: {
    ...mapGetters({loggedIn: "Auth/loggedIn"}),
    logo() {
      return require('@/assets/Lemka.png')
    }
  },
  methods: {
    ...mapActions({login: "Auth/login"}),
    submit: function () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        this.login(this.user.toLoginPayload()).then(() => {
          setTimeout(() => {
            this.submitStatus = 'OK'
            this.$router.push({name: LemkaHelpers.Routes.PROFIL_ROUTE.name});
          }, 500)
        }, error => {
          this.message = error.response.data.detail
          this.submitStatus = 'ERROR'
          setTimeout(() => {
            this.submitStatus = null
            this.message = ""
          }, 5000)
        })
      }
    },
  }
}
</script>

<style scoped>

</style>