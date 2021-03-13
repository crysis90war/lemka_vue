<template>
  <div class="MOCAddOrUpdate">
    <b-container>
      <b-form>
        <b-form-group label="Caractéristique" description="Veuillez choisir la caractéristique">
          <multiselect :options="characteristics" :allow-empty="false"
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
          <b-form-input></b-form-input>
        </b-form-group>

        <b-button-group class="my-1">
          <b-button variant="outline-dark"
                    @click="retour">
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
        <h1>{{test}}</h1>
        <pre>{{ characteristics }}</pre>
        <pre>{{ characteristic }}</pre>
      </b-jumbotron>
    </b-container>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {validationMixin} from "vuelidate";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import {multiSelectValidationMixin} from "@/mixins/multiselect_validation.mixin";
import MercerieOptionChatacteristicModel from "@/models/mercerie_option_chatacteristic.model";
import LemkaHelpers from "@/helpers";

export default {
  name: "VAMOCAddOrUpdate",

  mixins: [validationMixin, validationMessageMixin, multiSelectValidationMixin, ],

  props: {
    mercerie_id: {
      required: true
    },
    option_id: {},
    id: {}
  },

  data: () => {
    return {
      test: "Bonjour",
      routes: LemkaHelpers.Routes,
      characteristic: new MercerieOptionChatacteristicModel()
    }
  },

  computed: {
    ...mapGetters({characteristics: 'Characteristics/characteristics'}),
    isInvalid() {
      return this.isTouched && this.characteristic.ref_caracteristique.id === null
    }
  },

  methods: {
    ...mapActions({loadCharacteristics: "Characteristics/loadCharacteristics"}),
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