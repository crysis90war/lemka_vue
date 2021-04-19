<template>
  <div class="informations">
    <b-card
        v-if="isLoading === false"
        class="my-4"
        :class="BSClass.CARD_BORDERLESS_SHADOW"
    >
      <b-card-body>
        <b-row>
          <b-col lg="7">
            <h2>{{ profil.first_name !== '' ? profil.first_name : 'Prénom' }}</h2>
            <h2>{{ profil.last_name !== '' ? profil.last_name : 'Nom' }}</h2>
            <span>@{{ profil.username }}</span>
            <div>
              <b-badge
                  v-if="profil.is_staff === true"
                  pill
                  variant="success"
              >Administrateur</b-badge>
              <b-badge
                  v-else
                  pill
                  variant="primary"
              >Utilisateur</b-badge>
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
            <div v-if="profil.genre !== null && profil.genre !== undefined">
              <span class="mr-2"><i :class="icons.GENRE"></i></span>
              <span>{{ profil.genre.genre }}</span>
            </div>
            <hr>
            <div>
              <span><i :class="icons.HOME" class="mr-2"></i></span>
              <b-link v-if="adresse.id === null" :to="{name: routes.ADRESSE_ADD.name}" class="">
                <ins>Ajouter une adresse</ins>
              </b-link>
              <b-link v-if="adresse.id !== null" :to="{name: routes.ADRESSE_UPDATE.name}" class="">
                <ins>Modifier l'adresse</ins>
              </b-link>
            </div>
            <div v-if="adresse.id !== null" class="mt-2">
              <span>{{ adresse.rue }}, {{ adresse.numero }} {{ adresse.boite }}</span><br>
              <span>{{ adresse.ville.code_postale }} - {{ adresse.ville.ville }}</span><br>
              <span>{{ adresse.ville.pays.pays }}</span>
            </div>
            <hr>
            <b-button :to="{name: routes.INFORMATIONS_UPDATE.name}" variant="outline-primary my-3">
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
            <l-upload-modal></l-upload-modal>
          </b-col>
        </b-row>
        <div>
          <span><small>Membre depuis {{ profil.created_at | localTimeStr }}</small></span><br>
          <span><small>Dernière mise à jour {{ profil.updated_at | localTimeStr }}</small></span>
        </div>
      </b-card-body>
    </b-card>
    <l-spinner v-else/>
  </div>
</template>

<script>
import {localTimeStr} from "@/utils/filters";
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";
import {fonctions} from "@/mixins/functions.mixin";
import {htmlTitle} from "@/utils/tools";

export default {
  name: "VUInformations",
  mixins: [fonctions],
  title() {
    return htmlTitle("Information")
  },
  data() {
    return {
      routes: LemkaHelpers.Routes,
      BSClass: LemkaHelpers.BSClass,
      icons: LemkaHelpers.FontAwesomeIcons,
      image: null,
    }
  },
  computed: {
    ...mapGetters({
      profil: "Profil/profil",
      profilLoading: "Profil/loadingStatus",
      adresse: "Adresse/adresse",
      adresseLoading: "Adresse/loadingStatus"
    })
  },
  methods: {
    ...mapActions({loadAdresse: "Adresse/loadAdresse", loadProfil: "Profil/loadProfil",}),
    chargerElement: function() {
      this.loadProfil()
      this.loadAdresse()
    },
    initialisation: async function () {
      this.toggleLoading()
      await this.chargerElement()
      this.toggleLoading()
    }
  },
  created() {
    this.initialisation()
  },
  filters: {
    localTimeStr: function (value) {
      value = localTimeStr(value)
      return value
    }
  }
}
</script>

