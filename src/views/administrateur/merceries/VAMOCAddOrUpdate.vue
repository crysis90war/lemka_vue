<template>
  <div class="MOCAddOrUpdate">
    <b-container>
      <b-button-group>
        <b-button variant="outline-dark"
                  @click="retour">
          <i class="fas fa-arrow-left"></i>
        </b-button>
        <b-button :variant="id !== undefined ? 'outline-primary' : 'outline-success'" @click.prevent="submit">
          {{ id !== undefined ? 'Modifier' : 'Créer' }}
        </b-button>
        <b-button v-if="id !== undefined" variant="outline-danger">
          Supprimer
        </b-button>
      </b-button-group>

      <b-form-group label="Valeur" description="Veuillez encoder la valeur">
<!--        <b-form-input v-model="item.valeur"></b-form-input>-->
      </b-form-group>

      <b-jumbotron header="Opt Carac" class="mt-4">
        <pre>{{monobject}}</pre>
        {{mercerie_id}}
        {{option_id}}
      </b-jumbotron>
    </b-container>

  </div>
</template>

<script>
import LemkaHelpers from "@/helpers";
import MercerieOptionChatacteristicModel from "@/models/mercerie_option_chatacteristic.model";

export default {
  name: "VAMOCAddOrUpdate",
  props: {
    mercerie_id: {
      required: true
    },
    option_id: {},
    id: {}
  },
  data() {
    return {
      routes: LemkaHelpers.Routes,
      monobject: new MercerieOptionChatacteristicModel()
    }
  },
  methods: {
    retour: function() {
      this.$router.push({
        name: this.routes.MO_ADD_OR_UPDATE.name,
        params: {
          mercerie_id: this.mercerie_id,
          id: this.option_id
        }})
    },
    submit: function () {

    }
  },
}
</script>

<style scoped>

</style>