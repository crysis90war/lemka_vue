<template>
  <div class="register-succes">
    <b-container>
      <div class="text-center my-5">
        <h3>Votre compte a été créé avec succès</h3>
        <p>Veuillez ouvrir votre boite mail pour activer votre compte!</p>
      </div>
    </b-container>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import LemkaHelpers from "@/helpers";

export default {
  name: "VGRegisterSuccess",
  data() {
    return {
      routes: LemkaHelpers.Routes
    }
  },
  props: {
    fromRegister: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({loggedId: "Auth/loggedIn"})
  },
  created() {
    if (this.loggedId) {
      this.$router.push({name: this.routes.PROFIL_ROUTE.name})
    }
    if (this.fromRegister === false) {
      this.$router.push({name: this.routes.REGISTER_ROUTE.name})
    }
  }
}
</script>

<style scoped>

</style>