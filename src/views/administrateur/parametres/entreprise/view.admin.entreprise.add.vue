<template>
  <div>
    <div class="d-flex justify-start">
      <b-button variant="light" class="mr-2" :to="{name: link}">
        <i class="fas fa-arrow-left"></i>
      </b-button>
      <h4>Ajouter entreprise</h4>
      <hr>
    </div>
    <b-card>
      <b-card-body>
        <pre>{{entreprise}}</pre>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import {LemkaEnums} from "@/helpers/enums.helper";
import authHeader from "@/configs/auth-header";
import axios from "axios";

export default {
  name: "view.admin.entreprise.add",
  data() {
    return {
      link: LemkaEnums.Routes.PARAMETRES_ENTREPRISE.name,
      entreprise: {}
    }
  },

  methods: {
    async entrepriseExist() {
      await axios.get(LemkaEnums.Endpoints.ENTREPRISE_ENDPOINT, {headers: authHeader()}).then(response => {
        this.entreprise = response.data
      })
    }
  },

  created() {
    this.entrepriseExist()
  },

  async beforeRouteEnter(to, from, next) {
    async function isValid() {
      let entreprise;
      await axios.get(LemkaEnums.Endpoints.ENTREPRISE_ENDPOINT, {headers: authHeader()}).then(response => {
        entreprise = response.data
        return entreprise.length !== 0;
      })
    }
    if (!await isValid()) {

      next();
    } else {
      next({name: LemkaEnums.Routes.PARAMETRES.name})
    }
  },
}
</script>

<style scoped>

</style>