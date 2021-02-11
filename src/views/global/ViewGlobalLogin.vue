<template>
  <b-container>
    <div class="form-container sign-in-container my-4">

      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(onSubmit)">

          <img src="../../assets/logo.png" alt="" style="max-width: 250px"/>

          <div class="social-container">
            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
          </div>

          <span>ou utilisez votre compte</span>

          <ValidationProvider name="Email" ref="email" rules="required|email" v-slot="{ errors }">
            <b-input v-model="user.email" type="email" placeholder="Email"></b-input>
            <b-badge pill variant="danger">{{ errors[0] }}</b-badge>
          </ValidationProvider>

          <ValidationProvider name="Password" ref="password" rules="required" v-slot="{ errors }">
            <b-input v-model="user.password" type="password" placeholder="Mot de passe"/>
            <b-badge pill variant="danger">{{ errors[0] }}</b-badge>
          </ValidationProvider>

          <a href="#">Mot de passe oublié ?</a>

          <button type="submit" class="btn btn-outline-success" :disabled="loading">
            <b-spinner variant="success" type="grow" small v-show="loading"></b-spinner>
            Se connecter
          </button>
        </b-form>
      </ValidationObserver>
    </div>
  </b-container>
</template>

<script>
import {LemkaEnums} from "@/helpers/enums.helper";

export default {
  name: "ViewGlobalLogin",

  data() {
    return {
      user: {
        email: null,
        password: null
      },
      loading: false,
      message: '',
    }
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },

  methods: {
    onSubmit() {
      if (this.user.email && this.user.password) {
        this.loading = true;
        this.$store.dispatch('auth/login', this.user).then(() => {
              this.$router.push({name: LemkaEnums.Routes.PROFIL_ROUTE.name});
            }, error => {
          this.loading = false
              console.log(error)
              this.message = 'Identifiants non valides, réessayez'
            }
        )
      }
    }
  },

  created() {
    if (this.loggedIn) {
      this.$router.push({name: LemkaEnums.Routes.PROFIL_ROUTE.name});
    }
  },
}
</script>

<style scoped>
h1 {
  font-weight: bold;
  margin: 0;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 1px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

.btn-grad {
  background-image: linear-gradient(to right, #834d9b 0%, #d04ed6 51%, #834d9b 100%)
}

.btn-grad {
  margin: 10px;
  text-align: center;
  text-transform: uppercase;
  background-size: 200% auto;
  color: white;
  /*box-shadow: 0 0 20px #eee;*/
  border-radius: 20px;

  border: none;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  transition: transform 80ms ease-in;
}

.btn-grad:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}

.btn-grad:active {
  transform: scale(0.95);
}

.btn-grad:focus {
  outline: none;
}

.ghost {
  background-image: none !important;
}

.btn-grad.ghost {
  background-color: transparent !important;
  border: 1px solid #ffffff;
}

form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}
</style>