<template>
  <b-card title="Ajouter un service">
    <b-card-body>
      <b-form>
        <b-form-group label="Type service" description="Veuillez encoder le type service">
          <b-form-input v-model="service.type_service" placeholder="exemple: Confection"></b-form-input>
        </b-form-group>
        <b-form-group label="Duree en minutes" description="Veuillez encoder la durée en minutes">
          <b-form-input v-model="service.duree_minute" placeholder="exemple: 30"></b-form-input>
        </b-form-group>
        <pre>{{service}}</pre>
        <pre class="bg-warning">{{response}}</pre>
        <b-button variant="outline-success" @click="ajouterService">Ajouter</b-button>
      </b-form>
    </b-card-body>
  </b-card>
</template>

<script>
import ApiService from "@/services";

export default {
  name: "view.admin.service.add",
  data() {
    return {
      service: {
        type_service: null,
        duree_minute: null
      },
      response: {}
    }
  },
  methods: {
    ajouterService() {
      ApiService.TypeServiceService.postTypeService(this.service).then(response => {
        this.response = response
      }).catch(error => {
        this.response = error
      })
    }
  },
}
</script>

<style scoped>

</style>