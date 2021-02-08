<template>
  <b-card v-if="loading === false" class="my-4" :class="bootstrap.shadow">
    <b-card-body>
      <b-row>
        <b-col lg="7">
          <h2>{{ user.first_name !== '' ? user.first_name : 'Prénom' }}</h2>
          <h2>{{ user.last_name !== '' ? user.last_name : 'Nom' }}</h2>
          <span>@{{ user.username }}</span>
          <div>
            <b-badge v-if="user.is_staff === true" pill variant="success">Administrateur</b-badge>
            <b-badge v-else pill variant="primary">Utilisateur</b-badge>
          </div>
          <hr>
          <div v-if="user.email">
            <span class="mr-2"><i :class="icons.email"></i></span>
            <span>{{ user.email }}</span>
          </div>
          <div v-if="user.numero_tel">
            <span class="mr-2"><i :class="icons.phone"></i></span>
            <span>{{ user.numero_tel }}</span>
          </div>
          <div v-if="user.ref_genre !== null && user.ref_genre !== undefined">
            <span class="mr-2"><i :class="icons.genre"></i></span>
            <span>{{ user.ref_genre.genre }}</span>
          </div>
          <hr>
          <div>
            <span><i :class="icons.adresse" class="mr-2"></i></span>
            <b-link v-if="Object.entries(adresse).length === 0" :to="{name: links.ajouterAdresseLink}" class="">
              <ins>Ajouter une adresse</ins>
            </b-link>
            <b-link v-if="Object.entries(adresse).length !== 0" :to="{name: links.modifierAdresseLink}" class="">
              <ins>Modifier l'adresse</ins>
            </b-link>
          </div>

          <div v-if="Object.entries(adresse).length !== 0" class="mt-2">
            <span>{{ adresse.rue }}, {{ adresse.numero }} {{ adresse.boite }}</span><br>
            <span>{{ adresse.ref_ville.code_postale }} - {{ adresse.ref_ville.ville }}</span><br>
            <span>{{ adresse.ref_ville.ref_pays.pays }}</span>
          </div>
          <hr>
          <b-button :to="{name: links.updateInformationsLink}" variant="outline-primary my-3">Modifier profil</b-button>

        </b-col>

        <b-col lg="5" fluid class="p-4 bg-secondary d-flex align-items-center justify-content-center">
          <b-img thumbnail rounded="" :src="user.image" class="h-100"></b-img>
          <b-button id="toggle-btn" variant="light" class="position-absolute bottom-0 start-0" @click="showModal">
            Modifier photo
          </b-button>
          <lemka-upload-modal :user="user" :multiple="true"></lemka-upload-modal>
        </b-col>

      </b-row>
      <div>
        <span><small>Membre depuis {{ user.created_at }}</small></span><br>
        <span><small>Dernière mise à jour {{ user.updated_at }}</small></span>
      </div>
    </b-card-body>
  </b-card>

  <b-card v-else>
    <b-card-body class="text-center">
      <b-spinner variant="secondary" type="grow" size="5em"></b-spinner>
    </b-card-body>
  </b-card>

</template>

<script>
import {LemkaEnums} from "@/helpers/enums.helper";
import {customConsole} from "@/helpers/functions.helper";
import UploadModal from "@/components/UploadModal";
import GenreModel from "@/models/genre.model";
import ProfilModel from "@/models/profil.model";
import AdresseModel from "@/models/adresse.model";
import VilleModel from "@/models/ville.model";
import PaysModel from "@/models/pays.model";

export default {
  name: "ViewUserInformations",
  components: {
    'lemka-upload-modal': UploadModal
  },
  data() {
    return {
      links: {
        thisRouteLink: LemkaEnums.Routes.INFORMATIONS.name,
        updateInformationsLink: LemkaEnums.Routes.INFORMATIONS_UPDATE.name,
        ajouterAdresseLink: LemkaEnums.Routes.ADRESSE_ADD.name,
        modifierAdresseLink: LemkaEnums.Routes.ADRESSE_UPDATE.name
      },
      bootstrap: {
        shadow: LemkaEnums.BSClass.CARD_BORDERLESS_SHADOW
      },
      icons: {
        email: LemkaEnums.FontAwesomeIcons.EMAIL,
        phone: LemkaEnums.FontAwesomeIcons.PHONE,
        adresse: LemkaEnums.FontAwesomeIcons.HOME,
        genre: LemkaEnums.FontAwesomeIcons.GENRE,
      },
      user: new ProfilModel(),
      adresse: new AdresseModel(),
      loading: false
    }
  },

  methods: {
    async chargerUser() {
      let user = {}
      let genre = {}
      user = await ProfilModel.fetchProfil()
      if (user.ref_genre !== null && user.ref_genre !== undefined) {
        genre = await GenreModel.fetchGenre(user.ref_genre)
        user.ref_genre = genre
      }
      Object.assign(this.user, user)
    },

    async chargerAdresse() {
      let adresse = {}
      let ville = {}
      let pays= {}
      adresse = await AdresseModel.fetchAdresse()
      if (adresse.ref_ville !== null && adresse.ref_ville !== undefined) {
        ville = await VilleModel.fetchVille(adresse.ref_ville)
        adresse.ref_ville = ville
      }
      if (ville.ref_pays !== null && ville.ref_pays !== undefined) {
        pays = await PaysModel.fetchPays(ville.ref_pays)
        ville.ref_pays = pays
      }
      Object.assign(this.adresse, adresse)
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
      } finally {
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