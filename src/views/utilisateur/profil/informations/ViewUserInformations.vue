<template>
<div>
  <pre>{{user}}</pre>
</div>
</template>

<script>
import UserApiService from "@/services/utilisateur";

export default {
  name: "ViewUserInformations",
  data() {
    return {
      user: null
    }
  },
  methods: {
    chargerUser() {
      let user = {}
      UserApiService.UserService.getUserDetail().then(response => {
        user = response.data
      })
      UserApiService.UserService.
    }
  },
  created() {
    this.chargerUser()
  }
}
</script>

<style scoped>

</style>