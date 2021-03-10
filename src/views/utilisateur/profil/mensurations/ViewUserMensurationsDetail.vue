<template>
  <b-card :class="BSClass.CARD_BORDERLESS_SHADOW">
    <template title>
      <b-badge pill :variant="userMensuration.is_main === true ? 'success' : 'primary'">
        {{ userMensuration.is_main === true ? 'Principale' : 'Secondaire' }}
      </b-badge>
      <h5><em>{{ userMensuration.titre }}</em></h5>
    </template>
    <b-card-body>


      <b-form @submit.prevent="submit">

        <div class="text-center">
          <b-button-group>
            <b-button variant="outline-primary"
                      type="submit"
                      :disabled="submitStatus === 'PENDING'">Enregistrer</b-button>
            <b-button variant="outline-danger" @click="$router.go(-1)">Retour</b-button>
          </b-button-group>
          <hr>
        </div>




        <b-form-group v-for="v in $v.mensurationUserMensurations.$each.$iter"
                      :key="v.$model.id"
                      :label="v.$model.ref_mensuration"
                      :state="validateState(v.mesure)"
                      :description="`Mesure : ${v.$model.mesure} cm`">
          <b-form-input v-model.trim="v.mesure.$model"
                        type="range"
                        min="0"
                        max="250"
                        step="0.5"></b-form-input>
          <b-form-invalid-feedback>
            <span v-if="!v.mesure.numeric">La mesure doit être numérique.</span>
            <span v-if="!v.mesure.between">La mesure doit être comprise entre 0 et 250 cm</span>
          </b-form-invalid-feedback>
        </b-form-group>
      </b-form>
    </b-card-body>
  </b-card>
</template>

<script>
import MensurationUserMensurationModel from "@/models/mensurationUserMensuration.model";
import {validationMixin} from "vuelidate";
import UserMensurationModel from "@/models/userMensuration.model";
import LemkaHelpers from "@/helpers";

export default {
  name: "ViewUserMensurationsDetail",
  props: {
    id: {
      required: true
    }
  },
  mixins: [validationMixin],
  validations: {
    mensurationUserMensurations: {
      $each: MensurationUserMensurationModel.validations
    }
  },
  data() {
    return {
      userMensuration: new UserMensurationModel(),
      mensurationUserMensurations: [],
      submitStatus: null,
      links: {
        mensurations: LemkaHelpers.Routes.MENSURATIONS.name
      },
      icons: {
        leftArrow: LemkaHelpers.FontAwesomeIcons.LONG_LEFT_ARROW
      },
      BSClass: LemkaHelpers.BSClass
    }
  },

  methods: {
    async chargerMensurationsUserMensurations() {
      Object.assign(this.userMensuration, await UserMensurationModel.fetchUserMensuration(this.id))
      let listMensurations = await MensurationUserMensurationModel.fetchMensurationUserMensurationList(this.userMensuration.id)
      for (const item of listMensurations) {
        let mensuration = new MensurationUserMensurationModel()
        this.mensurationUserMensurations.push(Object.assign(mensuration, item))
      }
    },

    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        for (const item of this.mensurationUserMensurations) {
          await MensurationUserMensurationModel.updateMensurationUserMensuration(this.id, item.id, item.toUpdatePayload())
        }

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: this.links.mensurations})
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
      this.$router.push({name: this.links.mensurations})
    } else {
      this.chargerMensurationsUserMensurations()
    }
  }
}
</script>

<style scoped>

</style>