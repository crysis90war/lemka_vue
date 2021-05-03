<template>
  <div v-if="$route.name === routes.PARAMETRES_SERVICE.name">
    <b-button-group>
      <b-button variant="outline-success" size="sm" :to="{name: routes.PARAMETRES_SERVICE_ADD_OR_UPDATE.name}">
        {{ routes.PARAMETRES_SERVICE_ADD_OR_UPDATE.value }}
      </b-button>
      <b-button variant="outline-primary" size="sm" @click="loadOrRefresh">
        <i class="fas fa-sync-alt"></i>
      </b-button>
    </b-button-group>

    <b-table :items="typeServices" :fields="fields" :busy="busy"
             small show-empty hover bordered fixed stacked="md" class="text-center mt-3">

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
        <b-button variant="outline-danger" size="sm" class="mr-1" @click="deleteTypeService(data.item)">
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
import TypeServiceModel from "@/models/type_service.model";

export default {
  name: "VAServices",
  data() {
    return {
      fields: TypeServiceModel.tableFields,
      routes: LemkaHelpers.Routes
    }
  },
  computed: {
    ...mapGetters({typeServices: 'TypeServices/typeServices', busy: 'TypeServices/loadingStatus'})
  },
  methods: {
    ...mapActions({deleteTypeService: 'TypeServices/deleteTypeService'}),
    loadOrRefresh: function() {
      this.$store.dispatch('TypeServices/loadTypeServices')
    },
  },
  created() {
    if (this.typeServices.length === 0) {
      this.loadOrRefresh()
    }
  }
}
</script>

<style scoped>

</style>