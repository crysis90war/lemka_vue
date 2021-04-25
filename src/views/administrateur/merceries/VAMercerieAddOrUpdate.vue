<template>
  <l-spinner v-if="isLoading"/>
  <div v-else class="mercerie">
    <b-container>
      <div class="text-left my-5">
        <hr>
        <div class="d-flex justify-content-between">
          <b-button-group>
            <b-button variant="outline-dark" @click="$router.push({name: routes.MERCERIES.name})">
              <i class="fas fa-arrow-left"></i>
            </b-button>
            <b-button
                :variant="id !== undefined ? 'outline-primary' : 'outline-success'"
                @click.prevent="submitMercerie"
            >
              {{ id !== undefined ? 'Modifier' : 'Créer' }}
            </b-button>
            <b-button
                v-if="id !== undefined"
                variant="outline-danger"
            >
              Supprimer
            </b-button>
          </b-button-group>
          <h2>{{ id !== undefined ? mercerie.reference : 'Créer nouvelle mercerie' }}</h2>
        </div>
        <hr>
      </div>

      <!-- region Publication -->
      <b-input-group class="my-1">
        <b-form-checkbox v-model="mercerie.est_publie" name="check-button" switch>
          <p>{{ mercerie.est_publie === true ? 'Publier' : 'En attente' }}</p>
        </b-form-checkbox>
      </b-input-group>
      <!-- endregion -->

      <b-row>
        <!-- region Catégorie -->
        <b-col lg="6">
          <b-form-group
              label="Catégorie"
              description="Veuillez choisir la catégorie"
          >
            <multiselect
                v-model="mercerie.categorie"
                :options="categories"
                :allow-empty="false"
                label="nom"
                track-by="nom"
                :show-labels="false"
                placeholder="Veuillez selectionner la catégorie"
                selectLabel="Appuyez sur enter pour selectionner"
                :class="{ 'invalid': isInvalid }"
                deselectLabel="Appuyez sur enter pour retirer"
                @close="onTouch"
            >
              <template slot="singleLabel" slot-scope="{ option }">
                <span>{{ option.nom }}</span>
              </template>
              <template slot="option" slot-scope="{ option }">
                <span>{{ option.nom }}</span>
              </template>
              <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
            </multiselect>
            <span class="text-danger" v-show="isInvalid"><small>Ce champ est requis</small></span>
          </b-form-group>
        </b-col>
        <!-- endregion -->

        <!-- region Couleur -->
        <b-col lg="6">

          <b-form-group
              label="Couleur"
              description="Veuillez choisir la couleur"
          >
            <multiselect
                v-model="mercerie.couleur"
                :options="couleurs"
                :show-labels="false"
                :searchable="false"
                :allow-empty="false"
                label="Couleur"
                track-by="nom"
                placeholder="Veuillez selectionner la couleur"
                selectLabel="Appuyez sur enter pour selectionner"
                :class="{ 'invalid': isInvalid }"
                deselectLabel="Appuyez sur enter pour retirer"
                @close="onTouch"
            >
              <template slot="singleLabel" slot-scope="{ option }">
                <span>{{ option.nom }}</span>
              </template>
              <template slot="option" slot-scope="{ option }">
                <span>{{ option.nom }}</span>
              </template>
              <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
            </multiselect>
            <span class="text-danger" v-show="isInvalid"><small>Ce champ est requis</small></span>
          </b-form-group>
        </b-col>
        <!-- endregion -->
      </b-row>

      <b-row>
        <!-- region Prix hors TVA -->
        <b-col lg="4">
          <b-form-group
              label="Prix hors TVA"
              description="Veuillez encoder le prix hors tva de l'option"
          >
            <b-form-input
                v-model="$v.mercerie.prix_u_ht.$model"
                type="number"
                step="0.01"
                min="0.00"
                :state="validateStateMercerie('prix_u_ht')"
            />
            <b-form-invalid-feedback>
              <l-invalid-feedback
                  :condition="!$v.mercerie.prix_u_ht.required"
                  :error-message="required()"
              />
              <l-invalid-feedback
                  :condition="!$v.mercerie.prix_u_ht.minValue"
                  :error-message="minValue($v.mercerie.prix_u_ht.$params.minValue.min)"
              />
              <l-invalid-feedback
                  :condition="!$v.mercerie.prix_u_ht.numeric"
                  :error-message="decimal()"
              />
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <!-- endregion -->

        <!-- region TVA -->
        <b-col lg="4">
          <b-form-group
              label="TVA"
              description="Veuillez selectionner la TVA"
          >
            <multiselect
                v-model="mercerie.tva"
                :options="tvas"
                :show-labels="false"
                :searchable="false"
                :allow-empty="false"
                label="tva"
                track-by="taux"
                placeholder="Veuillez selectionner la tva"
                selectLabel="Appuyez sur enter pour selectionner"
                :class="{ 'invalid': isInvalid }"
                deselectLabel="Appuyez sur enter pour retirer"
                @close="onTouch"
            >
              <template slot="singleLabel" slot-scope="{ option }">
                <span>{{ option.taux !== null ? `${option.taux * 100} %` : null }}</span>
              </template>
              <template slot="option" slot-scope="{ option }">
                <span>{{ option.taux * 100 }} %</span>
              </template>
              <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
            </multiselect>
            <span class="text-danger" v-show="isInvalid"><small>Ce champ est requis</small></span>
          </b-form-group>
        </b-col>
        <!-- endregion -->

        <!-- region Stock -->
        <b-col lg="4">
          <b-form-group
              label="Stock"
              description="Veuillez encoder le stock de l'option"
          >
            <b-form-input
                v-model="$v.mercerie.stock.$model"
                type="number"
                step="0.01"
                min="0.00"
                :state="validateStateMercerie('stock')"
            />
            <b-form-invalid-feedback>
              <l-invalid-feedback
                  :condition="!$v.mercerie.stock.required"
                  :error-message="required()"
              />
              <l-invalid-feedback
                  :condition="!$v.mercerie.stock.minValue"
                  :error-message="minValue($v.mercerie.stock.$params.minValue.min)"
              />
              <l-invalid-feedback
                  :condition="!$v.mercerie.stock.numeric"
                  :error-message="decimal()"
              />
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <!-- endregion -->
      </b-row>

      <!-- region Nom -->
      <b-form-group
          label="Nom"
          description="Veuillez encoder le nom de la mercerie"
      >
        <b-form-input
            v-model="$v.mercerie.nom.$model"
            type="text"
            :state="validateStateMercerie('nom')"
        />
        <b-form-invalid-feedback>
          <invalid-feedback
              :condition="!$v.mercerie.nom.required"
              :error-message="required()"
          />
          <invalid-feedback
              :condition="!$v.mercerie.nom.minLength"
              :error-message="minLength($v.mercerie.nom.$params.minLength.min)"
          />
          <invalid-feedback
              :condition="!$v.mercerie.nom.maxLength"
              :error-message="maxLength($v.mercerie.nom.$params.maxLength.max)"
          />
        </b-form-invalid-feedback>
      </b-form-group>
      <!-- endregion -->

      <!-- region Description -->
      <b-form-group
          label="Description"
          description="Veuillez encoder la description de la mercerie"
      >
        <b-form-textarea
            v-model="$v.mercerie.description.$model"
            :state="validateStateMercerie('description')"
        />
        <b-form-invalid-feedback>
          <invalid-feedback
              :condition="!$v.mercerie.description.required"
              :error-message="required()"
          />
          <invalid-feedback
              :condition="!$v.mercerie.description.minLength"
              :error-message="minLength($v.mercerie.description.$params.minLength.min)"
          />
          <invalid-feedback
              :condition="!$v.mercerie.description.maxLength"
              :error-message="maxLength($v.mercerie.description.$params.maxLength.max)"
          />
        </b-form-invalid-feedback>
      </b-form-group>
      <!-- endregion -->

      <!-- region Charactéristiques -->
      <div v-if="id" class="mt-5">
        <b-button-group size="sm">
          <b-button
              variant="outline-success"
              @click="showModal('ajout-caracteristique')"
          >Ajouter caractéristique
          </b-button>
        </b-button-group>

        <b-table
            :items="mercerie.caracteristiques"
            :fields="mercerieCharacteristiquesFields"
            hover
            show-empty
            small
            stacked="md"
            class="text-center my-3"
        >
          <template #empty>
            <l-table-empty/>
          </template>

          <template #cell(caracteristique)="data">
            <p>{{data.item.caracteristique.nom}}</p>
          </template>

          <template #cell(actions)>
            <b-button-group>
              <b-button
                  v-b-tooltip.hover title="Modifier"
                  variant="outline-primary"
                  size="sm"
              >
                <i class="fas fa-edit"></i>
              </b-button>
              <b-button
                  v-b-tooltip.hover title="Supprimer"
                  size="sm"
                  variant="outline-danger"
              >
                <i class="fas fa-trash-alt"></i>
              </b-button>
            </b-button-group>
          </template>
        </b-table>
      </div>
      <!-- endregion -->

      <!-- region Images -->
      <div v-if="id" class="mt-5">
        <b-button-group size="sm">
          <b-button variant="outline-success">Ajouter image</b-button>
        </b-button-group>

        <b-table
            :items="mercerie.images"
            :fields="imagesFields"
            hover
            show-empty
            small
            stacked="md"
            class="text-center my-3"
        >
          <template #empty>
            <l-table-empty/>
          </template>

          <template #cell(image)="data">
            <b-link :href="data.item.image" target="_blank">
              <b-img :src="data.item.image" width="50" height="50"></b-img>
            </b-link>
          </template>

          <template #cell(is_main)="data">
            <b-badge :variant="data.item.is_main === true ? 'success' : 'primary'">
              {{ data.item.is_main === true ? 'Principale' : 'Secondaire' }}
            </b-badge>
          </template>

          <template #cell(actions)>
            <b-button-group>
              <b-button
                  v-b-tooltip.hover title="Supprimer"
                  size="sm"
                  variant="outline-danger"
              >
                <i class="fas fa-trash-alt"></i>
              </b-button>
            </b-button-group>
          </template>
        </b-table>
      </div>
      <!-- endregion -->

      <!-- region Ajout caractéristique -->
      <b-modal
          id="ajout-caracteristique"
          title="Nouvelle caractéristique"
      >
        <div>
          <b-form-group
              label="Caractéristique"
              description="Veuillez choisir la caractéristique"
          >
            <multiselect
                v-model="mercerieCharacteristique.caracteristique"
                :options="characteristiques"
                :allow-empty="false"
                :show-labels="false"
                label="nom"
                track-by="nom"
                placeholder="Veuillez selectionner la caractéristique"
                selectLabel="Appuyez sur enter pour selectionner"
                :class="{ 'invalid': invalidCharacteristique }"
                deselectLabel="Appuyez sur enter pour retirer"
                @close="touchCaracteristique"
            >
              <template slot="singleLabel" slot-scope="{ option }">
                <span>{{ option.nom }}</span>
              </template>
              <template slot="option" slot-scope="{ option }">
                <span>{{ option.nom }}</span>
              </template>
              <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
            </multiselect>
            <span class="text-danger" v-show="isInvalid"><small>Ce champ est requis</small></span>
          </b-form-group>

          <b-form-group
              label="Valeur"
              description="Veuillez encoder la valeur"
          >
            <b-form-input
                v-model="$v.mercerieCharacteristique.valeur.$model"
                type="number"
                step="0.01"
                min="0.00"
                :state="validateStateCharacteristique('valeur')"
            />
            <b-form-invalid-feedback>
              <invalid-feedback
                  :condition="!$v.mercerieCharacteristique.valeur.required"
                  :error-message="required()"
              />
              <invalid-feedback
                  :condition="!$v.mercerieCharacteristique.valeur.numeric"
                  :error-message="decimal()"
              />
            </b-form-invalid-feedback>
          </b-form-group>
        </div>

        <template #modal-footer>
          <div class="text-right">
            <b-button-group>
              <b-button
                  variant="outline-danger"
                  @click="hideModal('ajout-caracteristique')"
              >Annuler</b-button>
              <b-button
                  variant="outline-success"
                  @click.stop.prevent="addCharacteristique"
                  :disabled="mercerieCharacteristiqueSubmitStatus === 'PENDING'"
              >Ajouter</b-button>
            </b-button-group>
          </div>
        </template>

      </b-modal>
      <!-- endregion -->

      <l-jumbotron :data="mercerieCharacteristique.toCreatePayload()" class="mt-5"/>
    </b-container>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import MercerieModel from "@/models/mercerie/mercerie.model";
import LemkaHelpers from "@/helpers";
import {validationMixin} from "vuelidate";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import InvalidFeedback from "@/components/LInvalidFeedback";
import {multiSelectValidationMixin} from "@/mixins/multiselect_validation.mixin";
import {htmlTitle} from "@/utils/tools";
import {fonctions} from "@/mixins/functions.mixin";
import MercerieChatacteristiqueModel from "@/models/mercerie/mercerie_characteristique.model";

export default {
  name: "VAMercerieAddOrUpdate",
  components: {InvalidFeedback},
  props: {
    id: {}
  },
  mixins: [validationMixin, validationMessageMixin, multiSelectValidationMixin, fonctions],
  validations: {
    mercerie: MercerieModel.validations,
    mercerieCharacteristique: MercerieChatacteristiqueModel.validations
  },
  title() {
    return htmlTitle(this.id !== undefined ? this.mercerie.nom : "Créer mercerie")
  },
  data() {
    return {
      mercerie: new MercerieModel(),
      mercerieCharacteristique: new MercerieChatacteristiqueModel(),

      mercerieCharacteristiquesFields: MercerieModel.caracteristiquesTableFields,
      imagesFields: MercerieModel.imagesTableFields,

      mercerieCharacteristiqueTouched: false,

      mercerieCharacteristiqueSubmitStatus: null,

      routes: LemkaHelpers.Routes,
      submitStatus: null
    }
  },
  computed: {
    ...mapGetters({
      merceries: "Merceries/merceries",
      categories: 'Categories/categories',
      couleurs: "Couleurs/couleurs",
      tvas: "TVA/tvas",
      characteristiques: 'Characteristiques/characteristiques'
    }),
    isInvalid() {
      return this.isTouched && this.mercerie.categorie.id === null
    },
    invalidCharacteristique() {
      return this.mercerieCharacteristiqueTouched && this.mercerieCharacteristique.caracteristique.id === null
    },
  },
  methods: {
    ...mapActions({
      loadMerceries: "Merceries/loadMerceries",
      loadCategories: 'Categories/loadCategories',
      loadCharacteristiques: "Characteristiques/loadCaracteristiques",
      loadCouleurs: 'Couleurs/loadCouleurs',
      loadTVAs: "TVA/loadTvas",
      createMercerie: 'Merceries/createMercerie',
      updateMercerie: 'Merceries/updateMercerie',
      createCharacteristique: "Merceries/createCharacteristique",
      updateCharacteristique: "Merceries/updateCharacteristique",
      deleteCharacteristique: "Merceries/deleteCharacteristique"
    }),
    initialisation: async function () {
      if (this.characteristiques.length === 0) {
        await this.loadCharacteristiques()
      }
      if (this.merceries.length === 0) {
        await this.loadMerceries()
      }
      if (this.tvas.length === 0) {
        await this.loadTVAs()
      }
      if (this.categories.length === 0) {
        await this.loadCategories()
      }
      if (this.couleurs.length === 0) {
        await this.loadCouleurs()
      }
    },
    chargerMercerie: async function (id) {
      this.toggleLoading()
      await this.initialisation()
      const index = this.merceries.findIndex(item => item.id === parseInt(this.id))
      if (index !== -1) {
        Object.assign(this.mercerie, this.$store.getters["Merceries/mercerie"](parseInt(id)))
      } else {
        this.toggleLoading()
        await this.$router.push({name: this.routes.MERCERIES.name})
      }
      this.$route.meta.value = this.mercerie.nom
      this.toggleLoading()
    },

    submitMercerie: function () {
      this.$v.$touch()
      if (this.$v.$invalid || (this.isTouched === false && this.isInvalid === true)) {
        this.isTouched = true
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        if (this.id !== undefined) {
          this.updateMercerie(this.mercerie.toUpdatePayload())
        } else {
          this.createMercerie(this.mercerie.toCreatePayload())
        }

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: this.routes.MERCERIES.name})
        }, 500)
      }
    },

    addCharacteristique: function() {
      this.$v.$touch()
      if (this.$v.$invalid ||
          (this.mercerieCharacteristiqueTouched === false && this.invalidCharacteristique === false) ||
          (this.mercerieCharacteristiqueTouched === true && this.invalidCharacteristique === true)) {
        this.mercerieCharacteristiqueTouched = true
        this.mercerieCharacteristiqueSubmitStatus = 'ERROR'
      } else {
        this.mercerieCharacteristiqueSubmitStatus = 'PENDING'

        console.log(this.mercerie.id)
        if (this.mercerie.id !== null) {
          this.createCharacteristique([this.mercerie.id, this.mercerieCharacteristique.toCreatePayload()])
        }

        setTimeout(() => {
          this.mercerieCharacteristiqueSubmitStatus = 'OK'
        }, 500)
      }
    },

    validateStateMercerie: function (name) {
      const {$dirty, $error} = this.$v.mercerie[name];
      return $dirty ? !$error : null;
    },
    validateStateCharacteristique: function(name) {
      const {$dirty, $error} = this.$v.mercerieCharacteristique[name];
      return $dirty ? !$error : null;
    },

    touchCaracteristique: function() {
      this.mercerieCharacteristiqueTouched = true
    }
  },
  created() {
    if (this.id !== undefined) {
      this.chargerMercerie(this.$route.params.id)
    } else {
      this.initialisation()
    }
  },

}
</script>

<style scoped>

</style>