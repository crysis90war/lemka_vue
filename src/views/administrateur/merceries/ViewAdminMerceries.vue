<template>
  <b-card :title="LemkaEnums.Routes.MERCERIES.value">

  </b-card>
</template>

<script>
import {LemkaEnums} from "@/helpers/enums.helper";

export default {
  name: "ViewAdminInventaire",
  data() {
    return {
      LemkaEnums,
    }
  },
}
</script>

<style scoped>

</style>