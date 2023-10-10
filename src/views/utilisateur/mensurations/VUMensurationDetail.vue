<template>
  <div class="user_mesures">
    <b-card :class="BSClass.CARD_BORDERLESS_SHADOW">
      <b-card-body>
        <b-card-text class="text-center">
          <h3><em>{{ userMensuration.titre }}</em></h3>
          <b-badge pill :variant="badgeVariant">
            {{ badgeLabel }}
          </b-badge>
        </b-card-text>
        <b-form>
          <hr>
          <b-button-group>
            <b-button variant="outline-dark" @click="goBack">
              <i class="fas fa-arrow-left"></i>
            </b-button>
            <b-button variant="outline-primary" :disabled="isSubmitDisabled" @click.prevent="submit">
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

export default {
  name: "VUMensurationDetail",
  props: { id: { required: true } },
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
    ...mapGetters({userMensurations: "UserMensurations/userMensurations"}),

    badgeVariant() {
      return this.userMensuration.is_main ? 'success' : 'primary';
    },
    badgeLabel() {
      return this.userMensuration.is_main ? 'Principale' : 'Secondaire';
    },
    isSubmitDisabled() {
      return this.submitStatus === 'PENDING';
    }
  },
  methods: {
    ...mapActions({updateMesure: "UserMensurations/updateMesure"}),

    async initialisation() {
      try {
        const mensuration = this.$store.getters["UserMensurations/userMensuration"](this.id);
        Object.assign(this.userMensuration, mensuration);
      } catch(error) {
        console.error(error);
        this.$router.push({name: this.routes.USER_MENSURATIONS.name});
      }
    },
    async submit() {
      this.submitStatus = 'PENDING';
      
      try {
        await Promise.all(
          this.userMensuration.mesures.map(item => this.updateMesure([this.id, item]))
        );
        this.submitStatus = 'OK';
        this.$router.push({name: this.routes.USER_MENSURATIONS.name});
      } catch(error) {
        console.error(error);
        this.submitStatus = 'ERROR';
      }
    },
    goBack() {
      this.$router.push({name: this.routes.USER_MENSURATIONS.name});
    }
  },
  async created() {
    if (!this.id || isNaN(this.id) || this.userMensurations.length === 0) {
      this.$router.push({name: this.routes.USER_MENSURATIONS.name});
    } else {
      await this.initialisation();
    }
  }
}
</script>

<style scoped>
/* Ensure to style your component properly here */
</style>
