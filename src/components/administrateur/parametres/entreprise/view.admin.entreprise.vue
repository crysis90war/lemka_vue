<template>
  <div v-if="$route.name === AdminRouteName.ENTREPRISE.name">
    <b-card>
      <b-card-body>
        <div v-if="Object.keys(entreprise).length === 0 && entreprise.constructor === Object">
          <b-button :to="{name:AdminRouteName.ADD_ENTREPRISE.name}" variant="outline-success">Ajouter informations</b-button>
        </div>
        <pre class="mt-2">{{ JSON.stringify(entreprise, null, '\t') }}</pre>
      </b-card-body>
    </b-card>

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
      entreprise: {}
    }
  },
}
</script>

<style scoped>

</style>