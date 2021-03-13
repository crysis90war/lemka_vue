<template>
  <b-card :title="rendez_vous">

  </b-card>
</template>

<script>
import LemkaHelpers from "@/helpers";

export default {
  name: "RendezVous",
  data() {
    return {
      rendez_vous: LemkaHelpers.Routes.RENDEZ_VOUS.value,
    }
  },
}
</script>

<style scoped>

</style>