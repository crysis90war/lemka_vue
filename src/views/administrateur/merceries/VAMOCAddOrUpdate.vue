<template>
  <div class="MOCAddOrUpdate">
    <b-container>
      <b-form>
        <b-form-group label="Caractéristique" description="Veuillez choisir la caractéristique">
          <multiselect v-model="characteristic.ref_caracteristique" :options="characteristics" :allow-empty="false"
                       label="nom" track-by="nom" placeholder="Veuillez selectionner la caractéristique"
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

        <b-form-group label="Valeur" description="Veuillez encoder la valeur">
          <b-form-input v-model="$v.characteristic.valeur.$model" type="number" step="0.01" min="0.00"
                        :state="validateState('valeur')"></b-form-input>
          <b-form-invalid-feedback>
            <invalid-feedback :condition="!$v.characteristic.valeur.required" :error-message="required()">
            </invalid-feedback>
            <invalid-feedback :condition="!$v.characteristic.valeur.numeric" :error-message="decimal()">
            </invalid-feedback>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button-group class="my-1">
          <b-button variant="outline-dark" @click="retour">
            <i class="fas fa-arrow-left"></i>
          </b-button>
          <b-button :variant="id !== undefined ? 'outline-primary' : 'outline-success'" @click.prevent="submit">
            {{ id !== undefined ? 'Modifier' : 'Créer' }}
          </b-button>
          <b-button v-if="id !== undefined" variant="outline-danger">
            Supprimer
          </b-button>
        </b-button-group>
      </b-form>

      <b-jumbotron header="Opt Carac" class="mt-4">
        <pre>{{ characteristics }}</pre>
        <pre>{{ characteristic }}</pre>
        {{ mercerie_id }}
        {{ option_id }}
        {{ id }}
      </b-jumbotron>
    </b-container>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {validationMixin} from "vuelidate";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import {multiSelectValidationMixin} from "@/mixins/multiselect_validation.mixin";
import MercerieOptionChatacteristicModel from "@/models/mercerie/mercerie_option_chatacteristic.model";
import LemkaHelpers from "@/helpers";
import InvalidFeedback from "@/components/LInvalidFeedback";

export default {
  name: "VAMOCAddOrUpdate",
  components: {InvalidFeedback},
  mixins: [validationMixin, validationMessageMixin, multiSelectValidationMixin,],
  validations: {
    characteristic: MercerieOptionChatacteristicModel.validations
  },
  props: {
    mercerie_id: {
      required: true
    },
    option_id: {},
    id: {}
  },

  data: () => {
    return {
      routes: LemkaHelpers.Routes,
      characteristic: new MercerieOptionChatacteristicModel(),
      submitStatus: null,
    }
  },

  computed: {
    ...mapGetters({characteristics: 'Characteristics/caracteristiques'}),
    isInvalid() {
      return this.isTouched && this.characteristic.ref_caracteristique.id === null
    }
  },

  methods: {
    ...mapActions({
      loadCharacteristics: "Characteristics/loadCaracteristiques",
      createMOC: "Merceries/createCaracteristique",
      updateMOC: "Merceries/updateCaracteristique"
    }),
    retour: function () {
      this.$router.push({
        name: this.routes.MO_ADD_OR_UPDATE.name,
        params: {
          mercerie_id: this.mercerie_id,
          id: this.option_id
        }
      })
    },
    submit: function () {
      this.$v.$touch()
      if (this.$v.$invalid || (this.isTouched === false && this.isInvalid === true)) {
        this.isTouched = true
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        if (this.id !== undefined) {
          this.updateMOC([this.option_id, this.characteristic.toUpdatePayload()])
        } else {
          this.createMOC([this.option_id, this.characteristic.toCreatePayload()])
        }

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.retour()
        }, 500)
      }
    },
    validateState: function (name) {
      const {$dirty, $error} = this.$v.characteristic[name];
      return $dirty ? !$error : null;
    }
  },

  created() {
    if (this.characteristics.length === 0) {
      this.loadCharacteristics()
    }
  }
}
</script>

<style scoped>

</style>