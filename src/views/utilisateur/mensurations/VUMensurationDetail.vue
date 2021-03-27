<template>
  <div class="user_mesures">
    <l-spinner v-if="loading"/>

    <b-card v-else :class="BSClass.CARD_BORDERLESS_SHADOW">
      <b-card-body>
        <b-card-text class="text-center">
          <h3><em>{{ userMensuration.titre }}</em></h3>
          <b-badge pill :variant="userMensuration.is_main === true ? 'success' : 'primary'">
            {{ userMensuration.is_main === true ? 'Principale' : 'Secondaire' }}
          </b-badge>
        </b-card-text>

        <b-form>
          <hr>
          <b-button-group>
            <b-button variant="outline-dark" @click="$router.push({name: routes.USER_MENSURATIONS.name})">
              <i class="fas fa-arrow-left"></i>
            </b-button>
            <b-button variant="outline-primary" :disabled="submitStatus === 'PENDING'" @click.prevent="submit">
              Enregistrer
            </b-button>
          </b-button-group>
          <hr>

          <b-form-group v-for="v in $v.mesures.$each.$iter"
                        :key="v.$model.id" :label="v.$model.mensuration"
                        :state="validateState(v.mesure)" :description="`Mesure : ${v.$model.mesure} cm`">
            <b-form-input v-model.trim="v.mesure.$model"
                          type="range" min="0" max="250" step="0.5"></b-form-input>
            <b-form-invalid-feedback>
              <span v-if="!v.mesure.numeric">La mesure doit être numérique.</span>
              <span v-if="!v.mesure.between">La mesure doit être comprise entre 0 et 250 cm</span>
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form>
      </b-card-body>
    </b-card>
  </div>

</template>

<script>
import MesureModel from "@/models/user_mensuration/mesure.model";
import {validationMixin} from "vuelidate";
import UserMensurationModel from "@/models/user_mensuration/user_mensuration.model";
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";
import {fonctions} from "@/mixins/functions.mixin";
import {htmlTitle} from "@/utils/tools";

export default {
  name: "VUMensurationDetail",
  props: {
    id: {
      required: true
    }
  },
  mixins: [validationMixin, fonctions],
  validations: {
    mesures: {
      $each: MesureModel.validations
    }
  },
  title() {
    return htmlTitle(this.userMensuration.titre)
  },
  data() {
    return {
      userMensuration: new UserMensurationModel(),
      submitStatus: null,
      loading: false,
      routes: LemkaHelpers.Routes,
      BSClass: LemkaHelpers.BSClass
    }
  },
  computed: {
    ...mapGetters({mesures: "UserMensurations/mesures"}),
  },
  methods: {
    ...mapActions({loadMesures: "UserMensurations/loadMesures", updateMesure: "UserMensurations/updateMesure"}),
    initialisation: async function () {
      this.toggleLoading()
      await this.loadMesures(this.id)
      this.toggleLoading()
    },

    submit: function () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        for (const item of this.mesures) {
          this.updateMesure([this.id, item])
        }

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: this.routes.USER_MENSURATIONS.name})
        }, 500)
      }
    },

    validateState(item) {
      const {$dirty, $error} = item;
      return $dirty ? !$error : null;
    },
  },

  created() {
    if (this.id === null || this.id === undefined || isNaN(this.id)) {
      this.$router.push({name: this.routes.USER_MENSURATIONS.name})
    } else {
      Object.assign(this.userMensuration, this.$store.getters["UserMensurations/userMensuration"](this.id))
      this.initialisation()
    }
  }
}
</script>

<style scoped>

</style>