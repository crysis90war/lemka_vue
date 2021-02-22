<template>
  <div v-if="$route.name === routes.genre.name">

    <b-button :to="{name: routes.PARAMETRES_GENRE_ADD_OR_UPDATE.name}"
              variant="outline-success">
      {{ routes.PARAMETRES_GENRE_ADD_OR_UPDATE.value }}
    </b-button>

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

<!--      <template #cell(genre)="data">-->
<!--        <router-link :to="{name: routes.PARAMETRES_GENRE_DETAIL.name, params: {id: data.item.id}}">-->
<!--          {{ data.item.genre }}-->
<!--        </router-link>-->
<!--      </template>-->

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
import GenreModel from "@/models/genre.model";
import LemkaHelpers from "@/helpers";

export default {
  name: "ViewAdminGenre",
  data() {
    return {
      items: [],
      fields: [
        {key: 'id', label: '#'},
        {key: 'genre', label: 'Genre', sortable: true},
        {key: 'actions', label: 'Actions'}
      ],
      routes: LemkaHelpers.Routes,
      BSClass: LemkaHelpers.BSClass,
    }
  },

  methods: {
    async chargerGenres() {
      this.items = await GenreModel.getGenreList()
    },

    async supprimerGenre(genreId) {
      try {
        let response = await GenreModel.deleteGenre(genreId)
        if (response.status === 204) {
          await this.chargerGenres()
        }
      } catch (e) {
        alert(e)
      }
    }
  },

  created() {
    this.chargerGenres()
  },
}
</script>

<style scoped>

</style>