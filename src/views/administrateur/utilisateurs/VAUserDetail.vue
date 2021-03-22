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

<!--        <div>-->
<!--          <span><i :class="icons.HOME" class="mr-2"></i></span>-->
<!--          <b-link v-if="adresse === null" :to="{name: routes.ADRESSE_ADD.name}" class="">-->
<!--            <ins>Ajouter une adresse</ins>-->
<!--          </b-link>-->
<!--          <b-link v-if="adresse !== null" :to="{name: routes.ADRESSE_UPDATE.name}" class="">-->
<!--            <ins>Modifier l'adresse</ins>-->
<!--          </b-link>-->
<!--        </div>-->

<!--        <div v-if="loading === false" class="mt-2">-->
<!--          <span>{{ adresse.rue }}, {{ adresse.numero }} {{ adresse.boite }}</span><br>-->
<!--          <span>{{ adresse.ref_ville.code_postale }} - {{ adresse.ref_ville.ville }}</span><br>-->
<!--          <span>{{ adresse.ref_ville.ref_pays.pays }}</span>-->
<!--        </div>-->

      </b-col>

      <b-col lg="5" fluid class="p-4 bg-secondary d-flex align-items-center justify-content-center">
        <b-img thumbnail rounded="" :src="utilisateur.image" class="h-100"></b-img>
        <b-button id="toggle-btn" variant="light" class="position-absolute bottom-0 start-0" @click="showModal('image-modal')">
          Modifier photo
        </b-button>
        <l-upload-modal :user="utilisateur" :multiple="true"></l-upload-modal>
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
import UtilisateurModel from "@/models/utilisateur.model";
import LemkaHelpers from "@/helpers";
import {fonctions} from "@/mixins/functions.mixin";

export default {
  name: "VAUserDetail",
  props: {
    username: {
      required: true
    },
  },
  mixins: [fonctions],
  data() {
    return {
      utilisateur: new UtilisateurModel(),
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
    initialisation: async function() {
      this.toggleLoading()
      await this.$store.dispatch("Genres/loadGenres")
      let utilisateur = this.$store.getters["Utilisateurs/utilisateur"](this.username)
      utilisateur.ref_genre = this.$store.getters["Genres/genre"](utilisateur.ref_genre)
      Object.assign(this.utilisateur, utilisateur)
      this.toggleLoading()
    }
  },

  created() {
    this.initialisation()
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      const index = vm.$store.getters["Utilisateurs/utilisateurs"].findIndex(item => item.username === to.params.username)
      if (index !== -1) {
        next();
      } else {
        next({name: LemkaHelpers.Routes.UTILISATEURS.name});
      }
    })

    // if (!await isValid(to.params.username)) {
    //   next({name: LemkaHelpers.Routes.PAGE_NOT_FOUND_ROUTE.name});
    // } else {
    //   next();
    // }
    //
    // function isValid(param) {
    //   if (param !== undefined) {
    //     const index = this.$store.getters["Utilisateurs/utilisateurs"].findIndex(item => item.username === param)
    //     return index !== -1;
    //   } else {
    //     return false
    //   }
    // }
  },
}
</script>

<style scoped>

</style>