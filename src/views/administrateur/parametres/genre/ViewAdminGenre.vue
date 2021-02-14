<template>
  <div v-if="$route.name === routes.genre.name">
    <b-card>
      <b-card-body>
        <b-card :class="shadow" :title="$route.meta.value">
          <b-card-body>
            <b-button :to="{name: routes.genre_add.name}" variant="outline-success">{{ routes.genre_add.value }}</b-button>

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
                          @click="supprimerGenre(data.item.id)"
                          class="mr-1"
                          variant="outline-danger">
                  Suprrimer
                </b-button>
              </template>
            </b-table>
          </b-card-body>
        </b-card>
      </b-card-body>
    </b-card>
  </div>
  <router-view v-else></router-view>
</template>

<script>
import {LemkaEnums} from "@/helpers/enums.helper";
import GenreModel from "@/models/genre.model";

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
      routes: {
        genre: {name: LemkaEnums.Routes.PARAMETRES_GENRE.name},
        genre_add: {name: LemkaEnums.Routes.PARAMETRES_GENRE_ADD.name, value: LemkaEnums.Routes.PARAMETRES_GENRE_ADD.value}
      },
      shadow: LemkaEnums.BSClass.CARD_BORDERLESS_SHADOW,
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