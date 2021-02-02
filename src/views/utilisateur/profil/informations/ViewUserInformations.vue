<template>
  <div class="my-4">



    <b-card class="my-2" :class="bootstrap.shadow" >
      <b-button variant="outline-primary">Modifier profil</b-button>
      <b-card-body>
        <b-row>
          <b-col lg="6">
            <h2>{{user.first_name !== '' ? user.first_name : 'Prénom'}}</h2>
            <h2>{{user.last_name !== '' ? user.last_name : 'Nom'}}</h2>
            <span>@{{user.username}}</span>
            <div>
              <b-badge v-if="user.is_staff === 'True'" pill variant="success">Administrateur</b-badge>
              <b-badge v-else pill variant="primary">Utilisateur</b-badge>
            </div>
            <hr>
            <div v-if="user.email">
              <span class="mr-2"><i :class="icons.email"></i></span>
              <span>{{user.email}}</span>
            </div>
            <div v-if="user.numero_tel">
              <span class="mr-2"><i :class="icons.phone"></i></span>
              <span>{{user.numero_tel}}</span>
            </div>
            <div v-if="user.ref_genre !== null && user.ref_genre !== undefined">
              <span class="mr-2"><i :class="icons.genre"></i></span>
              <span>{{user.ref_genre.genre}}</span>
            </div>
            <hr>
            <div >
              <span><i :class="icons.adresse" class="mr-2"></i></span>
              <b-link v-if="Object.entries(adresse).length === 0" :to="{name: links.ajouterAdresseLink}" class=""><ins>Ajouter une adresse</ins></b-link>
              <b-link v-if="Object.entries(adresse).length !== 0" :to="{name: links.ajouterAdresseLink}" class=""><ins>Modifier l'adresse</ins></b-link>
            </div>

            <div v-if="Object.entries(adresse).length !== 0" class="mt-2">
              <span>{{ adresse.rue }}, {{ adresse.numero }} {{adresse.boite}}</span><br>
              <span>{{adresse.ref_ville.code_postale }} - {{adresse.ref_ville.ville}}</span><br>
              <span>{{ adresse.ref_ville.ref_pays }}</span>
            </div>

            <hr>
            <div class="mt-5">
              <span><small>Membre depuis {{user.created_at}}</small></span><br>
              <span><small>Dernière mise à jour {{user.updated_at}}</small></span>
            </div>
          </b-col>

          <b-col lg="6" fluid class="p-4 bg-secondary d-flex align-items-center justify-content-center" >
            <b-img thumbnail rounded :src="user.image" class="h-100"></b-img>
            <b-button variant="light" class="position-absolute bottom-0 start-0">Modifier photo</b-button>
          </b-col>

        </b-row>
      </b-card-body>
    </b-card>

    <pre>{{user}}</pre>
    <pre>{{adresse}}</pre>
  </div>
</template>

<script>
import UserApiService from "@/services/utilisateur";
import {LemkaEnums} from "@/helpers/enums.helper";

export default {
  name: "ViewUserInformations",
  data() {
    return {
      links: {
        ajouterAdresseLink: LemkaEnums.UserRoutes.ADRESSE_ADD.name,
      },
      bootstrap: {
        shadow: LemkaEnums.BootstrapClass.CARD_BORDERLESS_SHADOW
      },
      icons: {
        email: LemkaEnums.FontAwesomeIcons.EMAIL,
        phone: LemkaEnums.FontAwesomeIcons.PHONE,
        adresse: LemkaEnums.FontAwesomeIcons.HOME,
        genre: LemkaEnums.FontAwesomeIcons.GENRE,
      },
      user: {},
      adresse: {}
    }
  },

  methods: {
    async chargerUser() {
      let user = {}
      let genre = {}

      await UserApiService.UserService.getUserDetail().then(response => {
        user = response.data
      })

      if (user.ref_genre !== null && user.ref_genre !== undefined) {
        genre = await this.fetchGenre(user.ref_genre)
        user.ref_genre = genre
      }
      this.user = user
    },

    async fetchGenre(genreId) {
      let genre = {}
      await UserApiService.GenreService.getGenreDetail(genreId).then(response => {
        genre = response.data
      })
      return genre
    },

    async chargerAdresse() {
      let adresse = {}
      let ville = {}

      await UserApiService.AdresseService.getAdresse().then(response => {
        adresse = response.data
      })

      if (adresse.ref_ville !== null && adresse.ref_ville !== undefined) {
        ville = await this.fetchVille(adresse.ref_ville)
        adresse.ref_ville = ville
      }
      this.adresse = adresse
    },

    async fetchVille(villeId) {
      let ville = {}
      let pays = {}
      await UserApiService.VilleService.getVillesDetail(villeId).then(response => {
        ville = response.data
      })

      if (ville.ref_pays !== null && ville.ref_pays !== undefined) {
        pays = await this.fetchPays(ville.ref_pays)
        ville.ref_pays = pays
      }

      return ville;
    },

    async fetchPays(paysId) {
      let pays = {}
      await UserApiService.PaysService.getPaysDetail(paysId).then(response => {
        pays = response.data
      })
      return pays
    }
  },

  created() {
    this.chargerUser()
    this.chargerAdresse()
  }
}
</script>

<style scoped>

</style>