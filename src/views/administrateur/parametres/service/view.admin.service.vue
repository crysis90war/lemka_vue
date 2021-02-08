<template>
  <div v-if="$route.name === routes.service.name">
    <b-card>
      <b-card-body>
        <b-button variant="outline-success" :to="{name: routes.service_add.name}">{{ routes.service_add.value }}</b-button>
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
import ApiService from "@/services";
import {LemkaEnums} from "@/helpers/enums.helper";

export default {
  name: "view.admin.service",
  data() {
    return {
      routes: {
        service: {
          name: LemkaEnums.Routes.PARAMETRES_SERVICE.name
        },
        service_add: {
          name: LemkaEnums.Routes.PARAMETRES_SERVICE_ADD.name,
          value: LemkaEnums.Routes.PARAMETRES_SERVICE_ADD.value
        }
      },
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
      ApiService.TypeServiceService.getTypeServiceList().then(response => {
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