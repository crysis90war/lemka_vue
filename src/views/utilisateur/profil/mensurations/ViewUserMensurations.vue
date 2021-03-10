<template>
  <div>
    <b-card :title="$route.meta.value" class="my-4" :class="BSClass.CARD_BORDERLESS_SHADOW">
      <b-card-body>

        <b-button v-if="userMensurations.length < 5"
                  variant="outline-success"
                  size="sm"
                  class="mb-3"
                  :to="{name: links.addOrUpdate}">
          Ajouter mensuration
        </b-button>

        <b-table :items="userMensurations"
                 :fields="fields"
                 :busy="isBusy"
                 show-empty
                 stacked="md">
          <template #table-busy>
            <div class="text-center text-secondary">
              <b-spinner class="align-middle mr-2"></b-spinner>
              <strong class="align-middle">Chargement...</strong>
            </div>
          </template>

          <template #empty>
            <div class="text-center my-2">
              <p>Il n'y a aucun enregistrement à afficher</p>
            </div>
          </template>

          <template #cell(is_main)="data">
            <b-badge pill v-if="data.item.is_main === true" variant="success">Pricipale</b-badge>
            <b-badge pill v-else variant="primary">Secondaire</b-badge>
          </template>

          <template #cell(titre)="data">
            <router-link :to="{name: links.detail, params: {id: data.item.id}}">
              {{ data.item.titre }}
            </router-link>
          </template>

          <template #cell(actions)="data">
            <b-button-group>
              <b-button variant="outline-primary"
                        :to="{name: links.addOrUpdate, params: {id: data.item.id}}">
                Modifier
              </b-button>
              <b-button variant="outline-danger" @click="deleteUserMensuration(data.item.id/*, data.index*/)">
                Supprimer
              </b-button>
            </b-button-group>
          </template>
        </b-table>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import UserMensurationModel from "@/models/userMensuration.model";
import LemkaHelpers from "@/helpers";

export default {
  name: "ViewUserMensurations",
  data() {
    return {
      userMensurations: [],
      fields: [
        {key: 'is_main', label: '#', sortable: true},
        {key: 'titre', label: 'Titre', sortable: true},
        {key: 'actions', label: 'Actions'}
      ],
      isBusy: false,
      links: {
        addOrUpdate: LemkaHelpers.Routes.MENSURATION_ADD_OR_UPDATE.name,
        detail: LemkaHelpers.Routes.MENSURATION_DETAIL.name,
      },
      icons: LemkaHelpers.FontAwesomeIcons,
      BSClass: LemkaHelpers.BSClass,
    }
  },

  methods: {
    async chargerUserMensurations() {
      try {
        this.toggleBusy()
        this.userMensurations = await UserMensurationModel.fetchUserMensurations()
      } finally {
        this.toggleBusy()
      }
    },

    async deleteUserMensuration(userMensurationId/*, index*/) {
      try {
        await UserMensurationModel.supprimerUserMensuration(userMensurationId)
        await this.chargerUserMensurations()
        // this.userMensurations.splice(index, 1)
      } catch (e) {
        if (e.response.status === 404) {
          window.location.reload()
        }
      }

    },
    toggleBusy() {
      this.isBusy = !this.isBusy
    }
  },

  created() {
    this.chargerUserMensurations()
  }
}
</script>

<style scoped>

</style>