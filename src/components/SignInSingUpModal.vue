<template>
  <b-container id="container">

    <div class="form-container sign-up-container">
      <b-form action="#">
        <img src="../assets/logo.png" alt="" style="max-width: 180px;"/>
        <div class="social-container">
          <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
        </div>
        <span>ou utilisez votre email pour vous inscrire</span>
        <b-input type="email" placeholder="Email" />
        <b-input type="text" placeholder="Nom public" />
        <b-input type="password" placeholder="Mot de passe" />
        <b-input type="password" placeholder="Confirmer mot de passe" />
        <b-button class="btn-grad">s'inscrire</b-button>
      </b-form>
    </div>

    <div class="form-container sign-in-container">
      <form action="#">
        <img src="../assets/logo.png" alt="" style="max-width: 180px;"/>
        <div class="social-container">
          <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
        </div>
        <span>ou utilisez votre compte</span>
        <b-input type="email" placeholder="Email" />
        <b-input type="password" placeholder="Mot de passe" />
        <a href="#">Mot de passe oublié ?</a>
        <button class="btn-grad">Se connecter</button>
      </form>
    </div>

    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Bon Retour !</h1>
          <p>Pour rester connecté avec nous, veuillez vous connecter avec vos informations personnelles</p>
          <button class="btn-grad ghost" id="signIn" @click="signInButton">se connecter</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Salut l'ami !</h1>
          <p>Entrez vos informations personnelles et commencez votre voyage avec nous</p>
          <button class="btn-grad ghost" id="signUp" @click="signUpButton">s'inscrire</button>
        </div>
      </div>
    </div>

  </b-container>
</template>

<script>
import axios from 'axios'
export default {
  name: "SignInSingUpModal",
  props: {
    text: {
      type: String,
      default: 'modal-center'
    },
    login_register: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      show: true,
      titreHTML: 'Login',
      resultats: [],
      errors: [],
      token: ''
    }
  },
  methods: {
    signUpButton() {
      const container = document.getElementById('container');
      container.classList.add('right-panel-active');
    },
    signInButton() {
      const container = document.getElementById('container');
      container.classList.remove('right-panel-active');
    },
    onSubmit(evt) {
      let data = this.form
      evt.preventDefault()
      axios.post('http://127.0.0.1:8000/auth/login/', data)
          .then(response => {
            this.resultats.push(response.data)
            this.token = response.data
          })
          .catch(error => {this.errors = error; this.token = error})
    },
    onReset(evt) {
      evt.preventDefault()
      this.form.email = ''
      this.form.password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
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
  letter-spacing: 0.5px;
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

/*button {*/
/*  border-radius: 20px;*/
/*  border: 1px solid #ff4b2b;*/
/*  background-color: #ff4b2b;*/
/*  color: #ffffff;*/
/*  font-size: 12px;*/
/*  font-weight: bold;*/
/*  padding: 12px 45px;*/
/*  letter-spacing: 1px;*/
/*  text-transform: uppercase;*/
/*  transition: transform 80ms ease-in;*/
/*}*/

/*button:active {*/
/*  transform: scale(0.95);*/
/*}*/

/*button:focus {*/
/*  outline: none;*/
/*}*/

/*button.ghost {*/
/*  background-color: transparent;*/
/*  border-color: #ffffff;*/
/*}*/

.btn-grad {
  background-image: linear-gradient(to right, #834d9b 0%, #d04ed6  51%, #834d9b  100%)
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
  background-image: none!important;
}

.btn-grad.ghost {
  background-color: transparent!important;
  /*border-color: #ffffff;*/
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

.container {
  background-color: #ffffff;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background-image: linear-gradient(to right, #834d9b 0%, #d04ed6  51%, #834d9b  100%);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}
</style>