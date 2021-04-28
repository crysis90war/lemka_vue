<template>
  <div class="demande_devis_add_or_udpate">
    <l-spinner v-if="isLoading === true"/>

    <div
        v-else
        :class="shadow"
    >
      <!-- region Boutons -->
      <hr>
      <div class="d-flex justify-content-between">
        <b-button-group>
          <b-button
              variant="outline-dark"
              @click="$router.push({name: routes.DEMANDE_DE_DEVIS.name})"
          >
            <i class="fas fa-arrow-left"></i>
          </b-button>
          <b-button
              variant="outline-primary"
              :disabled="submitStatus === 'PENDING'" @click.stop.prevent="submitSave()"
          >
            <i class="fas fa-save"></i>
          </b-button>
          <b-button
              variant="outline-success"
              :disabled="submitStatus === 'PENDING'" @click.stop.prevent="submitSend()"
          >
            <i class="fas fa-paper-plane"></i>
          </b-button>
        </b-button-group>

        <h2>{{ id !== undefined ? demande_devis.numero_demande_devis : 'Création de demande de devis' }}</h2>
      </div>
      <hr>
      <!-- endregion -->

      <b-form>

        <!-- region Switch -->
        <b-form-group>
          <b-form-checkbox
              v-model="demande_devis.est_urgent"
              name="check-button"
              switch
          >
            <p>{{ demande_devis.est_urgent === true ? 'Urgent' : 'Pas urgent' }}</p>
            <span
                v-if="demande_devis.est_urgent === true"
                class="text-danger"
            >
                <small> (toute demande urgente engendre des frais supplémentaires)</small>
              </span>
          </b-form-checkbox>
        </b-form-group>
        <!-- endregion -->

        <!-- region Titre -->
        <b-form-group
            label="Titre *"
            description="Veuillez encoder le titre"
        >
          <b-form-input
              v-model="$v.demande_devis.titre.$model"
              :state="validateState('titre')"
          />
          <b-form-invalid-feedback>
            <l-invalid-feedback
                :condition="!$v.demande_devis.titre.required"
                :error-message="required()"
            />
            <l-invalid-feedback
                :condition="!$v.demande_devis.titre.minLength"
                :error-message="minLength($v.demande_devis.titre.$params.minLength.min)"
            />
            <l-invalid-feedback
                :condition="!$v.demande_devis.titre.maxLength"
                :error-message="maxLength($v.demande_devis.titre.$params.maxLength.max)"
            />
          </b-form-invalid-feedback>
        </b-form-group>
        <!-- endregion -->

        <!-- region Service -->
        <b-form-group
            label="Service *"
            description="Veuillez selectionner le service de l'article" class="my-1"
        >
          <multiselect
              v-model="demande_devis.type_service"
              :options="typeServices"
              :class="{ 'invalid': isInvalid }"
              :show-labels="false"
              label="type_service"
              track-by="type_service"
              placeholder="Veuillez selectionner le service"
              :allow-empty="false"
              :hide-selected="true"
              @close="onTouch"
          >
            <template slot="singleLabel" slot-scope="{ option }">
              <span>{{ option.type_service }}</span>
            </template>
            <template slot="option" slot-scope="{ option }">
              <span>{{ option.type_service }}</span>
            </template>
            <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
          </multiselect>
          <span class="text-danger" v-show="isInvalid"><small>Ce champ est requis</small></span>
        </b-form-group>
        <!-- endregion -->

        <!-- region Remarque -->
        <b-form-group
            label="Remarque *"
            description="Veuillez spécifier en détail votre demande"
        >
          <b-form-textarea
              v-model="$v.demande_devis.remarque.$model"
              :state="validateState('remarque')"
          />
          <b-form-invalid-feedback>
            <l-invalid-feedback
                :condition="!$v.demande_devis.remarque.required"
                :error-message="required()"
            />
            <l-invalid-feedback
                :condition="!$v.demande_devis.remarque.minLength"
                :error-message="minLength($v.demande_devis.remarque.$params.minLength.min)"
            />
            <l-invalid-feedback
                :condition="!$v.demande_devis.remarque.maxLength"
                :error-message="maxLength($v.demande_devis.remarque.$params.maxLength.max)"
            />
          </b-form-invalid-feedback>
        </b-form-group>
        <!-- endregion -->

        <hr>
        <h4 class="text-secondary mb4">Optionnel</h4>

        <!-- region Article -->
        <b-form-group
            label="Article" class="my-1"
            description="Si un article particulier vous interesse, veuillez le selecetion, sinon laissez vide"
        >
          <multiselect
              v-model="demande_devis.article"
              :options="articlesPublies"
              :option-height="104"
              :show-labels="false"
              :hide-selected="true"
              :internal-search="false"
              placeholder="Articles optionnel ..."
              label="Articles"
              track-by="titre"
          >
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
        <!-- endregion -->

        <!-- region Mensuration -->
        <b-form-group
            label="Mensuration"
            class="my-1"
            description="Veuillez selectionner la mensuration pour cette demande, si vous en avez."
        >
          <multiselect
              v-model="demande_devis.mensuration"
              :options="userMensurations"
              :hide-selected="true"
              :show-labels="false"
              placeholder="Mensuration optionnel ..."
              label="mensuration" track-by="id"
              :internal-search="false"
          >
            <template slot="singleLabel" slot-scope="props">
              <b-badge
                  v-if="demande_devis.mensuration.id !== null"
                  pill
                  :variant="props.option.is_main === true ? 'success': 'primary'"
              >
                {{ props.option.is_main === true ? 'Principale' : 'Secondaire' }}
              </b-badge>
              <span> {{ props.option.titre }}</span>
            </template>

            <template
                slot="option"
                slot-scope="props"
            >
              <b-badge
                  pill
                  :variant="props.option.is_main === true ? 'success': 'primary'"
              >
                {{ props.option.is_main === true ? 'Principale' : 'Secondaire' }}
              </b-badge>
              <p>{{ props.option.titre }}</p>
            </template>

            <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
          </multiselect>
        </b-form-group>
        <!-- endregion -->

        <!-- region Merceries -->
        <b-form-group label="Merceries">
          <b-form-input
              v-model="searchInput"
              placeholder="Veuillez encoder pour chercher une mercerie"
              @keyup="searchMercerie"
          />
          <LDoubleListBox
              :left-options="demande_devis.merceries"
              :right-options="mercerieOptions"
              :loading="loadingStatus"
          />
        </b-form-group>
        <!-- endregion -->

      </b-form>
    </div>
  </div>
</template>

<script>
import LemkaHelpers from "@/helpers";
import DemandeDevisModel from "@/models/demande_devis.model";
import {mapActions, mapGetters} from "vuex";
import LDoubleListBox from "@/components/LDoubleListBox";
import {fonctions} from "@/mixins/functions.mixin";
import {validationMixin} from "vuelidate";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import {multiSelectValidationMixin} from "@/mixins/multiselect_validation.mixin";

export default {
  name: "VUDemandeDevisAddOrUpdate",
  components: {LDoubleListBox},
  mixins: [fonctions, validationMixin, validationMessageMixin, multiSelectValidationMixin],
  props: {
    id: {
      required: false
    },
  },
  validations: {
    demande_devis: DemandeDevisModel.validations
  },
  data() {
    return {
      demande_devis: new DemandeDevisModel(),
      shadow: LemkaHelpers.BSClass.CARD_BORDERLESS_SHADOW,
      routes: LemkaHelpers.Routes,

      searchInput: "",
      submitStatus: null,
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
    isInvalid() {
      return this.isTouched && (this.demande_devis.type_service.id === null || false)
    }
  },
  methods: {
    ...mapActions({
      loadTypeServices: "TypeServices/loadTypeServices",
      loadArticles: "Articles/loadArticles",
      loadUserMensurations: "UserMensurations/loadUserMensurations",
      loadGlobalMerceries: "Merceries/loadGlobalMerceries",
      createDemandeDevis: "DemandesDevis/createDemandeDevis",
      updateDemandeDevis: "DemandesDevis/updateDemandeDevis"
    }),
    initialisation: async function () {
      if (this.userMensurations.length === 0) {
        await this.loadUserMensurations()
      }
      if (this.articlesPublies.length === 0) {
        await this.loadArticles()
      }
      if (this.typeServices.length === 0) {
        await this.loadTypeServices()
      }
      if (this.mercerieOptions.length === 0) {
        await this.loadGlobalMerceries()
      }
    },
    chargerDemandeDevis: async function() {
      this.toggleLoading()
      await this.initialisation()
      Object.assign(this.demande_devis, await this.$store.getters["DemandesDevis/demandeDevis"](parseInt(this.$route.params.id)))
      this.toggleLoading()
    },
    searchMercerie: async function () {
      await this.loadGlobalMerceries(this.searchInput)
      this.demande_devis.merceries.forEach(item => {
        const index = this.mercerieOptions.findIndex(i => i.id === item.id)
        if (index !== -1) {
          this.mercerieOptions.splice(index, 1)
        }
      })
    },
    submitSave: function () {
      this.$v.$touch()
      if (this.$v.$invalid ||
          (this.isTouched === false && this.isInvalid === false) ||
          (this.isTouched === true && this.isInvalid === true)) {
        this.isTouched = true
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        let payload = this.payload()
        payload.est_soumis = false

        if (this.id !== undefined) {
          this.updateDemandeDevis(payload)
        } else {
          this.createDemandeDevis(payload)
        }

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: this.routes.DEMANDE_DE_DEVIS.name})
        }, 500)
      }
    },
    submitSend: function () {
      this.$v.$touch()
      if (this.$v.$invalid ||
          (this.isTouched === false && this.isInvalid === false) ||
          (this.isTouched === true && this.isInvalid === true)) {
        this.isTouched = true
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        let payload = this.payload()
        payload.est_soumis = true

        if (this.id !== undefined) {
          this.updateDemandeDevis(payload)
        } else {
          this.createDemandeDevis(payload)
        }

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: this.routes.DEMANDE_DE_DEVIS.name})
        }, 500)
      }
    },
    payload: function () {
      return this.id !== undefined ? this.demande_devis.toUpdatePayload() : this.demande_devis.toCreatePayload()
    },
    validateState: function (name) {
      const {$dirty, $error} = this.$v.demande_devis[name];
      return $dirty ? !$error : null;
    }
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