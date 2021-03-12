<template>
  <b-container>

    <table class="table table-striped">
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
import Outils from "@/mixins/outils.mixin";

export default {
  name: "VGHoraire",

  data() {
    return {
      title: 'Horaire',
      horaires: {
        jour: String,
        heure_ouverture: String,
        pause_debut: String,
        pause_fin: String,
        heure_fermeture: String,
        sur_rdv: Boolean,
        est_ferme: Boolean
      }
    }
  },

  title () {
    return Outils.htmlTitle(this.title)
  },

  created() {
  },

  methods: {
    heure(time) {
      return Outils.format(time)
    }
  }
}
</script>

<style scoped>

</style>