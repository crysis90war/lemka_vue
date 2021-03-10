<template>
  <b-card :title="id !== undefined ? typeService.type_service : 'Ajouter un service'" :class="shadow">
    <b-card-body>
      <b-form>
        <b-form-group label="Type service" description="Veuillez encoder le type service">
          <b-form-input v-model.trim="$v.typeService.type_service.$model" placeholder="exemple: Confection"
                        :state="validateState('type_service')">
          </b-form-input>

          <b-form-invalid-feedback>
            <invalid-feedback :condition="!$v.typeService.type_service.required"
                              :error-message="required()">
            </invalid-feedback>
            <invalid-feedback :condition="!$v.typeService.type_service.minLength"
                              :error-message="minLength($v.typeService.type_service.$params.minLength.min)">
            </invalid-feedback>
            <invalid-feedback :condition="!$v.typeService.type_service.maxLength"
                              :error-message="maxLength($v.typeService.type_service.$params.maxLength.max)">
            </invalid-feedback>
            <invalid-feedback :condition="!$v.typeService.type_service.alpha"
                              :error-message="alpha()">
            </invalid-feedback>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Duree en minute" description="Veuillez encoder la durée en minutes">
          <b-form-input v-model.trim="$v.typeService.duree_minute.$model" placeholder="exemple: 30"
                        :state="validateState('duree_minute')"></b-form-input>
          <b-form-invalid-feedback>
            <invalid-feedback :condition="!$v.typeService.duree_minute.required"
                              :error-message="required()">
            </invalid-feedback>
            <invalid-feedback :condition="!$v.typeService.duree_minute.numeric"
                              :error-message="numeric()">
            </invalid-feedback>
            <invalid-feedback :condition="!$v.typeService.duree_minute.between"
                              :error-message="between($v.typeService.duree_minute.$params.between.min, $v.typeService.duree_minute.$params.between.max)">
            </invalid-feedback>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button-group>
          <b-button variant="outline-dark" @click="$router.go(-1)">
            <i class="fas fa-arrow-left"></i>
          </b-button>
          <b-button :variant="id !== undefined ? 'outline-primary' : 'outline-success'"
                    :disabled="submitStatus === 'PENDING'" @click.prevent="submit">
            {{ id !== undefined ? 'Modifier' : 'Créer' }}
          </b-button>
        </b-button-group>
      </b-form>
    </b-card-body>
  </b-card>
</template>

<script>
import TypeServiceModel from "@/models/type_service.model";
import {validationMixin} from "vuelidate";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import LemkaHelpers from "@/helpers";
import InvalidFeedback from "@/components/InvalidFeedback";
import {mapActions} from "vuex";

export default {
  name: "ViewAdminServiceAddOrUpdate",
  components: {InvalidFeedback},
  mixins: [validationMixin, validationMessageMixin],
  validations: {
    typeService: TypeServiceModel.validations
  },
  props: {
    id: {}
  },
  data() {
    return {
      typeService: new TypeServiceModel(),
      submitStatus: null,
      shadow: LemkaHelpers.BSClass.CARD_BORDERLESS_SHADOW,
      routes: LemkaHelpers.Routes
    }
  },
  methods: {
    ...mapActions({
      createTypeService: 'TypeServices/createTypeService',
      updateTypeService: 'TypeServices/updateTypeService'
    }),
    submit: async function () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        if (this.id !== undefined) {
          await this.updateTypeService(this.typeService.toUpdatePayload())
        } else {
          await this.createTypeService(this.typeService.toCreatePayload())
        }

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: this.routes.PARAMETRES_SERVICE.name})
        }, 500)
      }
    },
    validateState: function (name) {
      const {$dirty, $error} = this.$v.typeService[name];
      return $dirty ? !$error : null;
    }
  },
  created() {
    if (this.id) {
      Object.assign(this.typeService, this.$store.getters["TypeServices/typeService"](this.id))
    }
  }
}
</script>

<style scoped>

</style>