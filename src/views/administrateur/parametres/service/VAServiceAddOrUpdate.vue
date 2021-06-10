<template>
  <div class="service_create_update">
    <l-spinner v-if="isLoading === true"/>

    <b-card
        v-else
        :title="$route.params.id !== undefined ? service.nom : 'Ajouter un service'"
        :class="BSClass.CARD_BORDERLESS_SHADOW"
    >
      <b-card-body>
        <!-- region Nom -->
        <l-input-field
            :input-type="true"
            v-model.trim="$v.service.nom.$model"
            label="Service"
            description="Veuillez encoder le type service"
            placeholder="exemple: Confection"
            :state="validateState($v.service, 'nom')"
        >
          <template #invalid-feedback>
            <invalid-feedback
                :condition="!$v.service.nom.required"
                :error-message="required()"
            />
            <invalid-feedback
                :condition="!$v.service.nom.minLength"
                :error-message="minLength($v.service.nom.$params.minLength.min)"
            />
            <invalid-feedback
                :condition="!$v.service.nom.maxLength"
                :error-message="maxLength($v.service.nom.$params.maxLength.max)"
            />
            <invalid-feedback
                :condition="!$v.service.nom.alpha"
                :error-message="alpha()"
            />
          </template>
        </l-input-field>
        <!-- endregion -->

        <!-- region Durée minute -->
        <l-input-field
            :input-type="true"
            v-model.trim="$v.service.duree_minute.$model"
            label="Duree en minute"
            description="Veuillez encoder la durée en minutes"
            placeholder="exemple: 30"
            :state="validateState($v.service, 'duree_minute')"
        >
          <template #invalid-feedback>
            <invalid-feedback
                :condition="!$v.service.duree_minute.required"
                :error-message="required()"
            />
            <invalid-feedback
                :condition="!$v.service.duree_minute.numeric"
                :error-message="numeric()"
            />
            <invalid-feedback
                :condition="!$v.service.duree_minute.between"
                :error-message="between($v.service.duree_minute.$params.between.min, $v.service.duree_minute.$params.between.max)"
            />
          </template>
        </l-input-field>
        <!-- endregion -->

        <l-button-group
            :to="routes.PARAMETRES_SERVICE.name"
            :submit="submit"
            :submit-status="submitStatus"
            :params="$route.params.id !== undefined"
        />
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import ServiceModel from "@/models/autre/service.model";
import {validationMixin} from "vuelidate";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import LemkaHelpers from "@/helpers";
import InvalidFeedback from "@/components/LInvalidFeedback";
import {mapActions, mapGetters} from "vuex";
import LInputField from "@/components/LInputField";
import {commonMixin} from "@/mixins/common.mixin";
import LButtonGroup from "@/components/LButtonGroup";

export default {
  name: "VAServiceAddOrUpdate",
  components: {LButtonGroup, LInputField, InvalidFeedback},
  mixins: [validationMixin, validationMessageMixin, commonMixin],
  validations: {
    service: ServiceModel.validations
  },
  data() {
    return {
      service: new ServiceModel(),
      submitStatus: null,
      BSClass: LemkaHelpers.BSClass,
      routes: LemkaHelpers.Routes
    }
  },
  computed:{
    ...mapGetters({services: "Services/services"})
  },
  methods: {
    ...mapActions({
      loadServices: "Services/loadServices",
      createService: 'Services/createService',
      updateService: 'Services/updateService'
    }),
    initialisation: async function() {
      if (this.services.length === 0) {
        await this.loadServices()
      }
    },
    chargerService: async function() {
      this.toggleLoading()
      await this.initialisation()

      if (this.$route.params.id !== undefined) {
        let service = await this.$store.getters["Services/service"](parseInt(this.$route.params.id))
        if (service !== undefined) {
          Object.assign(this.service, await service)
          this.$route.meta.value = this.service.nom
        } else {
          await this.$router.push({name: this.routes.PARAMETRES_SERVICE.name})
        }
      } else {
        this.$route.meta.value = "Ajout service"
      }

      this.toggleLoading()
    },
    submit: async function () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        if (this.$route.params.id !== undefined) {
          await this.updateService(this.service.toUpdatePayload())
        } else {
          await this.createService(this.service.toCreatePayload())
        }

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: this.routes.PARAMETRES_SERVICE.name})
        }, 500)
      }
    }
  },
  created() {
    this.chargerService()
  }
}
</script>

<style scoped>

</style>