<template>
  <div>DEVIS</div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "VUDevis",
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {
    ...mapActions({loadDevis: "Devis/loadDevis"})
  }
}
</script>

<style scoped>

</style>