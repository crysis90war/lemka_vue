<template>
  <div v-if="$route.name === AdminRouteName.MENSURATION.name">
    <b-card>
      <b-card-body>
        <b-button :to="{name: AdminRouteName.MENSURATION_ADD.name}" variant="outline-success">Ajouter une mensuration</b-button>
        <b-table :items="items" :fields="fields"
                 stacked="md"
                 show-empty
                 bordered
                 hover
                 class="mt-3">
          <template #empty>
            <div class="text-center">
              <p>Il n'y a aucun enregistrement à afficher</p>
            </div>
          </template>
          <template #cell(actions)="data">
            <b-button size="sm"
                      @click="supprimerMensuration(data.item.id)"
                      class="mr-1"
                      variant="outline-danger">
              Suprrimer
            </b-button>
          </template>
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
  name: "view.mensurations",
  data() {
    return {
      AdminRouteName,
      items: [],
      fields: [
        {key: 'id', label: 'Id'},
        {key: 'nom', label: 'Nom', sortable: true},
        {key: 'actions', label: 'Actions'}
      ]
    }
  },
  methods: {
    chargerMensurations() {
      AdminApiService.MensurationService.getMensurationList().then(response => {
        this.items = response.data
      })
    },

    supprimerMensuration(mensurationId) {
      AdminApiService.MensurationService.deleteMensuration(mensurationId)
    }
  },
  created() {
    this.chargerMensurations()
  }
}
</script>

<style scoped>

</style>