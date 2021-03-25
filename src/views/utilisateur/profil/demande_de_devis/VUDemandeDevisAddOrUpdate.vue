<template>
  <div class="demande_devis_add_or_udpate">
    <l-spinner v-if="loading === true"/>
    <div :class="shadow" v-else>
      <h2>{{ id !== undefined ? demande_devis.numero_demande_devis : 'Créer la demande de devis' }}</h2>
      <hr>

      <!-- region Boutons -->
      <div class="text-center">
        <b-button-group>
          <b-button variant="outline-dark" @click="$router.push({name: routes.DEMANDE_DE_DEVIS.name})">
            <i class="fas fa-arrow-left"></i>
          </b-button>
          <b-button variant="outline-primary"
                    @click="submitSave(id !== undefined ? demande_devis.toUpdatePayload() : demande_devis.toCreatePayload())">
            <i class="fas fa-save"></i>
          </b-button>
          <b-button variant="outline-success"
                    @click="submitSend(id !== undefined ? demande_devis.toUpdatePayload() : demande_devis.toCreatePayload())">
            <i class="fas fa-paper-plane"></i>
          </b-button>
        </b-button-group>
      </div>
      <!-- endregion -->

      <hr>

      <!-- region Form -->
      <b-form>
        <b-form-group>
          <b-form-checkbox v-model="demande_devis.est_urgent" name="check-button" switch>
            <p>{{ demande_devis.est_urgent === true ? 'Urgent' : 'Pas urgent' }}</p>
            <span v-if="demande_devis.est_urgent === true" class="text-danger">
                <small> (toute demande urgente engendre des frais supplémentaires)</small>
              </span>
          </b-form-checkbox>
        </b-form-group>

        <b-form-group label="Titre *" description="Veuillez encoder le titre">
          <b-form-input v-model="demande_devis.titre"/>
        </b-form-group>

        <b-form-group label="Remarque *" description="Veuillez spécifier en détail votre demande">
          <b-form-textarea v-model="demande_devis.remarque"/>
        </b-form-group>

        <b-form-group label="Service *" description="Veuillez selectionner le service de l'article" class="my-1">
          <multiselect v-model="demande_devis.ref_type_service" :options="typeServices" :allow-empty="false" :hide-selected="true"
                       label="type_service" track-by="type_service" placeholder="Veuillez selectionner le service"
                       selectLabel="Appuyez sur enter pour selectionner" deselectLabel="Appuyez sur enter pour retirer">
            <template slot="singleLabel" slot-scope="{ option }">
              <span>{{ option.type_service }}</span>
            </template>
            <template slot="option" slot-scope="{ option }">
              <span>{{ option.type_service }}</span>
            </template>
            <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
          </multiselect>
        </b-form-group>

        <hr>
        <h4 class="text-secondary mb-5">Optionnel</h4>
        <b-row>
          <b-col lg="6">
            <b-form-group label="Article" class="my-1"
                          description="Si un article particulier vous interesse, veuillez le selecetion, sinon laissez vide">
              <multiselect v-model="demande_devis.ref_article" :options="articlesPublies"
                           :option-height="104" :show-labels="false" :hide-selected="true" :internal-search="false"
                           placeholder="Articles optionnel ..." label="Articles" track-by="titre">
                <template slot="singleLabel" slot-scope="props">
                  <img v-if="props.option.images.length > 0" :src="props.option.images.length > 0 ? props.option.images[0].image : ''"
                       alt="" height="48" width="48">
                  <span> {{ props.option.titre }}</span>
                </template>

                <template slot="option" slot-scope="props">
                  <img :src="props.option.images.length > 0 ? props.option.images[0].image : require('@/assets/noimage.png')" alt=""
                       height="64" width="64">
                  <span> {{ props.option.titre }}</span>
                </template>

                <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
              </multiselect>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group label="Mensuration" class="my-1"
                          description="Veuillez selectionner la mensuration pour cette demande, si vous en avez.">
              <multiselect v-model="demande_devis.ref_mensuration" :options="userMensurations" :hide-selected="true"
                           placeholder="Mensuration optionnel ..." label="mensuration" track-by="id" :internal-search="false">
                <template slot="singleLabel" slot-scope="props">
                  <b-badge v-if="demande_devis.ref_mensuration.id !== null" pill
                           :variant="props.option.is_main === true ? 'success': 'primary'">
                    {{ props.option.is_main === true ? 'Principale' : 'Secondaire' }}
                  </b-badge>
                  <span> {{ props.option.titre }}</span>
                </template>

                <template slot="option" slot-scope="props">
                  <b-badge pill :variant="props.option.is_main === true ? 'success': 'primary'">
                    {{ props.option.is_main === true ? 'Principale' : 'Secondaire' }}
                  </b-badge>
                  <p>{{ props.option.titre }}</p>
                </template>

                <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
              </multiselect>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group label="Merceries">
          <b-form-input v-model="searchInput" placeholder="Veuillez encoder pour chercher une mercerie" @keyup="searchMercerie"/>
          <LDoubleListBox :left-options="selectedMerceries" :right-options="mercerieOptions" :loading="loadingStatus"/>
        </b-form-group>
      </b-form>
      <!-- endregion -->
    </div>

    <b-jumbotron>
      <pre>{{ demande_devis }}</pre>
    </b-jumbotron>
  </div>
</template>

<script>
import LemkaHelpers from "@/helpers";
import DemandeDevisModel from "@/models/demande_devis.model";
import {mapActions, mapGetters} from "vuex";
import LDoubleListBox from "@/components/LDoubleListBox";
import {fonctions} from "@/mixins/functions.mixin";

export default {
  name: "VUDemandeDevisAddOrUpdate",
  components: {LDoubleListBox},
  mixins: [fonctions],
  props: {
    id: {
      required: false
    },
  },

  data() {
    return {
      demande_devis: new DemandeDevisModel(),
      shadow: LemkaHelpers.BSClass.CARD_BORDERLESS_SHADOW,
      routes: LemkaHelpers.Routes,

      selectedMerceries: [],
      searchInput: "",
      submitStatus: null,
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      typeServices: "TypeServices/typeServices",
      articlesPublies: "Articles/articlesPublies",
      userMensurations: "UserMensurations/userMensurations",
      mercerieOptions: "Merceries/globalMerceries",
      loadingStatus: "Merceries/globalMerceriesLoadingStatus"
    }),
  },
  watch: {
    selectedMerceries() {
      let merceriesToSubmit = []
      this.selectedMerceries.forEach(item => {
        merceriesToSubmit.push(item.id)
      })
      this.demande_devis.ref_mercerie_option = merceriesToSubmit
    }
  },
  methods: {
    ...mapActions({
      loadTypeServices: "TypeServices/loadTypeServices",
      loadArticles: "Articles/loadArticles",
      loadUserMensurations: "UserMensurations/loadUserMensurations",
      loadGlobalMerceries: "Merceries/loadGlobalMercerieOptions",
      createDemandeDevis: "DemandesDevis/createDemandeDevis",
      updateDemandeDevis: "DemandesDevis/updateDemandeDevis"
    }),
    chargerDemandeDevis: async function () {
      this.toggleLoading()
      await this.initialisation()
      await Object.assign(this.demande_devis, this.$store.getters["DemandesDevis/demandeDevis"](this.id))
      if (this.demande_devis.ref_type_service) {
        this.demande_devis.ref_type_service = this.$store.getters["TypeServices/typeService"](this.demande_devis.ref_type_service)
      }
      if (this.demande_devis.ref_article) {
        this.demande_devis.ref_article = this.$store.getters["Articles/article"](this.demande_devis.ref_article)
      }
      if (this.demande_devis.ref_mensuration) {
        this.demande_devis.ref_mensuration = this.$store.getters["UserMensurations/userMensuration"](this.demande_devis.ref_mensuration)
      }
      if (this.demande_devis.ref_mercerie_option.length > 0) {
        this.demande_devis.ref_mercerie_option.forEach(item => {
          this.selectedMerceries.push(this.$store.getters["Merceries/globalMercerie"](item))
        })
      }
      this.toggleLoading()
    },
    initialisation: async function () {
      if (this.userMensurations.length === 0 ||
          this.articlesPublies.length === 0 ||
          this.typeServices.length === 0 ||
          this.mercerieOptions.length === 0) {
        await this.loadTypeServices()
        await this.loadArticles()
        await this.loadUserMensurations()
        await this.loadGlobalMerceries()
      }
    },
    searchMercerie: async function () {
      await this.loadGlobalMerceries(this.searchInput)
      this.selectedMerceries.forEach(item => {
        const index = this.mercerieOptions.findIndex(i => i.id === item.id)
        if (index !== -1) {
          this.mercerieOptions.splice(index, 1)
        }
      })
    },
    submitSave: function (payload) {
      payload.est_soumis = false
      if (this.id !== undefined) {
        this.updateDemandeDevis(payload)
      } else {
        this.createDemandeDevis(payload)
      }
    },
    submitSend: function (payload) {
      payload.est_soumis = true
      if (this.id !== undefined) {
        this.updateDemandeDevis(payload)
      } else {
        this.createDemandeDevis(payload)
      }
    },
  },
  created() {
    if (this.id !== undefined) {
      this.chargerDemandeDevis()
    } else {
      this.initialisation()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>