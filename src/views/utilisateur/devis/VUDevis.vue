<template>
  <div>
    <b-table :items="userDevis" stacked="lg" fixed></b-table>
    <pre>{{ userDevis }}</pre>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "VUDevis",
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters({userDevis: "Devis/deviss"}),
  },
  methods: {
    ...mapActions({loadUserDevis: "Devis/loadUserDevis"}),
    loadOrRefresh: async function() {
      await this.loadUserDevis()
    }
  },
  created() {
    this.loadOrRefresh()
  }
}
</script>

<style scoped>

</style>