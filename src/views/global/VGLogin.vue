<template>
  <div class="login">
    <div class="form-container sign-in-container my-4">
      <b-form>
        <img :src="logo" alt="" style="max-width: 250px"/>
        <div class="social-container">
          <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
        </div>
        <span>ou utilisez votre compte</span>
        <b-form-group description="Veuillez encoder votre email">
          <b-input v-model="$v.user.email.$model" type="email" placeholder="Email ..."
                   :state="validateState('email')"></b-input>
          <b-form-invalid-feedback>
            <invalid-feedback :condition="!$v.user.email.required" :error-message="required()"/>
            <invalid-feedback :condition="!$v.user.email.email" :error-message="email()"/>
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group description="Veuillez encoder votre mot de passe">
          <b-input v-model="$v.user.password.$model" type="password" placeholder="Mot de passe ..."
                   :state="validateState('password')"/>
          <b-form-invalid-feedback>
            <invalid-feedback :condition="!$v.user.password.required" :error-message="required()"/>
            <invalid-feedback :condition="!$v.user.password.minLength" :error-message="minLength($v.user.password.$params.minLength.min)"/>
          </b-form-invalid-feedback>
        </b-form-group>
        <a href="#">Mot de passe oublié ?</a>
        <b-alert variant="danger" :show="message !== ''">{{ message }}</b-alert>
        <b-button variant="outline-success" :disabled="submitStatus === 'PENDING'" @click.prevent="submit">
          <b-spinner variant="success" type="grow" small v-show="submitStatus === 'PENDING'"></b-spinner>
          Se connecter
        </b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";
import {validationMixin} from "vuelidate";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import InvalidFeedback from "@/components/LInvalidFeedback";
import AuthModel from "@/models/auth.model";
import {htmlTitle} from "@/utils/tools";

export default {
  name: "VGLogin",
  components: {InvalidFeedback},
  mixins: [validationMixin, validationMessageMixin,],
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
      message: ''
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
          console.log('Connecting ...')
          setTimeout(() => {
            this.submitStatus = 'OK'
            this.$router.push({name: LemkaHelpers.Routes.PROFIL_ROUTE.name});
          }, 500)
        }, () => {
          this.message = 'Identifiants non valides, réessayez'
          this.submitStatus = 'ERROR'
          setTimeout(() => {
            this.submitStatus = null
            this.message = ""
          }, 5000)
        })
      }
    },
    validateState: function (name) {
      const {$dirty, $error} = this.$v.user[name];
      return $dirty ? !$error : null;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push({name: LemkaHelpers.Routes.PROFIL_ROUTE.name});
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/login";
</style>