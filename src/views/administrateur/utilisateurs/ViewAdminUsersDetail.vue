<template>
  <b-card>
    <template title>
      <div class="d-flex justify-start">
        <b-button variant="light" class="mr-2" :to="{name: links.usersLink}">
          <i class="fas fa-arrow-left"></i>
        </b-button>
        <h4>{{ user.username }}</h4>
      </div>
    </template>
    <b-card-body>

      <pre>{{ user }}</pre>
    </b-card-body>
  </b-card>
</template>

<script>
import {LemkaEnums} from "@/helpers/enums.helper";
import ApiService from "@/services";

export default {
  name: "ViewAdminUsers",
  props: {
    username: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      links: {
        usersLink: LemkaEnums.Routes.UTILISATEURS.name
      },
      user: {}
    }
  },

  methods: {
    async chargerUser(username) {
      await ApiService.ProfilService.getUserDetail(username).then(response => {
        this.user = response.data;
      })
    }
  },

  created() {
    this.chargerUser(this.username)
  },

  async beforeRouteEnter(to, from, next) {
    async function isValid (param) {
      if (param !== undefined) {
        return await ApiService.ProfilService.checkUser(param)
      } else {
        return false
      }
    }

    if (!await isValid(to.params.username)) {
      next({ name: LemkaEnums.Routes.PAGE_NOT_FOUND_ROUTE.name });
    } else {
      next();
    }
  },
}
</script>

<style scoped>

</style>