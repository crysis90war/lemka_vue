<template>
  <div>
    <div class="d-flex justify-start">
      <b-button variant="light" class="mr-2" :to="{name: AdminRouteName.ENTREPRISE.name}">
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
import {AdminRouteName, Endpoints} from "@/helpers/enums.helper";
import authHeader from "@/services/auth-header";
import axios from "axios";

export default {
  name: "view.admin.entreprise.add",
  data() {
    return {
      AdminRouteName,
      entreprise: {}
    }
  },
  mounted() {
    this.entrepriseExist()
  },
  methods: {
    entrepriseExist() {
      axios.get(Endpoints.ENTREPRISE_ENDPOINT, {headers: authHeader()}).then(response => {
        this.entreprise = response.data
      })
    }
  },
  async beforeRouteEnter(to, from, next) {
    async function isValid() {
      let entreprise;
      await axios.get(Endpoints.ENTREPRISE_ENDPOINT, {headers: authHeader()}).then(response => {
        entreprise = response.data
        return entreprise.length !== 0;
      })
    }
    if (!await isValid()) {

      next();
    } else {
      next({name: AdminRouteName.PARAMETRES.name})
    }
  },
}
</script>

<style scoped>

</style>