<template>
  <div class="admin-user-detail">
    <l-spinner v-if="isLoading"/>

    <div v-else>
      <b-tabs>
        <b-tab
            title="Profil"
            class="p-3"
        >
          <b-row class="mb-5">
            <b-col lg="4">
              <div class="d-flex">
                <div class="mr-2">
                  <b-avatar
                      v-b-popover.hover.right="popoverConfig"
                      :src="utilisateur.image"
                      size="4em"
                  />
                </div>
                <div>
                  <span>@{{ utilisateur.username }}</span>
                  <div>
                    <b-badge pill :variant="userRank(utilisateur).variant">{{userRank(utilisateur).user_type}}</b-badge>
                  </div>
                </div>
              </div>
            </b-col>
            <b-col>
              <h2>{{ normalizedFullName }}</h2>

              <div v-if="utilisateur.email">
                <span class="mr-2"><i :class="icons.EMAIL"></i></span>
                <span class="mr-2">{{ utilisateur.email }}</span>
                <b-badge
                    :variant="utilisateur.is_verified === true ? 'success' : 'danger'"
                >
                  <i :class="utilisateur.is_verified === true ? 'fas fa-check' : 'fas fa-times'"></i>
                </b-badge>
              </div>
              <div v-if="utilisateur.numero_tel">
                <span class="mr-2"><i :class="icons.PHONE"></i></span>
                <span>{{ utilisateur.numero_tel }}</span>
              </div>
              <div v-if="utilisateur.genre !== null && utilisateur.genre !== undefined">
                <span class="mr-2"><i :class="icons.GENRE"></i></span>
                <span>{{ utilisateur.genre.genre }}</span>
              </div>
            </b-col>
          </b-row>
          <div>
            <span><small>Membre depuis {{ utilisateur.created_at | localTimeStr }}</small></span><br>
            <span><small>Dernière mise à jour {{ utilisateur.updated_at | localTimeStr }}</small></span>
          </div>
        </b-tab>

        <b-tab title="Adresse" class="p-3" :disabled="adresse.id === null">

          <div v-if="adresse.id !== null" class="mt-2">
            <div>
              <span><i :class="icons.HOME" class="mr-2"></i></span>
            </div>
            <span>{{ adresse.rue }}, {{ adresse.numero }} {{ adresse.boite }}</span><br>
            <span>{{ adresse.ville.code_postale }} - {{ adresse.ville.ville }}</span><br>
            <span>{{ adresse.ville.pays.pays }}</span>
          </div>
        </b-tab>

        <b-tab
            :title="`Mensurations ${utilisateur.mensurations_count}`"
            :disabled="utilisateur.mensurations_count === 0"
            class="p-4"
        >
          <div v-if="utilisateur.mensurations_count > 0">
            <section
                v-for="userMensuration in userMensurations"
                :key="userMensuration.id"
            >
              <b-list-group-item
                  v-b-toggle="`mensuration-collapse${userMensuration.id}`"
                  :variant="userMensuration.is_main === true ? 'success' : 'primary'"
              >
                {{ userMensuration.titre }}
              </b-list-group-item>
              <b-collapse :id="`mensuration-collapse${userMensuration.id}`">
                <b-card>
                  <b-card-body>
                    <b-form-group label="Remarque :" :description="`${userMensuration.remarque}`"/>
                    <hr>
                    <b-row>
                      <b-col v-for="mesure in userMensuration.mesures" :key="mesure.id" lg="4">
                        <div class="d-flex">
                          <p><strong>{{ mesure.mensuration }} : </strong> {{ mesure.mesure }} cm</p>
                        </div>
                      </b-col>
                    </b-row>
                  </b-card-body>
                </b-card>
              </b-collapse>
            </section>
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import UtilisateurModel from "@/models/utilisateur.model";
import LemkaHelpers from "@/helpers";
import {commonMixin} from "@/mixins/common.mixin";
import {mapActions, mapGetters} from "vuex";
import {localTimeStr} from "@/utils/filters";

export default {
  name: "VAUserDetail",
  props: {
    username: {
      required: true
    },
  },
  mixins: [commonMixin],
  data() {
    return {
      utilisateur: new UtilisateurModel(),
      routes: LemkaHelpers.Routes,
      BSClass: LemkaHelpers.BSClass,
      icons: LemkaHelpers.FontAwesomeIcons,
    }
  },
  computed: {
    ...mapGetters({adresse: "Adresse/adresse", userMensurations: "UserMensurations/userMensurations"}),
    normalizedFullName() {
      return this.utilisateur.getFullName()
    },
    popoverConfig() {
      return {
        html: true,
        content: () => {
          return '<img src="' + this.utilisateur.image + '" alt="" width="250px"/>'
        }
      }
    },
  },
  methods: {
    ...mapActions({loadAdresse: "Adresse/loadAdresseByUsername", loadMensurations: "UserMensurations/loadUserMensurationForAdmin"}),
    chargerAdresse: function (username) {
      this.loadAdresse(username)
    },
    chargerUtilisateur: function () {
      Object.assign(this.utilisateur, this.$store.getters["Utilisateurs/utilisateur"](this.$route.params.username))
    },
    chargerMensuration: function (username) {
      this.loadMensurations(username)
    },
    initialisation: async function () {
      this.toggleLoading()
      let utilisateur = this.$store.getters["Utilisateurs/utilisateur"](this.$route.params.username)
      if (utilisateur !== undefined) {
        await this.chargerUtilisateur()
        await this.chargerAdresse(this.$route.params.username)
        if (this.utilisateur.mensurations_count > 0) {
          this.chargerMensuration(this.$route.params.username)
        }
        this.$route.meta.value = this.$route.params.username
      } else {
        await this.$router.push({name: this.routes.UTILISATEURS.name})
      }
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
  },
}
</script>

<style scoped>

</style>