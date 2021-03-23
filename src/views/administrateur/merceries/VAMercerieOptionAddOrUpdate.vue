<template>
  <div>
    <b-container>
      <div v-if="id" class="mb-5">
        <h2>{{ mercerie_option.name }}</h2>
      </div>

      <b-input-group class="my-1">
        <b-form-checkbox v-model="mercerie_option.est_publie" name="check-button" switch>
          <p>{{ mercerie_option.est_publie === true ? 'Publier' : 'En attente' }}</p>
        </b-form-checkbox>
      </b-input-group>

      <b-form-group label="Référence" description="Veuillez encoder la référence de l'option">
        <b-form-input v-model="$v.mercerie_option.reference.$model" type="text"
                      :state="validateState('reference')"></b-form-input>
        <b-form-invalid-feedback>
          <invalid-feedback :condition="!$v.mercerie_option.reference.required" :error-message="required()">
          </invalid-feedback>
          <invalid-feedback :condition="!$v.mercerie_option.reference.minLength"
                            :error-message="minLength($v.mercerie_option.reference.$params.minLength.min)">
          </invalid-feedback>
          <invalid-feedback :condition="!$v.mercerie_option.reference.maxLength"
                            :error-message="maxLength($v.mercerie_option.reference.$params.maxLength.max)">
          </invalid-feedback>
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Description" description="Veuillez encoder la description de l'option">
        <b-form-textarea v-model="$v.mercerie_option.description.$model"
                         :state="validateState('description')"></b-form-textarea>
        <b-form-invalid-feedback>
          <invalid-feedback :condition="!$v.mercerie_option.description.required" :error-message="required()">
          </invalid-feedback>
          <invalid-feedback :condition="!$v.mercerie_option.description.minLength"
                            :error-message="minLength($v.mercerie_option.description.$params.minLength.min)">
          </invalid-feedback>
          <invalid-feedback :condition="!$v.mercerie_option.description.maxLength"
                            :error-message="maxLength($v.mercerie_option.description.$params.maxLength.max)">
          </invalid-feedback>
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Couleur" description="Veuillez choisir la couleur">
        <multiselect v-model="mercerie_option.ref_couleur" :options="couleurs" :allow-empty="false"
                     label="nom" track-by="nom" placeholder="Veuillez selectionner la couleur"
                     selectLabel="Appuyez sur enter pour selectionner" :class="{ 'invalid': isInvalid }"
                     deselectLabel="Appuyez sur enter pour retirer" @close="onTouch">
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

      <b-row>
        <b-col lg="6">
          <b-form-group label="Prix hors TVA" description="Veuillez encoder le prix hors tva de l'option">
            <b-form-input v-model="$v.mercerie_option.prix_u_ht.$model" type="number" step="0.01" min="0.00"
                          :state="validateState('prix_u_ht')"></b-form-input>
            <b-form-invalid-feedback>
              <invalid-feedback :condition="!$v.mercerie_option.prix_u_ht.required" :error-message="required()">
              </invalid-feedback>
              <invalid-feedback :condition="!$v.mercerie_option.prix_u_ht.minValue"
                                :error-message="minValue($v.mercerie_option.prix_u_ht.$params.minValue.min)">
              </invalid-feedback>
              <invalid-feedback :condition="!$v.mercerie_option.prix_u_ht.numeric"
                                :error-message="decimal()">
              </invalid-feedback>
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <b-col lg="6">
          <b-form-group label="Stock" description="Veuillez encoder le stock de l'option">
            <b-form-input v-model="$v.mercerie_option.stock.$model" type="number" step="0.01" min="0.00"
                          :state="validateState('stock')"></b-form-input>
            <b-form-invalid-feedback>
              <invalid-feedback :condition="!$v.mercerie_option.stock.required" :error-message="required()">
              </invalid-feedback>
              <invalid-feedback :condition="!$v.mercerie_option.stock.minValue"
                                :error-message="minValue($v.mercerie_option.stock.$params.minValue.min)">
              </invalid-feedback>
              <invalid-feedback :condition="!$v.mercerie_option.stock.numeric"
                                :error-message="decimal()">
              </invalid-feedback>
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- region Caractéristiques -->
      <div v-if="id" class="mt-4">
        <b-button-group size="sm">
          <b-button variant="outline-success"
                    @click="$router.push({name: routes.MOC_ADD_OR_UPDATE.name, params: {mercerie_id: mercerie_id, option_id: mercerie_option.id}})">
            Ajouter des dimensions
          </b-button>
          <b-button variant="outline-primary" @click="loadOrRefreshCharacteristics(mercerie_option.id)">
            <i class="fas fa-sync-alt"></i>
          </b-button>
        </b-button-group>

        <b-table :items="option_characteristics" :fields="MeOptFields" :busy="caractsBusy"
                 hover show-empty small stacked="md" class="text-center my-3">
          <template #table-busy>
            <TableBusy/>
          </template>

          <template #empty>
            <TableEmpty/>
          </template>

          <template #cell(actions)="data">
            <b-button-group>
              <b-button variant="outline-primary" size="sm">
                <i class="fas fa-edit"></i>
              </b-button>
              <b-button variant="outline-danger" size="sm"
                        @click="deleteMercerieOptionCaracteristique([mercerie_option.id, data.item])">
                <i class="fas fa-trash-alt"></i>
              </b-button>
            </b-button-group>
          </template>
        </b-table>
      </div>
      <!-- endregion -->

      <!-- region Images -->
      <!--
      <div v-if="id" class="mt-4">
        <b-button variant="outline-success" size="sm" @click="showModal('image-modal')">
          Ajouter des images
        </b-button>

        <b-modal id="image-modal" ref="image-modal" hide-footer title="Modifier image du profil" size="xl">
          <b-form @submit.prevent="createImage">
            <b-form-group id="input-group-image" label-for="input-image" description="Formats autorisés .jpg et .png">
              <b-form-file v-model="image" id="input-image" ref="image" name="input-image" required
                           accept="image/jpeg, image/png, .jpg, .png," @change="previewImage"></b-form-file>
            </b-form-group>

            <div class="d-flex">
              <cropper :src="preview" :stencil-size="{width: 800,height: 800}"
                       :stencil-props="{handlers: {}, movable: true, scalable: true, resizable: true}"
                       class="cropper" style="max-width: 720px; max-height: 576px" @change="change"/>
              <b-img v-if="destination !== null" :src="destination" height="360" width="360"></b-img>
            </div>

            <b-button-group class="d-flex">
              <b-button variant="outline-success" type="submit">Créer</b-button>
              <b-button variant="outline-danger" @click="hideModal('image-modal')">Annuler</b-button>
            </b-button-group>
          </b-form>
        </b-modal>

        <b-table :items="article_images" :fields="articles_images_fields" class="mt-2" stacked="md" small show-empty>
          <template #table-busy>
            <TableBusy/>
          </template>

          <template #empty>
            <TableEmpty/>
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

          <template #cell(define)="data">
            <b-button v-if="data.item.is_main === false" size="sm" variant="outline-success"
                      @click="update_image_is_main(data.item.id, data.item.is_main)">
              Définir comme principale
            </b-button>
          </template>

          <template #cell(actions)>
            <b-button-group>
              <b-button size="sm" variant="outline-primary">Modifier</b-button>
              <b-button size="sm" variant="outline-danger">Supprimer</b-button>
            </b-button-group>
          </template>
        </b-table>
      </div>
      -->
      <!-- endregion -->

      <b-button-group class="mt-3">
        <b-button variant="outline-dark"
                  @click="$router.push({name: routes.MERCERIE_OPTIONS.name, params: {id: mercerie_id}})">
          <i class="fas fa-arrow-left"></i>
        </b-button>
        <b-button :variant="id !== undefined ? 'outline-primary' : 'outline-success'" @click.prevent="submit">
          {{ id !== undefined ? 'Modifier' : 'Créer' }}
        </b-button>
        <b-button v-if="id !== undefined" variant="outline-danger">
          Supprimer
        </b-button>
      </b-button-group>
    </b-container>
  </div>
</template>

<script>
import MercerieOptionModel from "@/models/mercerie/mercerie_option.model";
import {mapActions, mapGetters} from "vuex";
import LemkaHelpers from "@/helpers";
import {multiSelectValidationMixin} from "@/mixins/multiselect_validation.mixin";
import InvalidFeedback from "@/components/LInvalidFeedback";
import {validationMixin} from "vuelidate";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import {fonctions} from "@/mixins/functions.mixin";
import TableEmpty from "@/components/Table/LTableEmpty";
import TableBusy from "@/components/Table/LTableBusy";
import MercerieOptionChatacteristicModel from "@/models/mercerie/mercerie_option_chatacteristic.model";

export default {
  name: "VAMercerieOptionAddOrUpdate",
  components: {InvalidFeedback, TableEmpty, TableBusy},
  props: {
    mercerie_id: {
      required: true
    },
    id: {}
  },
  mixins: [validationMixin, validationMessageMixin, multiSelectValidationMixin, fonctions],
  validations: {
    mercerie_option: MercerieOptionModel.validations
  },
  data() {
    return {
      mercerie_option: new MercerieOptionModel(),
      MeOptFields: MercerieOptionChatacteristicModel.tableFields,
      submitStatus: null,
      routes: LemkaHelpers.Routes
    }
  },
  computed: {
    ...mapGetters({
      couleurs: 'Couleurs/couleurs',
      option_characteristics: "Merceries/caracteristiques",
      caractsBusy: "Merceries/caracteristiquesLoadingStatus"
    }),
    isInvalid() {
      return this.isTouched && this.mercerie_option.ref_couleur.id === null
    }
  },
  methods: {
    ...mapActions({
      loadCouleurs: 'Couleurs/loadCouleurs',
      createMercerieOption: 'Merceries/createOption',
      updateMercerieOption: 'Merceries/updateOption',
      loadMercerieOptionCaracteristiques: "Merceries/loadCaracteristiques",
      deleteMercerieOptionCaracteristique: "Merceries/deleteCaracteristique"
    }),

    loadOrRefreshCharacteristics: function (mercerie_option_id) {
      this.loadMercerieOptionCaracteristiques(mercerie_option_id)
    },

    initialisation: async function (id) {
      if (this.couleurs.length === 0) {
        await this.loadCouleurs()
      }
      Object.assign(this.mercerie_option, await this.$store.getters["Merceries/option"](id))
      if (this.couleurs.length !== 0 && this.mercerie_option.ref_couleur !== undefined) {
        this.mercerie_option.ref_couleur = this.$store.getters["Couleurs/couleur"](this.mercerie_option.ref_couleur)
      }
      await this.loadOrRefreshCharacteristics(this.mercerie_option.id)
    },

    submit: function () {
      this.$v.$touch()
      if (this.$v.$invalid || (this.isTouched === false && this.isInvalid === true)) {
        this.isTouched = true
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        if (this.id !== undefined) {
          this.updateMercerieOption([this.mercerie_id, this.mercerie_option.toUpdatePayload()])
        } else {
          this.createMercerieOption([this.mercerie_id, this.mercerie_option.toCreatePayload()])
        }

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: this.routes.MERCERIE_OPTIONS.name, params: {id: this.mercerie_id}})
        }, 500)
      }
    },

    validateState: function (name) {
      const {$dirty, $error} = this.$v.mercerie_option[name];
      return $dirty ? !$error : null;
    }
  },
  created() {
    if (this.id !== undefined) {
      this.initialisation(this.id)
    } else {
      if (this.couleurs.length === 0) {
        this.loadCouleurs()
      }
    }
  }
}
</script>

<style scoped>

</style>