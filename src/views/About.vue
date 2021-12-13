<template>
  <div class="about">
    <b-container>
      <div class="text-center my-5">
        <h2 class="h1-lemka">À propos de nous</h2>
      </div>
      <div class="text-justify my-5">
        <p style="white-space: pre-wrap">{{ entreprise.a_propos_complet }}</p>
      </div>
    </b-container>
  </div>
</template>

<script>
import {htmlTitle} from "@/utils/tools";
import {mapGetters, mapActions} from "vuex";

export default {
  name: 'About',
  title() {
    return htmlTitle('À propos')
  },
  data() {
    return {}
  },
  created() {
    this.loadEntreprises()
  },
  computed: {
    ...mapGetters({entreprise: 'Entreprises/entreprise'})
  },
  methods: {
    ...mapActions({loadEntreprises: "Entreprises/loadEntreprises"}),
  },
}
</script>