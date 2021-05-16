<template>
  <div class="rendez_vous">
    <div class="d-flex mb-3">
      <b-button
          variant="outline-secondary"
          @click="dateNavigation(false)"
          :disabled="selected === ''"
      ><i class="fas fa-angle-double-left"></i></b-button>
      <b-datepicker
          v-model="selected"
          today-button
          label-today-button="Aujourd'hui"
          label-no-date-selected="Aucune date sélectionnée"
          class="mx-2"
      />
      <b-button
          variant="outline-secondary"
          @click="dateNavigation()"
          :disabled="selected === ''"
      ><i class="fas fa-angle-double-right"></i></b-button>
    </div>

    <div>
      <div v-if="getRdvFromDate(selected).length === 0" class="text-center my-5">
        <h5>Vous n'avez pas de rendez-vous le {{ selected | getFullDate }}</h5>
      </div>
      <b-row v-else>
        <b-col
            lg="12"
            v-for="(rdv, index) in selected === '' ? getAllRDV() : getRdvFromDate(selected)"
            :key="index">
          <!-- Via space separated string of IDs passed to directive value -->
          <b-button size="lg" v-b-toggle="`collapse-rdv-${rdv.id}`" class="w-100 mb-2  text-dark border" variant="outline-light">
            {{ rdv.user.first_name }} {{ rdv.user.last_name }} : {{ rdv.start }} - {{ rdv.end }}
          </b-button>

          <b-collapse :id="`collapse-rdv-${rdv.id}`">
            <b-card>
              <b-row>
                <b-col lg="4"><h5>Service : </h5>
                  <p>{{ rdv.type_service.type_service }}</p>
                </b-col>
                <b-col lg="4"><h5>Client : </h5>
                  <p>{{ clientInfo(rdv.user) }}</p>
                </b-col>
              </b-row>
              <div v-if="rdv.devis !== null">
                <b-button v-b-toggle="`collapse-devis-${rdv.numero_devis}`">{{rdv.devis.numero_devis}}</b-button>
                <b-collapse :id="`collapse-devis-${rdv.numero_devis}`">
                  <b-card></b-card>
                </b-collapse>
              </div>
            </b-card>
          </b-collapse>
        </b-col>
      </b-row>
    </div>

    <l-jumbotron class="mt-5" :data="rendezVous" header="Rendez-vous"/>
  </div>
</template>

<script>
import {commonMixin} from "@/mixins/common.mixin";
import {mapActions, mapGetters} from "vuex";
import {format} from "date-fns";

export default {
  name: "VARendezVous",
  mixins: [commonMixin],
  data() {
    return {
      selected: '',
    }
  },
  computed: {
    ...mapGetters({rendezVous: "RendezVous/adminRendezVouss"})
  },
  methods: {
    ...mapActions({loadRendezVous: "RendezVous/loadAdminRDV"}),
    join: function (t, a, s) {
      function format(m) {
        let f = new Intl.DateTimeFormat('fr', m);
        return f.format(t);
      }

      return a.map(format).join(s);
    },
    getRdvFromDate: function (date) {
      return this.rendezVous.filter(item => item.date === date)
    },
    getAllRDV: function () {
      return this.rendezVous
    },
    dateNavigation: function (forward = true) {
      let date = new Date(this.selected)
      if (forward === true) {
        let newDate = new Date(date.setDate(date.getDate() + 1))
        this.selected = format(newDate, "yyyy-MM-dd")
      } else {
        let newDate = new Date(date.setDate(date.getDate() - 1))
        this.selected = format(newDate, "yyyy-MM-dd")
      }
    },
    clientInfo: function (user) {
      if (user.first_name === "" || user.last_name === "") {
        return user.username
      } else {
        return `${user.first_name} ${user.last_name}`
      }
    }
  },
  created() {
    this.loadRendezVous()
    this.selected = format(new Date(), "yyyy-MM-dd")
  }
}
</script>

<style scoped>

</style>