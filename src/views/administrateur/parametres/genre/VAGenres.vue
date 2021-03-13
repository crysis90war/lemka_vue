<template>
  <div v-if="$route.name === routes.PARAMETRES_GENRE.name">

    <b-button :to="{name: routes.PARAMETRES_GENRE_ADD_OR_UPDATE.name}"
              variant="outline-success"
              size="sm">
      Ajouter genre
    </b-button>

    <b-table :items="genres" :fields="fields" :busy="busy"
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

      <template #cell(genre)="data">
        <b-link :to="{name: routes.PARAMETRES_GENRE_ADD_OR_UPDATE.name, params: {id: data.item.id}}">
          {{ data.item.genre }}
        </b-link>
      </template>

      <template #cell(actions)="data">
        <b-button variant="outline-danger" size="sm" class="mr-1"
                  @click="deleteGenre(data.item)">
          Suprrimer
        </b-button>
      </template>
    </b-table>
  </div>
  <router-view v-else></router-view>
</template>

<script>
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "VAGenres",
  data() {
    return {
      fields: [
        {key: 'id', label: '#'},
        {key: 'genre', label: 'Genre', sortable: true},
        {key: 'actions', label: 'Actions'}
      ],
      routes: LemkaHelpers.Routes,
      BSClass: LemkaHelpers.BSClass
    }
  },
  computed: {
    ...mapGetters({genres: 'Genres/genres', busy: 'Genres/loadingStatus'})
  },
  methods: {
    ...mapActions({deleteGenre: 'Genres/deleteGenre'})
  },
  created() {
    if (this.genres.length === 0) {
      this.$store.dispatch('Genres/loadGenres')
    }
  }
}
</script>

<style scoped>

</style>