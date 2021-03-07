<template>
  <div v-if="$route.name === routes.PARAMETRES_SERVICE.name">
    <b-button variant="outline-success" size="sm"
              :to="{name: routes.PARAMETRES_SERVICE_ADD_OR_UPDATE.name}">
      {{ routes.PARAMETRES_SERVICE_ADD_OR_UPDATE.value }}
    </b-button>

    <b-table :items="typeServices" :fields="fields" :busy="busy"
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

      <template #cell(type_service)="data">
        <b-link :to="{name: routes.PARAMETRES_SERVICE_ADD_OR_UPDATE.name, params: {id: data.item.id}}">
          {{ data.item.type_service }}
        </b-link>
      </template>

      <template #cell(actions)="data">
        <b-button variant="outline-danger" size="sm" class="mr-1"
                  @click="deleteTypeService(data.item)">
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
  name: "ViewAdminService",
  data() {
    return {
      fields: [
        {key: 'id', label: '#'},
        {key: 'type_service', label: 'Service', sortable: true},
        {key: 'duree_minute', label: 'Durée en minutes', sortable: true},
        {key: 'actions', label: 'Actions'}
      ],
      routes: LemkaHelpers.Routes
    }
  },
  computed: {
    ...mapGetters({typeServices: 'TypeServices/typeServices'}),
    ...mapGetters({busy: 'TypeServices/loadingStatus'}),
  },
  methods: {
    ...mapActions({deleteTypeService: 'TypeServices/deleteTypeService'})
  },
  created() {
    if (this.typeServices.length === 0) {
      this.$store.dispatch('TypeService/loadTypeService')
    }
  }
}
</script>

<style scoped>

</style>