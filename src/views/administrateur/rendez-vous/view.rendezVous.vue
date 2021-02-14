<template>
  <b-card :title="rendez_vous">

  </b-card>
</template>

<script>
import {LemkaEnums} from "@/helpers/enums.helper";

export default {
  name: "RendezVous",
  data() {
    return {
      rendez_vous: LemkaEnums.Routes.RENDEZ_VOUS.value,
    }
  },
}
</script>

<style scoped>

</style>