<template>
    <b-card v-if="loading === false" class="my-4" :class="bootstrap.shadow" >
      <b-card-body>
        <b-row>
          <b-col lg="7">
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
              <span>{{ adresse.ref_ville.ref_pays.pays }}</span>
            </div>
            <hr>
            <b-button :to="{name: links.updateInformationsLink}" variant="outline-primary">Modifier profil</b-button>
            <div class="mt-5">
              <span><small>Membre depuis {{user.created_at}}</small></span><br>
              <span><small>Dernière mise à jour {{user.updated_at}}</small></span>
            </div>
          </b-col>

          <b-col lg="5" fluid class="p-4 bg-secondary d-flex align-items-center justify-content-center" >
            <b-img thumbnail rounded :src="user.image" class="h-100"></b-img>
            <b-button id="toggle-btn" variant="light" class="position-absolute bottom-0 start-0" @click="showModal">Modifier photo</b-button>
            <lemka-upload-modal :user="user" :multiple="true"></lemka-upload-modal>
          </b-col>

        </b-row>
      </b-card-body>
    </b-card>

    <b-card v-else>
      <b-card-body class="text-center">
        <b-spinner variant="secondary" type="grow" size="5em"></b-spinner>
      </b-card-body>
    </b-card>

</template>

<script>
import UserApiService from "@/services/utilisateur";
import {LemkaEnums} from "@/helpers/enums.helper";
import {customConsole} from "@/helpers/functions.helper";
import UploadModal from "@/components/UploadModal";

export default {
  name: "ViewUserInformations",
  components: {
    'lemka-upload-modal': UploadModal
  },
  data() {
    return {
      links: {
        thisRouteLink: LemkaEnums.UserRoutes.INFORMATIONS.name,
        updateInformationsLink: LemkaEnums.UserRoutes.INFORMATIONS_UPDATE.name,
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
      adresse: {},
      loading: false
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
    },

    showModal() {
      this.$bvModal.show('image-modal')
    },

    async loadData() {
      try {
        this.loading = true
        await this.chargerUser()
        await this.chargerAdresse()
      } catch (e) {
        customConsole(e, 'ERROR')
      }
      finally {
        this.loading = false
      }
    }
  },

  created() {
    this.loadData()
  }
}
</script>

<style scoped>

</style>