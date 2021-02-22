<template>
  <b-card title="Ajouter un service" :class="shadow">
    <b-card-body>
      <b-form @submit.prevent="onSubmit">
        <b-form-group id="input-group-type-service"
                      label-for="input-type-service"
                      label="Type service"
                      description="Veuillez encoder le type service">
          <b-form-input v-model="$v.typeService.type_service.$model"
                        id="input-type-service"
                        name="input-type-service"
                        placeholder="exemple: Confection"
                        :state="validateState('type_service')"></b-form-input>
          <b-form-invalid-feedback>
            <b-badge v-if="!$v.typeService.type_service.required" pill variant="danger">
              {{ required() }}
            </b-badge>
            <b-badge v-if="!$v.typeService.type_service.minLength" pill variant="danger">
              {{ minLength($v.typeService.type_service.$params.minLength.min) }}
            </b-badge>
            <b-badge v-if="!$v.typeService.type_service.maxLength" pill variant="danger">
              {{ maxLength($v.typeService.type_service.$params.maxLength.max) }}
            </b-badge>
            <b-badge v-if="!$v.typeService.type_service.alpha" pill variant="danger">
              {{ alpha() }}
            </b-badge>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-group-duree-minute"
                      label-for="input-duree-minute"
                      label="Duree en minute"
                      description="Veuillez encoder la durée en minutes">
          <b-form-input v-model="$v.typeService.duree_minute.$model"
                        id="input-duree-minute"
                        name="input-duree-minutes"
                        placeholder="exemple: 30"
                        :state="validateState('duree_minute')"></b-form-input>
          <b-form-invalid-feedback>
            <b-badge v-if="!$v.typeService.duree_minute.required" pill variant="danger">
              {{ required() }}
            </b-badge>
            <b-badge v-if="!$v.typeService.duree_minute.between" pill variant="danger">
              {{ between($v.typeService.duree_minute.$params.between.min, $v.typeService.duree_minute.$params.between.max) }}
            </b-badge>
            <b-badge v-if="!$v.typeService.duree_minute.numeric" pill variant="danger">
              {{ numeric() }}
            </b-badge>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button-group>
          <b-button variant="outline-success" type="submit" :disabled="submitStatus === 'PENDING'">Ajouter</b-button>
          <b-button variant="outline-danger" @click="$router.go(-1)">Retour</b-button>
        </b-button-group>
      </b-form>
    </b-card-body>
  </b-card>
</template>

<script>
import {LemkaEnums} from "@/helpers/enums.helper";
import TypeServiceModel from "@/models/typeService.model";
import {validationMixin} from "vuelidate";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";

export default {
  name: "ViewAdminServiceAdd",
  mixins: [validationMixin, validationMessageMixin],
  validations: {
    typeService: TypeServiceModel.validations
  },

  data() {
    return {
      typeService: new TypeServiceModel(),
      response: null,
      submitStatus: null,
      shadow: LemkaEnums.BSClass.CARD_BORDERLESS_SHADOW,
    }
  },

  methods: {
    onSubmit: async function () {

      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        let response = await TypeServiceModel.createTypeService(this.typeService.toCreatePayload())
        if (response.status === 201) {
          this.$router.go(-1)
        }

        setTimeout(() => {
          this.submitStatus = 'OK'
          if (response.status === 201) {
            this.$router.go(-1)
          }
        }, 500)
      }
    },
    validateState: function (name) {
      const {$dirty, $error} = this.$v.typeService[name];
      return $dirty ? !$error : null;
    },
  },
}
</script>

<style scoped>

</style>