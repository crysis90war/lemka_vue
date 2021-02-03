<template>
  <b-card title="Update" :class="bootstrap.shadow">
    <b-card-body>
      UPDATE
    </b-card-body>
  </b-card>
</template>

<script>
import {LemkaEnums} from "@/helpers/enums.helper";

export default {
  name: "ViewUserInformationsUpdate",
  data() {
    return {
      bootstrap: {
        shadow: LemkaEnums.BootstrapClass.CARD_BORDERLESS_SHADOW
      },
    }
  },
}
</script>

<style scoped>

</style>