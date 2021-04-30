<template>
  <div
      v-if="$route.name === routes.RENDEZ_VOUS_USER.name"
      class="rendez_vous"
  >
    <b-card
        title="Rendez-vous"
        :class="BSClass.CARD_BORDERLESS_SHADOW"
    >
      <b-card-body>

      </b-card-body>
    </b-card>

  </div>
  <router-view v-else/>
</template>

<script>
import LemkaHelpers from "@/helpers";

export default {
  name: "VURendezVous",
  data() {
    return {
      routes: LemkaHelpers.Routes,
      BSClass: LemkaHelpers.BSClass
    }
  },
}
</script>

<style scoped>

</style>