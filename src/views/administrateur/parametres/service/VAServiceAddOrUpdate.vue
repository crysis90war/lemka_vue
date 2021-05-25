<template>
  <div class="service_create_update">
    <l-spinner v-if="isLoading === true"/>

    <b-card
        v-else
        :title="$route.params.id !== undefined ? typeService.nom : 'Ajouter un service'"
        :class="BSClass.CARD_BORDERLESS_SHADOW"
    >
      <b-card-body>
        <!-- region Nom -->
        <l-input-field
            :input-type="true"
            v-model.trim="$v.typeService.nom.$model"
            label="Type service"
            description="Veuillez encoder le type service"
            placeholder="exemple: Confection"
            :state="validateState($v.typeService, 'nom')"
        >
          <template #invalid-feedback>
            <invalid-feedback
                :condition="!$v.typeService.nom.required"
                :error-message="required()"
            />
            <invalid-feedback
                :condition="!$v.typeService.nom.minLength"
                :error-message="minLength($v.typeService.nom.$params.minLength.min)"
            />
            <invalid-feedback
                :condition="!$v.typeService.nom.maxLength"
                :error-message="maxLength($v.typeService.nom.$params.maxLength.max)"
            />
            <invalid-feedback
                :condition="!$v.typeService.nom.alpha"
                :error-message="alpha()"
            />
          </template>
        </l-input-field>
        <!-- endregion -->

        <!-- region Durée minute -->
        <l-input-field
            :input-type="true"
            v-model.trim="$v.typeService.duree_minute.$model"
            label="Duree en minute"
            description="Veuillez encoder la durée en minutes"
            placeholder="exemple: 30"
            :state="validateState($v.typeService, 'duree_minute')"
        >
          <template #invalid-feedback>
            <invalid-feedback
                :condition="!$v.typeService.duree_minute.required"
                :error-message="required()"
            />
            <invalid-feedback
                :condition="!$v.typeService.duree_minute.numeric"
                :error-message="numeric()"
            />
            <invalid-feedback
                :condition="!$v.typeService.duree_minute.between"
                :error-message="between($v.typeService.duree_minute.$params.between.min, $v.typeService.duree_minute.$params.between.max)"
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
import TypeServiceModel from "@/models/type_service.model";
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
    typeService: TypeServiceModel.validations
  },
  data() {
    return {
      typeService: new TypeServiceModel(),
      submitStatus: null,
      BSClass: LemkaHelpers.BSClass,
      routes: LemkaHelpers.Routes
    }
  },
  computed:{
    ...mapGetters({typeServices: "TypeServices/typeServices"})
  },
  methods: {
    ...mapActions({
      loadTypeServices: "TypeServices/loadTypeServices",
      createTypeService: 'TypeServices/createTypeService',
      updateTypeService: 'TypeServices/updateTypeService'
    }),
    initialisation: async function() {
      if (this.typeServices.length === 0) {
        await this.loadTypeServices()
      }
    },
    chargerTypeService: async function() {
      this.toggleLoading()
      await this.initialisation()

      if (this.$route.params.id !== undefined) {
        let typeService = await this.$store.getters["TypeServices/typeService"](parseInt(this.$route.params.id))
        if (typeService !== undefined) {
          Object.assign(this.typeService, await typeService)
          this.$route.meta.value = this.typeService.nom
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
          await this.updateTypeService(this.typeService.toUpdatePayload())
        } else {
          await this.createTypeService(this.typeService.toCreatePayload())
        }

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: this.routes.PARAMETRES_SERVICE.name})
        }, 500)
      }
    }
  },
  created() {
    this.chargerTypeService()
  }
}
</script>

<style scoped>

</style>