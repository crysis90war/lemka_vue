<template>
  <div class="register">
    <div class="d-flex justify-content-center">
      <div class="my-5 text-center">
        <img :src="logo" alt="" style="max-width: 250px;" class="mb-5"/>

        <!-- region Email -->
        <l-input-field
            :input-type="true"
            v-model="$v.user.email.$model"
            type="email"
            placeholder="Email ..."
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

        <!-- region Username -->
        <l-input-field
            :input-type="true"
            v-model="$v.user.username.$model"
            placeholder="Pseudo ..."
            :state="validateState($v.user, 'username')"
        >
          <template #invalid-feedback>
            <invalid-feedback
                :condition="!$v.user.username.required"
                :error-message="required()"
            />
            <invalid-feedback
                :condition="!$v.user.username.minLength"
                :error-message="minLength($v.user.username.$params.minLength.min)"
            />
            <invalid-feedback
                :condition="!$v.user.username.maxLength"
                :error-message="maxLength($v.user.username.$params.maxLength.max)"
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

        <!-- region Password 2 -->
        <l-input-field
            :input-type="true"
            v-model="$v.user.password2.$model"
            type="password"
            placeholder="Confirmer mot de passe ..."
            :state="validateState($v.user, 'password2')"
        >
          <template #invalid-feedback>
            <invalid-feedback
                :condition="!$v.user.password2.required"
                :error-message="required()"
            />
            <invalid-feedback
                :condition="!$v.user.password2.sameAsPassword"
                :error-message="sameAs()"
            />
          </template>
        </l-input-field>
        <!-- endregion -->

        <div class="mt-3">
          <b-alert variant="danger" :show="message !== ''">{{ message }}</b-alert>

          <b-button class="btn-grad" :disabled="submitStatus === 'PENDING'" @click.prevent="submit">
            <b-spinner variant="success" type="grow" small v-show="submitStatus === 'PENDING'"/>
            S'inscrire
          </b-button>
        </div>
      </div>

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
import {htmlTitle} from "@/utils/tools";
import LInputField from "@/components/LInputField";
import {commonMixin} from "@/mixins/common.mixin";

export default {
  name: "VGRegister",
  components: {LInputField, InvalidFeedback},
  mixins: [validationMixin, validationMessageMixin, commonMixin],
  validations: {
    user: AuthModel.registerValidations
  },
  title() {
    return htmlTitle('Register')
  },
  data() {
    return {
      user: new AuthModel(),
      submitStatus: null
    }
  },
  computed: {
    ...mapGetters({loggedIn: "Auth/loggedIn"})
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
          setTimeout(() => {
            this.submitStatus = 'OK'
            this.$router.push({name: "VGRegisterSuccess", params: {fromRegister: true}});
          }, 5000)
        }, () => {
          this.message = 'Identifiants non valides, réessayez'
          this.submitStatus = 'ERROR'
          setTimeout(() => {
            this.submitStatus = null
            this.message = ""
          }, 5000)
        })
      }
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