<template>
  <div v-if="$route.name === AdminRouteName.ENTREPRISE.name">
    <div v-if="entreprise === null">
      <b-button :to="{name:AdminRouteName.ADD_ENTREPRISE.name}" variant="outline-success">Ajouter informations</b-button>
      <hr>
    </div>
    <pre>{{ JSON.stringify(entreprise, null, '\t') }}</pre>
  </div>
  <router-view v-else></router-view>
</template>

<script>
import {AdminRouteName} from "@/helpers/enums.helper";

export default {
  name: "ViewEntreprise",
  data() {
    return {
      AdminRouteName,
      entreprise: null
    }
  },
}
</script>

<style scoped>

</style>