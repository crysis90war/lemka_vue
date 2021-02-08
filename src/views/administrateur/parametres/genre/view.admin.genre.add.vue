<template>
  <b-card title="Ajouter un genre">
    <b-card-body>
      <b-form>
        <b-form-group label="Genre" description="Veuillez encoder le genre">
          <b-form-input v-model="genre.genre" placeholder="exemple: Femme"></b-form-input>
        </b-form-group>
        <pre>{{ genre }}</pre>
        <pre class="bg-warning">{{ response }}</pre>
        <b-button variant="outline-success" @click="ajouterGenre">Ajouter</b-button>
      </b-form>
    </b-card-body>
  </b-card>
</template>

<script>
import ApiService from "@/services";
import {LemkaEnums} from "@/helpers/enums.helper";

export default {
  name: "ViewGenreAdd",
  data() {
    return {
      genre: {
        genre: null
      },
      response: {}
    }
  },
  methods: {
    async ajouterGenre() {
      await ApiService.GenreService.postGenre(this.genre)
          .then(response => {
            if (response.status === 201) {
              this.$router.push({name: LemkaEnums.Routes.PARAMETRES_GENRE.name})
            }
          })
          .catch(error => {
            alert(error)
          })
    }
  },
}
</script>

<style scoped>

</style>