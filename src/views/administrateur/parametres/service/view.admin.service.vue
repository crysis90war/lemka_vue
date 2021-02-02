<template>
  <div v-if="$route.name === AdminRouteName.SERVICE.name">
    <b-card>
      <b-card-body>
        <b-button variant="outline-success" :to="{name: AdminRouteName.SERVICE_ADD.name}">Ajouter un service</b-button>
        <b-table :items="items"
                 :fields="fields"
                 stacked="md"
                 show-empty
                 bordered
                 hover
                 class="mt-3">
        </b-table>
      </b-card-body>
    </b-card>
  </div>
  <router-view v-else></router-view>
</template>

<script>
import AdminApiService from "@/services/administrateur";
import {AdminRouteName} from "@/helpers/enums.helper";

export default {
  name: "view.admin.service",
  data() {
    return {
      AdminRouteName,
      items: [],
      fields: [
        {key: 'id', label: 'Id'},
        {key: 'type_service', label: 'Service', sortable: true},
        {key: 'duree_minute', label: 'Durée en minutes', sortable: true},
        {key: 'actions', label: 'Actions'}
      ]
    }
  },
  methods: {
    chargerServices() {
      AdminApiService.TypeServiceService.getTypeServiceList().then(response => {
        this.items = response.data
      })
    },
  },
  created() {
    this.chargerServices()
  }
}
</script>

<style scoped>

</style>