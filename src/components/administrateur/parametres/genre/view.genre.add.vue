<template>
  <div>
    <h3>Ajouter un genre</h3>
    <b-form>
      <b-form-group label="Genre" description="Veuillez encoder le genre">
        <b-form-input v-model="genre.genre" placeholder="exemple: Femme"></b-form-input>
      </b-form-group>
      <p>{{genre}}</p>
      <b-button variant="outline-success" @click="ajouterGenre">Ajouter</b-button>
    </b-form>
  </div>
</template>

<script>
import AdminApiService from "@/services/administrateur";
import {AdminRouteName} from "@/helpers/enums.helper";

export default {
  name: "ViewGenreAdd",
  data() {
    return {
      genre: {
        genre: null
      }
    }
  },
  methods: {
    ajouterGenre() {
      AdminApiService.GenreService.postGenre(this.genre)
          .then(response => {
            if (response.status === 201) {
              this.$router.push({name: AdminRouteName.GENRE.name})
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