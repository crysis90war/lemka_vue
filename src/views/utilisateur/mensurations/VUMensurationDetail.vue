<template>
  <div class="user_mesures">
    <b-card :class="BSClass.CARD_BORDERLESS_SHADOW">
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
          <b-form-group v-for="mesure in userMensuration.mesures" :key="mesure.id" :label="mesure.mensuration"
                        :description="`Mesure : ${mesure.mesure} cm`">
            <b-form-input v-model.trim="mesure.mesure" type="range" min="0" max="250" step="0.5"/>
          </b-form-group>
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import UserMensurationModel from "@/models/user/user_mensuration.model";
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";
import {htmlTitle} from "@/utils/tools";

export default {
  name: "VUMensurationDetail",
  props: {
    id: {
      required: true
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
    ...mapGetters({userMensurations: "UserMensurations/userMensurations"})
  },
  methods: {
    ...mapActions({updateMesure: "UserMensurations/updateMesure", loadUserMensurations: "UserMensurations/loadUserMensurations"}),
    initialisation: async function () {
      Object.assign(this.userMensuration, this.$store.getters["UserMensurations/userMensuration"](this.id))
    },

    submit: function () {
      this.submitStatus = 'PENDING'

      for (const item of this.userMensuration.mesures) {
        this.updateMesure([this.id, item]).catch(() => {
          this.submitStatus = 'ERROR'
        })
      }

      setTimeout(() => {
        this.submitStatus = 'OK'
        this.$router.push({name: this.routes.USER_MENSURATIONS.name})
      }, 500)
    }
  },

  created() {
    if (this.id === null || this.id === undefined || isNaN(this.id) || this.userMensurations.length === 0) {
      this.$router.push({name: this.routes.USER_MENSURATIONS.name})
    } else {
      this.initialisation()
    }
  }
}
</script>

<style scoped>

</style>