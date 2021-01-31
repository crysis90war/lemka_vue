<template>
  <div>
    <b-card :title="$route.meta.value" class="my-4">
      <b-card-body>
        <b-table :items="userMensurations" :fields="fields"></b-table>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import UserApiService from "@/services/utilisateur";

export default {
  name: "ViewUserMensurations",
  data() {
    return {
      userMensurations: [],
      fields: [
        {key: 'is_main', label: '#', sortable: true},
        {key: 'titre', label: 'Titre', sortable: true},
        {key: 'actions', label: 'Actions'}
      ]
    }
  },
  methods: {
    chargerUserMensurations() {
      UserApiService.UserMensurationsService.getUserMensurationsList().then(response => {
        this.userMensurations = response.data
      })
    },
    async deleteUserMensuration(mensurationId) {
      await UserApiService.UserMensurationsService.deleteUserMensurations(mensurationId)
    }
  },
  created() {
    this.chargerUserMensurations()
  }
}
</script>

<style scoped>

</style>