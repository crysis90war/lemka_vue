<template>
  <div class="register">
    <div class="form-container sign-in-container my-4">

      <b-form>
        <img src="@/assets/logo.png" alt="" style="max-width: 250px;"/>

        <div class="social-container">
          <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
        </div>

        <b-form-group>
          <b-input v-model="$v.user.email.$model" type="email" placeholder="Email ..."
                   :state="validateState('email')"></b-input>
          <b-form-invalid-feedback>
            <invalid-feedback :condition="!$v.user.email.required" :error-message="required()"/>
            <invalid-feedback :condition="!$v.user.email.email" :error-message="email()"/>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group>
          <b-form-input v-model="$v.user.username.$model" type="text" placeholder="Pseudo ..."
                        :state="validateState('username')"/>
          <b-form-invalid-feedback>
            <invalid-feedback :condition="!$v.user.username.required" :error-message="required()"/>
            <invalid-feedback :condition="!$v.user.username.minLength"
                              :error-message="minLength($v.user.username.$params.minLength.min)"/>
            <invalid-feedback :condition="!$v.user.username.maxLength"
                              :error-message="maxLength($v.user.username.$params.maxLength.max)"/>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group>
          <b-input v-model="$v.user.password.$model" type="password" placeholder="Mot de passe ..."
                   :state="validateState('password')"/>
          <b-form-invalid-feedback>
            <invalid-feedback :condition="!$v.user.password.required" :error-message="required()"/>
            <invalid-feedback :condition="!$v.user.password.minLength"
                              :error-message="minLength($v.user.password.$params.minLength.min)"/>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group>
          <b-input v-model="$v.user.password2.$model" type="password" placeholder="Confirmer mot de passe ..."
                   :state="validateState('password2')"/>
          <b-form-invalid-feedback>
            <invalid-feedback :condition="!$v.user.password2.required" :error-message="required()"/>
            <invalid-feedback :condition="!$v.user.password2.sameAsPassword" :error-message="sameAs()"/>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-alert variant="danger" :show="message !== ''">{{ message }}</b-alert>
        <b-button variant="outline-success" :disabled="submitStatus === 'PENDING'" @click.prevent="submit">
          <b-spinner variant="success" type="grow" small v-show="submitStatus === 'PENDING'"></b-spinner>
          S'inscrire
        </b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import AuthModel from "@/models/auth.model";
import LemkaHelpers from "@/helpers";
import InvalidFeedback from "@/components/LInvalidFeedback";
import {validationMixin} from "vuelidate";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";

export default {
  name: "VGRegister",
  components: {InvalidFeedback},
  mixins: [validationMixin, validationMessageMixin,],
  validations: {
    user: AuthModel.registerValidations
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
  },
  methods: {
    ...mapActions({register: "Auth/register"}),
    submit: function () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        this.register(this.user.toRegisterPayload()).then(() => {
          console.log('Registering ...')
          this.message = 'Compte créé avec succès, veuillez confirmer votre email !'
          setTimeout(() => {
            this.submitStatus = 'OK'
            this.$router.push({name: LemkaHelpers.Routes.LOGIN_ROUTE.name});
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
    },

    handleRegister() {
      this.$store.dispatch('auth/register', this.user).then(response => {
        this.message = response
      }, error => {
        this.message = error
      })
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