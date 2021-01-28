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
                  @click="supprimerGenre(data.item.id)"
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
import AdminApiService from "@/services/administrateur";
import {AdminRouteName} from "@/helpers/enums.helper";

export default {
  name: "ViewGenre",
  data() {
    return {
      AdminRouteName,
      param: this.$route.params.param,
      items: [],
      fields: [
        {key: 'id', label: 'Id'},
        {key: 'genre', label: 'Genre', sortable: true},
        {key: 'actions', label: 'Actions'}
      ]
    }
  },
  created() {
    this.chargerGenres()
  },
  methods: {
    chargerGenres() {
      AdminApiService.GenreService.getGenreList().then(response => {
        this.items = response.data
      })
    },
    supprimerGenre(genreId) {
      AdminApiService.GenreService.deleteGenre(genreId).then(response => {
        console.log(response)
        if (response.status === 204) {
          this.chargerGenres()
        }
      }).catch(error => {
        alert(error)
      })
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.param = to.params.param;
    next();
  }

}
</script>

<style scoped>

</style>