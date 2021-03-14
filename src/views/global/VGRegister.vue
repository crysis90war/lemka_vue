<template>
  <div class="register">
      <div class="form-container sign-in-container my-4">
        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(handleRegister)">
            <img src="../../assets/logo.png" alt="" style="max-width: 250px;"/>

            <div class="social-container">
              <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
            </div>

            <span>ou utilisez votre email pour vous inscrire</span>

            <ValidationProvider name="Email" ref="email" rules="required|email" v-slot="{ errors }">
              <b-input v-model="user.email" type="email" placeholder="Email"></b-input>
              <b-badge pill variant="danger">{{ errors[0] }}</b-badge>
            </ValidationProvider>

            <ValidationProvider name="Username" ref="username" rules="required|alpha_num|min:3" v-slot="{ errors }">
              <b-input v-model="user.username" type="text" placeholder="Username"></b-input>
              <b-badge pill variant="danger">{{ errors[0] }}</b-badge>
            </ValidationProvider>

            <ValidationProvider name="Password" ref="password" rules="required" v-slot="{ errors }">
              <b-input v-model="user.password" type="password" placeholder="Mot de passe"/>
              <b-badge pill variant="danger" v-for="(error) in errors" :key="error">{{ error }}</b-badge>
            </ValidationProvider>

            <ValidationProvider name="Password2" ref="password2" rules="required" v-slot="{ errors }">
              <b-input v-model="user.password2" type="password" placeholder="Confirmer mot de passe"/>
              <b-badge pill variant="danger" v-for="(error) in errors" :key="error">{{ error }}</b-badge>
            </ValidationProvider>

            <button type="submit" class="btn btn-outline-success my-2" :disabled="loading">
              <b-spinner variant="success" type="grow" small v-show="loading"></b-spinner>
              S'inscrire
            </button>
          </b-form>
        </ValidationObserver>
      </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "VGRegister",
  data() {
    return {
      user: {
        email: null,
        username: null,
        password: null,
        password2: null
      },
      loading: false,
      message: null,
      response: {}
    }
  },
  computed: {
    ...mapGetters({loggedIn: "Auth/loggedIn"}),
  },
  methods: {
    ...mapActions({register: "Auth/register"}),
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
      this.$router.push('/profil');
    }
  }
}
</script>

<style lang="scss" scoped>

@import "src/assets/styles/login";

</style>