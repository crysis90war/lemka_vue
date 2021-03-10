<template>
  <div>
    <b-container>
      <div v-if="id" class="mb-5">
        <h2 >{{ mercerie_option.name }}</h2>
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

      <b-button-group>
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

    <b-container class="my-3">
      <b-jumbotron header="JSON">
        <pre>{{ mercerie_option }}</pre>
        <pre>{{ couleurs }}</pre>
      </b-jumbotron>
    </b-container>
  </div>
</template>

<script>
import MercerieOptionModel from "@/models/mercerie_option.model";
import {mapActions, mapGetters} from "vuex";
import LemkaHelpers from "@/helpers";
import {multiSelectValidationMixin} from "@/mixins/multiselect_validation.mixin";
import InvalidFeedback from "@/components/InvalidFeedback";
import {validationMixin} from "vuelidate";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";

export default {
  name: "ViewAdminMercerieOptionAddOrUpdate",
  components: {InvalidFeedback},
  props: {
    mercerie_id: {
      required: true
    },
    id: {}
  },
  mixins: [validationMixin, validationMessageMixin, multiSelectValidationMixin],
  validations: {
    mercerie_option: MercerieOptionModel.validations
  },
  data() {
    return {
      mercerie_option: new MercerieOptionModel(),
      submitStatus: null,
      routes: LemkaHelpers.Routes
    }
  },
  computed: {
    ...mapGetters({couleurs: 'Couleurs/couleurs'}),
    isInvalid() {
      return this.isTouched && this.mercerie_option.ref_couleur.id === null
    }
  },
  methods: {
    ...mapActions({
      loadCouleurs: 'Couleurs/loadCouleurs',
      createMercerieOption: 'Options/createMercerieOption',
      updateMercerieOption: 'Options/updateMercerieOption'
    }),

    initialisation: async function (id) {
      if (this.couleurs.length === 0) {
        await this.loadCouleurs()
      }
      if (this.id !== undefined) {
        Object.assign(this.mercerie_option, this.$store.getters["Options/mercerie_option"](id))
        if (this.couleurs.length !== 0 && this.mercerie_option.ref_couleur !== undefined) {
          this.mercerie_option.ref_couleur = await this.$store.getters["Couleurs/couleur"](this.mercerie.ref_categorie)
        }
      }
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
.invalid {
  border: solid red 1px;
  border-radius: 5px;
}
</style>