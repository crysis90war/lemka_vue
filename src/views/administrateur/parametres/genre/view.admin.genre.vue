<template>
  <div v-if="$route.name === routes.genre.name">
    <b-card>
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
  </div>
  <router-view v-else></router-view>
</template>

<script>
import ApiService from "@/services";
import {LemkaEnums} from "@/helpers/enums.helper";

export default {
  name: "ViewGenre",
  data() {
    return {
      routes: {
        genre: {name: LemkaEnums.Routes.PARAMETRES_GENRE.name},
        genre_add: {name: LemkaEnums.Routes.PARAMETRES_GENRE_ADD.name, value: LemkaEnums.Routes.PARAMETRES_GENRE_ADD.value}
      },
      param: this.$route.params.param,
      items: [],
      fields: [
        {key: 'id', label: 'Id'},
        {key: 'genre', label: 'Genre', sortable: true},
        {key: 'actions', label: 'Actions'}
      ]
    }
  },

  methods: {
    async chargerGenres() {
      await ApiService.GenreService.getGenreList().then(response => {
        this.items = response.data
      })
    },

    async supprimerGenre(genreId) {
      await ApiService.GenreService.deleteGenre(genreId).then(response => {
        console.log(response)
        if (response.status === 204) {
          this.chargerGenres()
        }
      }).catch(error => {
        alert(error)
      })
    }
  },

  created() {
    this.chargerGenres()
  },

  beforeRouteUpdate(to, from, next) {
    this.param = to.params.param;
    next();
  }

}
</script>

<style scoped>

</style>