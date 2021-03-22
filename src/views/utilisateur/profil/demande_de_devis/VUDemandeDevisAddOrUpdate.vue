<template>
  <div class="demande_devis_add_or_udpate">
    <div :class="shadow">
      <h2>{{id === undefined ? 'Créer une demande de vis' : ``}}</h2>
      <b-form>
        <b-form-group label="label" description="description">
          <b-form-input>

          </b-form-input>
        </b-form-group>
      </b-form>
    </div>
    <b-jumbotron>
      <pre>{{demande_devis}}</pre>
    </b-jumbotron>
  </div>
</template>

<script>
import LemkaHelpers from "@/helpers";
import DemandeDevisModel from "@/models/demande_devis.model";

export default {
  name: "VUDemandeDevisAddOrUpdate",
  props: {
    id: {
      required: false
    },
  },
  data() {
    return {
      shadow: LemkaHelpers.BSClass.CARD_BORDERLESS_SHADOW,
      demande_devis: new DemandeDevisModel(),
      label: "label",
      description: "description"
    }
  },
}
</script>

<style scoped>

</style>