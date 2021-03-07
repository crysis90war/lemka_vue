<template>
  <div v-if="$route.name === routes.PARAMETRES_MENSURATION.name">
    <b-button size="sm" variant="outline-success"
              :to="{name: routes.PARAMETRES_MENSURATION_ADD_OR_UPDATE.name}">
      {{ routes.PARAMETRES_MENSURATION_ADD_OR_UPDATE.value }}
    </b-button>
    <b-table :items="mensurations" :fields="fields" :busy="busy"
             stacked="md" small show-empty
             hover bordered fixed
             class="text-center mt-3">

      <template #table-busy>
        <div class="text-center text-secondary">
          <b-spinner small class="align-middle mr-2"></b-spinner>
          <strong class="align-middle">Chargement...</strong>
        </div>
      </template>

      <template #empty>
        <div class="text-center">
          <p>Il n'y a aucun enregistrement à afficher</p>
        </div>
      </template>

      <template #cell(nom)="data">
        <b-link :to="{name: 'ViewAdminMensurationAddOrUpdate', params: {id: data.item.id}}">
          {{ data.item.nom }}
        </b-link>
      </template>

      <template #cell(actions)="data">
        <b-button variant="outline-danger" size="sm" class="mr-1"
                  @click="deleteMensuration(data.item)">
          Suprrimer
        </b-button>
      </template>

    </b-table>
  </div>

  <router-view v-else></router-view>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import LemkaHelpers from "@/helpers";

export default {
  name: "ViewAdminMensuration",
  data() {
    return {
      fields: [
        {key: 'id', label: '#'},
        {key: 'nom', label: 'Nom', sortable: true},
        {key: 'actions', label: 'Actions'}
      ],
      routes: LemkaHelpers.Routes
    }
  },
  computed: {
    ...mapGetters({busy: 'Mensurations/loadingStatus', mensurations: 'Mensurations/mensurations'}),
  },
  methods: {
    ...mapActions({deleteMensuration: 'Mensurations/deleteMensuration'}),
  },
  created() {
    if (this.mensurations.length === 0) {
      this.$store.dispatch('Mensurations/loadMensurations')
    }
  }
}
</script>

<style scoped>

</style>