<template>
  <div class="user-mensuration">
    <l-spinner v-if="isLoading"/>
    <b-card
        v-else
        :title="id !== undefined ? 'Modifier la mensuration' : 'Ajouter nouvelle mensuration'"
        :class="`${BSClass.CARD_BORDERLESS_SHADOW} my-4`"
    >
      <b-card-body>
        <!-- region isMain -->
        <l-input-field
            :switch-type="true"
            v-model="userMensuration.is_main"
            :label="userMensuration.is_main === true ? 'Principale' : 'Secondaire'"
            description="Veuillez spécifier si la mensuration est principale ou secondaire"
        />
        <!-- endregion -->
        <!-- region Titre -->
        <l-input-field
            :input-type="true"
            v-model="$v.userMensuration.titre.$model"
            label="Titre"
            description="Veuillez encoder le titre pour cette mensuration"
            placeholder="Titre ..."
            :state="validateState($v.userMensuration,'titre')"
        >
          <template #invalid-feedback>
            <invalid-feedback
                :condition="!$v.userMensuration.titre.required"
                :error-message="required()"
            />
            <invalid-feedback
                :condition="!$v.userMensuration.titre.minLength"
                :error-message="minLength($v.userMensuration.titre.$params.minLength.min)"
            />
            <invalid-feedback
                :condition="!$v.userMensuration.titre.maxLength"
                :error-message="maxLength($v.userMensuration.titre.$params.maxLength.max)"
            />
          </template>
        </l-input-field>
        <!-- endregion -->
        <!-- region Remarque -->
        <l-input-field
            :text-area-type="true"
            v-model="$v.userMensuration.remarque.$model"
            label="Remarque"
            description="Veuillez encoder une remarque si nécessaire !"
            :state="validateState($v.userMensuration, 'remarque')"
        >
          <template #invalid-feedback>
            <invalid-feedback
                :condition="!$v.userMensuration.remarque.maxLength"
                :error-message="maxLength($v.userMensuration.remarque.$params.maxLength.max)"
            />
          </template>
        </l-input-field>
        <!-- endregion -->
        <!-- region Buttons -->
        <l-button-group
            :to="routes.USER_MENSURATIONS.name"
            :submit-status="submitStatus"
            :submit="submit"
            position="right"
            :params="getRouteParam()"
        />
        <!-- endregion -->
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import {validationMixin} from "vuelidate";
import UserMensurationModel from "@/models/user/user_mensuration.model";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import InvalidFeedback from "@/components/LInvalidFeedback";
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";
import LInputField from "@/components/LInputField";
import {commonMixin} from "@/mixins/common.mixin";
import LButtonGroup from "@/components/LButtonGroup";

export default {
  name: "VUUserMensurationAddOrUpdate",
  components: {LInputField, InvalidFeedback, LButtonGroup},
  props: {
    id: {
      required: false
    }
  },
  mixins: [validationMixin, validationMessageMixin, commonMixin],
  validations: {
    userMensuration: UserMensurationModel.validations
  },
  data() {
    return {
      userMensuration: new UserMensurationModel(),
      submitStatus: null,
      routes: LemkaHelpers.Routes,
      BSClass: LemkaHelpers.BSClass,
    }
  },
  computed: {
    ...mapGetters({user_mensurations: "UserMensurations/userMensurations"})
  },
  methods: {
    ...mapActions({
      loadUserMensurations: "UserMensurations/loadUserMensurations",
      createUserMensuration: "UserMensurations/createUserMensuration",
      updateUserMensuration: "UserMensurations/updateUserMensuration"
    }),
    initialisation: async function () {
      if (this.user_mensurations.length === 0) {
        await this.loadUserMensurations()
      }
    },
    chargerUserMensuration: async function () {
      this.toggleLoading()
      await this.initialisation()
      if (this.id !== undefined) {
        let user_mensuration = this.$store.getters["UserMensurations/userMensuration"](parseInt(this.$route.params.id))
        if (user_mensuration !== undefined) {
          Object.assign(this.userMensuration, this.$store.getters["UserMensurations/userMensuration"](parseInt(this.$route.params.id)))
          this.toggleLoading()
        } else {
          await this.$router.push({name: this.routes.USER_MENSURATIONS.name})
          this.toggleLoading()
        }
      } else {
        this.toggleLoading()
      }
    },
    getRouteParam: function () {
      if (this.$route.params.id) {
        if (this.id !== undefined) {
          this.setRouteMetaValue()
          return this.id
        } else {
          this.setRouteMetaValue()
          return parseInt(this.$route.params.id)
        }
      } else {
        this.$route.meta.value = 'Ajouter nouvelle mensuration'
        return undefined
      }
    },
    setRouteMetaValue: function() {
      this.$route.meta.value = this.userMensuration.titre
    },
    submit: function () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        if (this.id !== undefined) {
          this.updateUserMensuration(this.userMensuration.toUpdatePayload())
        } else {
          this.createUserMensuration(this.userMensuration.toCreatePayload())
        }

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: this.routes.USER_MENSURATIONS.name})
        }, 500)
      }
    }
  },

  created() {
    this.chargerUserMensuration()
  }
}
</script>

<style scoped>

</style>