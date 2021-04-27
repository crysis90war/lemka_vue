<template>
  <l-spinner v-if="isLoading"/>
  <div v-else class="mercerie">
    <b-container>
      <div class="text-left my-5">
        <hr>
        <div class="d-flex justify-content-between">
          <b-button-group>
            <b-button
                v-b-tooltip.top title="Revenir vers merceries"
                variant="outline-dark"
                @click="$router.push({name: routes.MERCERIES.name})"
            >
              <i class="fas fa-arrow-left"></i>
            </b-button>
            <b-button
                v-b-tooltip.top :title="id !== undefined ? 'Modifier : '+ mercerie.nom : 'Créer une nouvelle mercerie'"
                :variant="id !== undefined ? 'outline-primary' : 'outline-success'"
                @click="addMercerie"
            >
              {{ id !== undefined ? 'Modifier' : 'Créer' }}
            </b-button>
            <b-button
                v-b-tooltip.top :title="`Supprimer: ${mercerie.nom}`"
                v-if="id !== undefined"
                variant="outline-danger"
                @click="showModal('delete-mercerie-modal')"
            >
              Supprimer
            </b-button>
          </b-button-group>
          <b-modal id="delete-mercerie-modal" :title="mercerie.reference">
            <template #modal-footer>
              <div class="text-right">
                <b-button-group size="md">
                  <b-button
                      variant="outline-primary"
                      @click="hideModal('delete-mercerie-modal')"
                  >
                    Annuler
                  </b-button>
                  <b-button
                      variant="outline-danger"
                      @click="supprimerMercerie"
                  >
                    Supprimer
                  </b-button>
                </b-button-group>
              </div>
            </template>

            <div class="text-center">
              <p>Êtes-vous sure de vouloir supprimer</p>
              <h3>"{{ mercerie.nom }}"</h3>
            </div>
          </b-modal>
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
                :class="{ 'invalid': invalidCategorie }"
                @close="touchCategorie"
            >
              <template slot="singleLabel" slot-scope="{ option }">
                <span>{{ option.nom }}</span>
              </template>
              <template slot="option" slot-scope="{ option }">
                <span>{{ option.nom }}</span>
              </template>
              <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
            </multiselect>
            <span class="text-danger" v-show="invalidCategorie"><small>Ce champ est requis</small></span>
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
                :class="{ 'invalid': invalidCouleur }"
                @close="touchCouleur"
            >
              <template slot="singleLabel" slot-scope="{ option }">
                <span>{{ option.nom }}</span>
              </template>
              <template slot="option" slot-scope="{ option }">
                <span>{{ option.nom }}</span>
              </template>
              <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
            </multiselect>
            <span class="text-danger" v-show="invalidCouleur"><small>Ce champ est requis</small></span>
          </b-form-group>
        </b-col>
        <!-- endregion -->
      </b-row>

      <b-row>
        <!-- region Prix hors TVA -->
        <b-col lg="6">
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
        <b-col lg="6">
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
                :class="{ 'invalid': invalidTva }"
                @close="touchTva"
            >
              <template slot="singleLabel" slot-scope="{ option }">
                <span>{{ option.taux !== null ? `${option.taux * 100} %` : null }}</span>
              </template>
              <template slot="option" slot-scope="{ option }">
                <span>{{ option.taux * 100 }} %</span>
              </template>
              <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
            </multiselect>
            <span class="text-danger" v-show="invalidTva"><small>Ce champ est requis</small></span>
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
            <p>{{ data.item.caracteristique.nom }}</p>
          </template>

          <template #cell(actions)="data">
            <b-button-group>
              <b-button
                  v-b-tooltip.hover title="Modifier"
                  variant="outline-primary"
                  size="sm"
                  @click="afficherModifierCharacteristiqueModal(`modifier-characteristique-modal-${data.item.id}`, data.item)"
              >
                <i class="fas fa-edit"></i>
              </b-button>
              <b-button
                  v-b-tooltip.hover title="Supprimer"
                  size="sm"
                  variant="outline-danger"
                  @click="showModal('delete-characteristique-modal-'+data.item.id)"
              >
                <i class="fas fa-trash-alt"></i>
              </b-button>
            </b-button-group>
            <b-modal
                :id="`modifier-characteristique-modal-`+data.item.id"
                :title="`Modifier : ${data.item.caracteristique.nom}`"
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
                      :class="{ 'invalid': invalidCharacteristique }"
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
                  <span class="text-danger" v-show="invalidCharacteristique"><small>Ce champ est requis</small></span>
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
                        @click="hideModal('modifier-characteristique-modal-'+data.item.id)"
                    >
                      Annuler
                    </b-button>
                    <b-button
                        variant="outline-primary"
                        @click="modifierCharacteristique(data.item.id)"
                    >
                      Modifier
                    </b-button>
                  </b-button-group>
                </div>
              </template>
            </b-modal>
            <b-modal
                :id="`delete-characteristique-modal-${data.item.id}`"
                :title="`Supprimer : `+data.item.caracteristique.nom">
              <div class="text-center">
                <p>Êtes-vous sur de vouloir supprimer</p>
                <h3>{{ data.item.caracteristique.nom }} - {{ data.item.valeur }}</h3>
              </div>
              <template #modal-footer>
                <div class="text-right">
                  <b-button-group>
                    <b-button
                        variant="outline-primary"
                        @click="hideModal('delete-characteristique-modal-'+data.item.id)"
                    >
                      Annuler
                    </b-button>
                    <b-button
                        variant="outline-danger"
                        @click="supprimerCharacteristique(data.item)"
                    >
                      Supprimer
                    </b-button>
                  </b-button-group>
                </div>
              </template>
            </b-modal>
          </template>
        </b-table>
      </div>
      <!-- endregion -->

      <!-- region Images -->
      <div v-if="id" class="mt-5">
        <b-button-group size="sm">
          <b-button
              variant="outline-success"
              @click="showModal('ajout-image')"
          >Ajouter image
          </b-button>
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

          <template #cell(actions)="data">
            <b-button-group>
              <b-button
                  v-b-tooltip.hover title="Supprimer"
                  size="sm"
                  variant="outline-danger"
                  @click="showModal(`delete-image-modal-${data.item.id}`)"
              >
                <i class="fas fa-trash-alt"></i>
              </b-button>
            </b-button-group>
            <b-modal
                :id="`delete-image-modal-${data.item.id}`"
                title="Suppression de l'image"
            >
              <div class="text-center">
                <p>Êtes-vous sure de vouloir supprimer cette image</p>
                <b-img :src="data.item.image" width="360" height="360"/>
              </div>
              <template #modal-footer>
                <div class="text-right">
                  <b-button-group>
                    <b-button
                        variant="outline-primary"
                        @click="hideModal(`delete-image-modal-${data.item.id}`)"
                    >
                      Annuler
                    </b-button>
                    <b-button
                        variant="outline-danger"
                        @click="supprimerImage(data.item)"
                    >
                      Supprimer
                    </b-button>
                  </b-button-group>
                </div>
              </template>
            </b-modal>
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
                :class="{ 'invalid': invalidCharacteristique }"
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
            <span class="text-danger" v-show="invalidCharacteristique"><small>Ce champ est requis</small></span>
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
              >Annuler
              </b-button>
              <b-button
                  variant="outline-success"
                  @click.stop.prevent="addCharacteristique"
                  :disabled="mercerieCharacteristiqueSubmitStatus === 'PENDING'"
              >Ajouter
              </b-button>
            </b-button-group>
          </div>
        </template>

      </b-modal>
      <!-- endregion -->

      <!-- region Ajout Image -->
      <b-modal
          id="ajout-image"
          title="Modifier image du profil"
          size="xl"
      >
        <template #modal-footer>
          <div class="text-right">
            <b-button-group>
              <b-button
                  variant="outline-danger"
                  @click="hideModal('ajout-image')"
              >
                Annuler
              </b-button>
              <b-button
                  variant="outline-success"
                  type="button"
                  @click="addImage"
                  :disabled="emptyImage"
              >
                Ajouter
              </b-button>
            </b-button-group>
          </div>
        </template>
        <div>
          <b-form-group description="Formats autorisés .jpg et .png">
            <b-form-file
                v-model="image"
                required
                ref="image"
                accept="image/jpeg, image/png, .jpg, .png,"
                @change="previewImage"
            />
            <b-badge variant="danger" v-show="invalidImage">Veuillez selectionner une image au format valide</b-badge>
          </b-form-group>

          <b-row class="my-2">
            <b-col lg="7">
              <cropper
                  :src="preview"
                  class="cropper"
                  style="max-width: 720px; max-height: 576px"
                  @change="change"
                  :stencil-props="{
                     handlers: {},
                     movable: true,
                     scalable: true,
                     resizable: true
                   }"
                  :stencil-size="{
                     width: 600,
                     height: 600
                   }"
              />
            </b-col>
            <b-col lg="5">
              <b-img
                  v-if="destination !== null"
                  :src="destination"
                  height="360"
                  width="360"
              />
            </b-col>
          </b-row>
        </div>
      </b-modal>
      <!-- endregion -->

      <l-jumbotron :data="mercerieCharacteristique"/>
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
import {htmlTitle} from "@/utils/tools";
import MercerieChatacteristiqueModel from "@/models/mercerie/mercerie_characteristique.model";
import {Cropper} from "vue-advanced-cropper";
import {dataURLtoFile} from "@/helpers/functions.helper";
import {fonctions} from "@/mixins/functions.mixin";

export default {
  name: "VAMercerieAddOrUpdate",
  components: {InvalidFeedback, Cropper},
  props: {
    id: {}
  },
  mixins: [validationMixin, validationMessageMixin, fonctions],
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

      categorieTouched: false,
      couleurTouched: false,
      tvaTouched: false,
      mercerieCharacteristiqueTouched: false,

      mercerieCharacteristiqueSubmitStatus: null,

      routes: LemkaHelpers.Routes,
      submitStatus: null,

      image: null,
      preview: null,
      destination: null,

      invalidImage: false,
      emptyImage: true,

      formData: new FormData()
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
    invalidCategorie() {
      return this.categorieTouched && this.mercerie.categorie.id === null
    },
    invalidCouleur() {
      return this.couleurTouched && this.mercerie.couleur.id === null
    },
    invalidTva() {
      return this.tvaTouched && this.mercerie.tva.id === null
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
      deleteMercerie: "Merceries/deleteMercerie",
      createCharacteristique: "Merceries/createCharacteristique",
      updateCharacteristique: "Merceries/updateCharacteristique",
      deleteCharacteristique: "Merceries/deleteCharacteristique",
      createImage: "Merceries/createImage",
      deleteImage: "Merceries/deleteImage"
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
    addMercerie: function () {
      this.$v.$touch()
      if (this.$v.$invalid ||
          (this.categorieTouched === false && this.invalidCategorie === false) ||
          (this.categorieTouched === true && this.invalidCategorie === true) ||
          (this.couleurTouched === false && this.invalidCouleur === false) ||
          (this.couleurTouched === true && this.invalidCouleur === true) ||
          (this.tvaTouched === false && this.invalidTva === false) ||
          (this.tvaTouched === true && this.invalidTva === true)) {
        this.mercerieCharacteristiqueTouched = true
        this.categorieTouched = true
        this.couleurTouched = true
        this.tvaTouched = true
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
    supprimerMercerie: function () {
      this.deleteMercerie(this.mercerie).then(() => {
        this.$router.push({name: this.routes.MERCERIES.name})
      })
    },
    addCharacteristique: function () {
      this.$v.$touch()
      if (this.$v.$invalid ||
          (this.mercerieCharacteristiqueTouched === false && this.invalidCharacteristique === false) ||
          (this.mercerieCharacteristiqueTouched === true && this.invalidCharacteristique === true)) {
        this.mercerieCharacteristiqueTouched = true
        this.mercerieCharacteristiqueSubmitStatus = 'ERROR'
      } else {
        this.mercerieCharacteristiqueSubmitStatus = 'PENDING'

        if (this.mercerie.id !== null) {
          this.createCharacteristique([this.mercerie.id, this.mercerieCharacteristique.toCreatePayload()])
        }

        setTimeout(() => {
          this.mercerieCharacteristiqueSubmitStatus = 'OK'
          this.mercerieCharacteristiqueTouched = false
          this.mercerieCharacteristique = new MercerieChatacteristiqueModel()
          this.hideModal('ajout-caracteristique')
        }, 500)
      }
    },
    afficherModifierCharacteristiqueModal: function (modal_id, item) {
      this.showModal(modal_id)
      Object.assign(this.mercerieCharacteristique, item)
    },
    modifierCharacteristique: function (modal_id) {
      this.$v.$touch()
      if (this.$v.$invalid ||
          (this.mercerieCharacteristiqueTouched === false && this.invalidCharacteristique === false) ||
          (this.mercerieCharacteristiqueTouched === true && this.invalidCharacteristique === true)) {
        this.mercerieCharacteristiqueTouched = true
        this.mercerieCharacteristiqueSubmitStatus = 'ERROR'
      } else {
        this.mercerieCharacteristiqueSubmitStatus = 'PENDING'

        if (this.mercerie.id !== null) {
          this.updateCharacteristique([this.mercerie.id, this.mercerieCharacteristique.toUpdatePayload()])
        }

        setTimeout(() => {
          this.mercerieCharacteristiqueSubmitStatus = 'OK'
          this.mercerieCharacteristiqueTouched = false
          this.mercerieCharacteristique = new MercerieChatacteristiqueModel()
          this.hideModal(`modifier-characteristique-modal-${modal_id}`)
        }, 1)
      }
    },
    supprimerCharacteristique: function (item) {
      this.deleteCharacteristique([this.mercerie.id, item])
    },
    addImage: function () {
      this.createImage([this.mercerie.id, this.formData]).then(() => {
        this.emptyImage = true
        this.image = null
        this.preview = null
        this.destination = null
        this.formData = new FormData()
      })

      this.hideModal('ajout-image')
    },
    supprimerImage: function (item) {
      this.deleteImage([this.mercerie.id, item])
      this.hideModal(`delete-image-modal-${item.id}`)
    },
    validateStateMercerie: function (name) {
      const {$dirty, $error} = this.$v.mercerie[name];
      return $dirty ? !$error : null;
    },
    validateStateCharacteristique: function (name) {
      const {$dirty, $error} = this.$v.mercerieCharacteristique[name];
      return $dirty ? !$error : null;
    },
    touchCategorie: function () {
      this.categorieTouched = true
    },
    touchCouleur: function () {
      this.couleurTouched = true
    },
    touchTva: function () {
      this.tvaTouched = true
    },
    touchCaracteristique: function () {
      this.mercerieCharacteristiqueTouched = true
    },
    previewImage: function (event) {
      let input = event.target;
      let formatImage = [
        "image/jpeg",
        "image/png"
      ]
      if (formatImage.includes(input.files[0]['type'])) {
        this.invalidImage = false
        this.emptyImage = false
        if (input.files) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.preview = e.target.result;
          }
          reader.readAsDataURL(input.files[0]);
        }
      } else {
        this.invalidImage = true
        this.emptyImage = true
        console.log('faux')
      }
    },

    // eslint-disable-next-line no-unused-vars
    change({coordinates, canvas, image}) {
      // console.log(coordinates, canvas, image)
      this.destination = canvas.toDataURL()

      let formData = new FormData()
      let file = dataURLtoFile(canvas.toDataURL())
      formData.append('image', file, 'image.jpg')
      this.formData = formData
    },
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