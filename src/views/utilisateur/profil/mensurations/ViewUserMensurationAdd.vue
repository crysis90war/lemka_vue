<template>
  <b-card title="Ajouter une mensuration" class="my-4" :class="bootstrap.shadow">
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
          <b-button variant="outline-success" type="submit" :disabled="submitStatus === 'PENDING'">Créer</b-button>
          <b-button variant="outline-danger" :to="{name: links.mensurationLink}">Retour</b-button>
        </b-button-group>
      </b-form>
    </b-card-body>
  </b-card>
</template>

<script>
import {validationMixin} from "vuelidate";
import UserMensurationModel from "@/models/userMensuration.model";
import {LemkaEnums} from "@/helpers/enums.helper";

export default {
  name: "ViewUserMensurationAdd",
  mixins: validationMixin,
  validations: {
    userMensuration: UserMensurationModel.validations
  },
  data() {
    return {
      userMensuration: new UserMensurationModel(),
      submitStatus: null,
      links: {
        mensurationLink: LemkaEnums.Routes.MENSURATIONS.name
      },
      bootstrap: {
        shadow: LemkaEnums.BSClass.CARD_BORDERLESS_SHADOW
      },
    }
  },
  methods: {
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        await UserMensurationModel.createUserMensuration(this.userMensuration.toCreatePayload())

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: this.links.mensurationLink})
        }, 500)
      }
    },

    validateState(item) {
      const {$dirty, $error} = item
      return $dirty ? !$error : null;
    },
  },
}
</script>

<style scoped>

</style>