<template>
  <b-card :title="AdminRouteName.MERCERIES.value">

  </b-card>
</template>

<script>
import {AdminRouteName} from "@/helpers/enums.helper";

export default {
  name: "ViewInventaire",
  data() {
    return {
      AdminRouteName,
    }
  },
}
</script>

<style scoped>

</style>