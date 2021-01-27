<template>
  <b-card>
    <template title>
      <div class="d-flex justify-start">
        <b-button variant="light" class="mr-2" :to="{name: AdminRouteName.UTILISATEURS.name}">
          <i class="fas fa-arrow-left"></i>
        </b-button>
        <h4>{{ user.username }}</h4>
      </div>
    </template>
    <b-card-body>

      <pre>{{ JSON.stringify(user, null, '\t') }}</pre>
    </b-card-body>
  </b-card>
</template>

<script>
import axios from "axios";
import {Endpoints, RouteNames, AdminRouteName} from "@/helpers/enums.helper";
import {handleError} from "@/helpers/functions.helper";
import authHeader from "@/services/auth-header";
import AdminApiService from "@/services/administrateur";

export default {
  name: "view.admin.users.detail",
  props: {
    username: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      AdminRouteName,
      user: {}
    }
  },
  mounted() {
    this.chargerUser(this.username)
  },
  methods: {
    async chargerUser(username) {
      try {
        let utilisateur = null
        await AdminApiService.UserService.getUserDetail(username).then(response => {
          utilisateur = response.data;
        })
        this.user = utilisateur;
      } catch (error) {
        if (error.response.data === "Pas trouvé" && error.response.status === 404) {
          window.location.href = this.$route.name
        }
        handleError(error)
      }
    }
  },
  async beforeRouteEnter(to, from, next) {
    async function isValid (param) {
      if (param !== undefined) {
        let endpoint = `${Endpoints.CHECK_USER_EXISTS_ENDPOINT}${param}/`
        const response = await axios.get(endpoint, {headers: authHeader()})
        return response.data.message
      } else {
        return false
      }
    }

    if (!await isValid(to.params.username)) {
      next({ name: RouteNames.PAGE_NOT_FOUND_ROUTE.name });
    } else {
      next();
    }
  },
}
</script>

<style scoped>

</style>