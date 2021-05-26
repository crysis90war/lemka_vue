<template>
  <b-card :class="shadow">
    <b-card-body class="text-center">
      <b-spinner variant="secondary" type="grow" size="5em"></b-spinner>
      <strong>Chargement...</strong>
    </b-card-body>
  </b-card>
</template>

<script>
import LemkaHelpers from "@/helpers";

export default {
  name: 'l-spinner',
  data() {
    return {
      shadow: LemkaHelpers.BSClass.CARD_BORDERLESS_SHADOW
    }
  },
}
</script>
