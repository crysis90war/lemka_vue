<template>
  <div v-if="$route.name === routes.mensuration.name">
    <b-card>
      <b-card-body>
        <b-button :to="{name: routes.mensuration_add.name}" variant="outline-success">{{ routes.mensuration_add.value }}</b-button>
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
import ApiService from "@/services";
import {LemkaEnums} from "@/helpers/enums.helper";

export default {
  name: "view.mensurations",
  data() {
    return {
      routes: {
        mensuration: {
          name: LemkaEnums.Routes.PARAMETRES_MENSURATION.name
        },
        mensuration_add: {
          name: LemkaEnums.Routes.PARAMETRES_MENSURATION_ADD.name,
          value: LemkaEnums.Routes.PARAMETRES_MENSURATION_ADD.value
        }
      },
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
      ApiService.MensurationService.getMensurationList().then(response => {
        this.items = response.data
      })
    },

    supprimerMensuration(mensurationId) {
      ApiService.MensurationService.deleteMensuration(mensurationId)
    }
  },
  created() {
    this.chargerMensurations()
  }
}
</script>

<style scoped>

</style>