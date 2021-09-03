<template>
  <div class="login">
    <div class="d-flex justify-content-center">
      <div class="my-5 text-center">
        <img :src="logo" alt="" style="max-width: 250px"/>
        <div class="social-container">
          <!-- Connection avec Facebook a été désactivé. Pour cause de mise a jour SDK -->
          <!-- Je n'ai plus le temps de le corriger, seul Gmail est active pour le moment. -->
          <!--<b-button variant="light" class="btn-circle" @click="logInWithFacebook"><i class="fab fa-facebook-f"></i></b-button>-->
          <b-button variant="light" class="btn-circle" @click="logIn"><i class="fab fa-google-plus-g"></i></b-button>
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
              class="btn-grad"
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
          <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
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
import AuthModel from "@/models/user/auth.model";
import {htmlTitle} from "@/utils/tools";
import LInputField from "@/components/LInputField";
import {commonMixin} from "@/mixins/common.mixin";
import Google from "@/helpers/google";

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
    let apiKey = process.env.VUE_APP_GOOGLE_API_KEY;
    let clientId = process.env.VUE_APP_GOOGLE_CLIENT_ID;

    return {
      user: new AuthModel(),
      google: new Google({apiKey, clientId}),
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
  created() {
    if (this.loggedIn === true) {
      this.$router.push({name: LemkaHelpers.Routes.PROFIL_ROUTE.name});
    }
  },
  async mounted() {
    await this.google.init()
  },
  methods: {
    ...mapActions({login: "Auth/login", facebookLogin: "Auth/facebookLogin", googleLogin: "Auth/loginGoogle"}),
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

    // GOOGLE
    logIn: async function () {
      await this.google.singIn()

      let auth_response = Google.AuthResponse
      let payload = {
        "auth_token": auth_response.id_token
      }
      this.googleLogin(payload).then(() => {
        this.$router.push({name: LemkaHelpers.Routes.PROFIL_ROUTE.name})
      }, error => {
        this.message = error
      })
    },

    // FACEBOOK
    testAPI: function () { // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
      console.log('Welcome!  Fetching your information.... ');
      // eslint-disable-next-line no-undef
      FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
      });
    },

    statusChangeCallback: function (response) {  // Called with the results from FB.getLoginStatus().
      console.log('statusChangeCallback');
      console.log(response);                   // The current login status of the person.
      if (response.status === 'connected') {   // Logged into your webpage and Facebook.
        this.testAPI();
      } else {                                 // Not logged into your webpage or we are unable to tell.
        document.getElementById('status').innerHTML = 'Please log into this webpage.';
      }
    },

    checkLoginState: function () {               // Called when a person is finished with the Login Button.
      let vm = this
      // eslint-disable-next-line no-undef
      FB.getLoginStatus(function (response) {   // See the onlogin handler
        vm.statusChangeCallback(response);
      });
    },

    logInWithFacebook: async function () {
      let vm = this
      window.FB.login(function (response) {
        if (response.authResponse) {
          let payload = {
            "auth_token": response.authResponse.accessToken
          }
          vm.facebookLogin(payload).then(() => {
            console.log('Connecting with facebook ...')
            vm.$router.push({name: LemkaHelpers.Routes.PROFIL_ROUTE.name})
          }, error => {
            console.log(error)
          })
          // Now you can redirect the user or do an AJAX request to
          // a PHP script that grabs the signed request from the cookie.
        } else {
          alert("User cancelled login or did not fully authorize.");
        }
      }, {scope: 'public_profile,email'});
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/login";

.facebook {
  color: white;
  min-width: 150px;
  background-color: #000000a1;
  height: 2.5rem;
  border-radius: 2rem;
  font-weight: 400;
  font-size: 0.8rem;
}

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