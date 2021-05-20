<template>
  <div class="login">
    <div class="d-flex justify-content-center">
      <div class="my-5 text-center">
        <img :src="logo" alt="" style="max-width: 250px"/>
        <div class="social-container">
          <b-button variant="light" class="btn-circle" @click="logInWithFacebook"><i class="fab fa-facebook-f"></i></b-button>
          <b-button variant="light" class="btn-circle"><i class="fab fa-google-plus-g"></i></b-button>
        </div>
        <span>ou utilisez votre compte</span>
        <!-- region Email -->
        <l-input-field
            :input-type="true"
            v-model="$v.user.email.$model"
            placeholder="Email ..."
            type="email"
            :state="validateState($v.user, 'email')"
        >
          <template #invalid-feedback>
            <invalid-feedback
                :condition="!$v.user.email.required"
                :error-message="required()"
            />
            <invalid-feedback
                :condition="!$v.user.email.email"
                :error-message="email()"
            />
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
          <b-alert variant="danger" :show="message !== ''">{{ message }}</b-alert>
          <b-button
              variant="outline-success"
              :disabled="submitStatus === 'PENDING'"
              @click.prevent="submit"
          >
            <b-spinner
                variant="success"
                type="grow"
                class="mr-2"
                small v-show="submitStatus === 'PENDING'"
            />
            Se connecter
          </b-button>
        </div>
      </div>
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
import LInputField from "@/components/LInputField";
import {commonMixin} from "@/mixins/common.mixin";

export default {
  name: "VGLogin",
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
    ...mapActions({login: "Auth/login", facebookLogin: "Auth/facebookLogin"}),
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

    // FACEBOOK
    logInWithFacebook: async function() {
      let vm = this
      window.FB.login(function (response) {
        if (response.authResponse) {
          let payload = {
            "auth_token": response.authResponse.accessToken
          }
          vm.facebookLogin(payload).then(() => {
            console.log('Connecting with facebook ...')
            vm.$router.push({name: LemkaHelpers.Routes.PROFIL_ROUTE.name})
          })
          // Now you can redirect the user or do an AJAX request to
          // a PHP script that grabs the signed request from the cookie.
        } else {
          alert("User cancelled login or did not fully authorize.");
        }
      });
      return false;
    },
    initFacebook: async function() {
      await this.loadFacebookSDK(document, "script", "facebook-jssdk");
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: "491041752346235", //You will need to change this
          cookie: true, // This is important, it's not enabled by default
          version: "v13.0"
        });
      };
    },
    loadFacebookSDK: async function(d, s, id) {
      let js,
          fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }
  },
  created() {
    if (this.loggedIn === true) {
      this.$router.push({name: LemkaHelpers.Routes.PROFIL_ROUTE.name});
    } else {
      this.initFacebook()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/login";

.facebook{
  color:white;
  min-width: 150px;
  background-color: #000000a1;
  height: 2.5rem;
  border-radius: 2rem;
  font-weight: 400;
  font-size: 0.8rem;
}
</style>