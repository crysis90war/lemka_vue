<template>
  <div v-if="loading === false">
    <b-row>
      <b-col lg="7">
        <h2>{{ utilisateur.first_name !== '' ? utilisateur.first_name : 'Prénom' }}</h2>
        <h2>{{ utilisateur.last_name !== '' ? utilisateur.last_name : 'Nom' }}</h2>
        <span>@{{ utilisateur.username }}</span>
        <div>
          <b-badge v-if="utilisateur.is_staff === true" pill variant="success">Administrateur</b-badge>
          <b-badge v-else pill variant="primary">Utilisateur</b-badge>
        </div>
        <hr>
        <div v-if="utilisateur.email">
          <span class="mr-2"><i :class="icons.EMAIL"></i></span>
          <span>{{ utilisateur.email }}</span>
        </div>
        <div v-if="utilisateur.numero_tel">
          <span class="mr-2"><i :class="icons.PHONE"></i></span>
          <span>{{ utilisateur.numero_tel }}</span>
        </div>
        <div v-if="utilisateur.ref_genre !== null && utilisateur.ref_genre !== undefined">
          <span class="mr-2"><i :class="icons.GENRE"></i></span>
          <span>{{ utilisateur.ref_genre.genre }}</span>
        </div>
        <hr>
        <div>
          <span><i :class="icons.HOME" class="mr-2"></i></span>
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
        <b-img thumbnail rounded="" :src="utilisateur.image" class="h-100"></b-img>
        <b-button id="toggle-btn" variant="light" class="position-absolute bottom-0 start-0" @click="showModal">
          Modifier photo
        </b-button>
        <lemka-upload-modal :user="utilisateur" :multiple="true"></lemka-upload-modal>
      </b-col>
    </b-row>

    <div>
      <span><small>Membre depuis {{ utilisateur.created_at }}</small></span><br>
      <span><small>Dernière mise à jour {{ utilisateur.updated_at }}</small></span>
    </div>
  </div>

  <b-card v-else>
    <b-card-body class="text-center">
      <b-spinner variant="secondary" type="grow" size="5em"></b-spinner>
    </b-card-body>
  </b-card>
</template>

<script>
import ApiService from "@/services";
import AdresseModel from "@/models/adresse.model";
import GenreModel from "@/models/genre.model";
import UtilisateurModel from "@/models/utilisateur.model";
import UploadModal from "@/components/UploadModal";
import LemkaHelpers from "@/helpers";

export default {
  name: "VAUserDetail",
  components: {
    'lemka-upload-modal': UploadModal
  },
  props: {
    username: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      utilisateur: new UtilisateurModel(),
      adresse: new AdresseModel(),
      loading: false,
      links: {
        thisRouteLink: LemkaHelpers.Routes.INFORMATIONS.name,
        updateInformationsLink: LemkaHelpers.Routes.INFORMATIONS_UPDATE.name,
        ajouterAdresseLink: LemkaHelpers.Routes.ADRESSE_ADD.name,
        modifierAdresseLink: LemkaHelpers.Routes.ADRESSE_UPDATE.name
      },
      BSClass: LemkaHelpers.BSClass,
      icons: LemkaHelpers.FontAwesomeIcons,
    }
  },

  methods: {
    async chargerUtilisateur() {
      let utilisateur = {}
      let genre = {}
      utilisateur = await UtilisateurModel.getUtilisateurDetail(this.username)
      if (utilisateur.ref_genre !== null && utilisateur.ref_genre !== undefined) {
        genre = await GenreModel.fetchGenreById(utilisateur.ref_genre)
        utilisateur.ref_genre = genre
      }
      if (utilisateur) {
        Object.assign(this.adresse, await AdresseModel.getAdresseByUsername(this.username))
      }
      Object.assign(this.utilisateur, utilisateur)
    },

    showModal() {
      this.$bvModal.show('image-modal')
    },
  },

  created() {
    this.chargerUtilisateur(this.username)
  },

  async beforeRouteEnter(to, from, next) {
    async function isValid (param) {
      if (param !== undefined) {
        return await ApiService.UtilisateurService.checkUser(param)
      } else {
        return false
      }
    }

    if (!await isValid(to.params.username)) {
      next({ name: LemkaHelpers.Routes.PAGE_NOT_FOUND_ROUTE.name });
    } else {
      next();
    }
  },
}
</script>

<style scoped>

</style>