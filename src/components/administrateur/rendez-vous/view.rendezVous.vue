<template>
  <b-card :title="AdminRouteName.RENDEZ_VOUS.value">

  </b-card>
</template>

<script>
import {AdminRouteName} from "@/helpers/enums.helper";

export default {
  name: "RendezVous",
  data() {
    return {
      AdminRouteName,
    }
  },
}
</script>

<style scoped>

</style>