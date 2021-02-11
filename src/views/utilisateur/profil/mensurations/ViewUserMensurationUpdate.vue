<template>
  <b-card :class="bootstrap.shadow">
    <b-card-body>
      <b-form @submit.prevent="submit">
        <b-form-group :label="userMensuration.is_main === true ? 'Principale' : 'Secondaire'"
                      description="Veuillez spécifier si la mensuration est principale ou secondaire">
          <b-form-checkbox v-model="userMensuration.is_main" switch></b-form-checkbox>
        </b-form-group>
        <b-form-group id="input-group-titre"
                      label="Titre"
                      description="Veuillez encoder le titre pour cette mensuration"
                      label-for="input-titre">
          <b-form-input id="input-titre"
                        name="input-name"
                        placeholder="Titre ..."
                        v-model="$v.userMensuration.titre.$model"
                        :state="validateState($v.userMensuration.titre)"></b-form-input>
          <b-form-invalid-feedback>
            <span v-if="!$v.userMensuration.titre.required">Ce champ est obligatoire.</span><br>
            <span v-if="!$v.userMensuration.titre.minLength">Ce champ doit contenir au moins 3 caractères.</span><br>
            <span v-if="!$v.userMensuration.titre.maxLength">Ce champ doit contenir pas plus de 100 caractères.</span><br>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button-group>
          <b-button variant="outline-success" type="submit" :disabled="submitStatus === 'PENDING'">Modifier</b-button>
          <b-button variant="outline-danger" :to="{name: links.mensurations}">Retour</b-button>
        </b-button-group>
      </b-form>
    </b-card-body>
  </b-card>
</template>

<script>
import {LemkaEnums} from "@/helpers/enums.helper";
import UserMensurationModel from "@/models/userMensuration.model";
import {validationMixin} from "vuelidate";

export default {
  name: "ViewUserMensurationUpdate",
  mixins: validationMixin,
  validations: {
    userMensuration: UserMensurationModel.validations
  },
  props: {
    id: {
      required:true
    },
  },
  data() {
    return {
      submitStatus: null,
      userMensuration: new UserMensurationModel(),
      links: {
        mensurations: LemkaEnums.Routes.MENSURATIONS.name
      },
      bootstrap: {
        shadow: LemkaEnums.BSClass.CARD_BORDERLESS_SHADOW
      },
    }
  },
  methods: {
    async chargerUserMensuration() {
      Object.assign(this.userMensuration, await UserMensurationModel.fetchUserMensuration(this.id))
    },
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        await UserMensurationModel.updateUserMensuration(this.id, this.userMensuration.toUpdatePayload())

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: LemkaEnums.Routes.MENSURATIONS.name})
        }, 500)
      }
    },
    validateState(item) {
      const {$dirty, $error} = item
      return $dirty ? !$error : null;
    },
  },
  created() {
    this.chargerUserMensuration()
  }
}
</script>

<style scoped>

</style>