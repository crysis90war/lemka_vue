<template>
  <b-container>

    <table class="table table-striped text-center">
      <thead>
      <tr>
        <th scope="col" colspan="4">Nous sommes ouverts</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="horaire in horaires" :key="horaire.id">
        <td class="align-middle">{{ horaire.jour }}</td>
        <td v-if="horaire.est_ferme">Fermé</td>
        <td v-else-if="horaire.sur_rdv">Sur rendez-vous</td>
        <td v-else>
          <p>De {{ heure(horaire.heure_ouverture) }} à {{ heure(horaire.pause_debut) }}</p>
          <p>et</p>
          <p>De {{ heure(horaire.pause_fin) }} à {{ heure(horaire.heure_fermeture) }}</p>
        </td>
      </tr>
      </tbody>
    </table>

  </b-container>
</template>

<script>
import {htmlTitle, format} from "@/utils/tools";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "VGHoraire",
  title () {
    return htmlTitle('Horaire')
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({horaires: "Horaires/horaires", loading: "Horaires/horaireLoadingStatus"})
  },

  methods: {
    ...mapActions({loadHoraires: "Horaires/loadHoraires"}),
    heure(time) {
      return format(time)
    }
  },
  created() {
    if (this.horaires.length === 0) {
      this.loadHoraires()
    }
  }
}
</script>

<style scoped>

</style>