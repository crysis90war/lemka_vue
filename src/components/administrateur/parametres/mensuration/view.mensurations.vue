<template>
  <div v-if="$route.name === AdminRouteName.GENRE.name">
    <b-button :to="{name: AdminRouteName.GENRE_ADD.name}" variant="outline-success">Ajouter un genre</b-button>
    <b-table :items="items" :fields="fields"
             stacked="md"
             show-empty
             bordered
             table-variant="dark"
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
  </div>
  <router-view v-else></router-view>
</template>

<script>
export default {
  name: "view.mensurations",
  data() {
    return {

    }
  },
  methods: {
    supprimerMensuration(mensurationId) {
      AdminApiService.
    }
  },
}
</script>

<style scoped>

</style>