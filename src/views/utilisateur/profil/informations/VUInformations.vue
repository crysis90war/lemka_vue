<template>
  <b-card v-if="loading === false" class="my-4" :class="BSClass.CARD_BORDERLESS_SHADOW">
    <b-card-body>
      <b-row>
        <b-col lg="7">
          <h2>{{ profil.first_name !== '' ? profil.first_name : 'Prénom' }}</h2>
          <h2>{{ profil.last_name !== '' ? profil.last_name : 'Nom' }}</h2>
          <span>@{{ profil.username }}</span>
          <div>
            <b-badge v-if="profil.is_staff === true" pill variant="success">Administrateur</b-badge>
            <b-badge v-else pill variant="primary">Utilisateur</b-badge>
          </div>
          <hr>
          <div v-if="profil.email">
            <span class="mr-2"><i :class="icons.EMAIL"></i></span>
            <span>{{ profil.email }}</span>
          </div>
          <div v-if="profil.numero_tel">
            <span class="mr-2"><i :class="icons.PHONE"></i></span>
            <span>{{ profil.numero_tel }}</span>
          </div>
          <div v-if="profil.ref_genre !== null && profil.ref_genre !== undefined">
            <span class="mr-2"><i :class="icons.GENRE"></i></span>
            <span>{{ profil.ref_genre.genre }}</span>
          </div>
          <hr>
          <div>
            <span><i :class="icons.HOME" class="mr-2"></i></span>
            <b-link v-if="adresse === null" :to="{name: routes.ADRESSE_ADD.name}" class="">
              <ins>Ajouter une adresse</ins>
            </b-link>
            <b-link v-if="adresse !== null" :to="{name: routes.ADRESSE_UPDATE.name}" class="">
              <ins>Modifier l'adresse</ins>
            </b-link>
          </div>

          <div v-if="adresse !== null" class="mt-2">
            <span>{{ adresse.rue }}, {{ adresse.numero }} {{ adresse.boite }}</span><br>
            <span>{{ adresse.ref_ville.code_postale }} - {{ adresse.ref_ville.ville }}</span><br>
            <span>{{ adresse.ref_ville.ref_pays.pays }}</span>
          </div>
          <hr>
          <b-button :to="{name: routes.INFORMATIONS_UPDATE.name}"
                    variant="outline-primary my-3">
            Modifier profil
          </b-button>

        </b-col>

        <b-col lg="5" fluid class="p-4 bg-secondary d-flex align-items-center justify-content-center">
          <b-img thumbnail rounded=""
                 :src="profil.image" class="h-100"></b-img>
          <b-button id="toggle-btn"
                    variant="light"
                    class="position-absolute bottom-0 start-0"
                    @click="showModal('image-modal')">
            Modifier photo
          </b-button>
          <lemka-upload-modal></lemka-upload-modal>
        </b-col>

      </b-row>
      <div>
        <span><small>Membre depuis {{ profil.created_at | localTimeStr }}</small></span><br>
        <span><small>Dernière mise à jour {{ profil.updated_at | localTimeStr }}</small></span>
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
import UploadModal from "@/components/UploadModal";
import GenreModel from "@/models/genre.model";
import ProfilModel from "@/models/profil.model";
import AdresseModel from "@/models/adresse.model";
import {localTimeStr} from "@/utils/filters";
import LemkaHelpers from "@/helpers";

export default {
  name: "VUInformations",
  components: {
    'lemka-upload-modal': UploadModal
  },
  data() {
    return {
      image: null,
      profil: new ProfilModel(),
      adresse: new AdresseModel(),
      loading: false,
      routes: LemkaHelpers.Routes,
      BSClass: LemkaHelpers.BSClass,
      icons: LemkaHelpers.FontAwesomeIcons,
    }
  },

  methods: {
    async chargerProfil() {
      let profil = {}
      let genre = {}
      profil = await ProfilModel.getProfil()
      if (profil.ref_genre !== null && profil.ref_genre !== undefined) {
        genre = await GenreModel.fetchGenreById(profil.ref_genre)
        profil.ref_genre = genre
      }
      Object.assign(this.profil, profil)
    },

    async chargerAdresse() {
      let adresse = {}
      adresse = await AdresseModel.getAdresseDetail()
      if (adresse !== null) {
        Object.assign(this.adresse, adresse)
      } else {
        this.adresse = null
      }
    },

    showModal(mondal_id) {
      this.$bvModal.show(mondal_id)
    },

    async loadData() {
      try {
        this.loading = true
        await this.chargerProfil()
        await this.chargerAdresse()
      } finally {
        this.loading = false
      }
    }
  },
  filters: {
    localTimeStr: function (value) {
      value = localTimeStr(value)
      return value
    }
  },

  created() {
    this.loadData()
  }
}
</script>

<style scoped>

</style>