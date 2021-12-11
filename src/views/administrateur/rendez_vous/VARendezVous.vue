<template>
  <div class="rendez_vous">
    <hr>
    <h4>Ancien</h4>
    <hr>
    <div class="d-flex mb-3">
      <b-button
          variant="outline-secondary"
          @click="dateNavigation(false)"
          :disabled="selected === ''"
      ><i class="fas fa-angle-double-left"></i>
      </b-button>

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
          <b-button size="lg" v-b-toggle="`collapse-rdv-${rdv.id}`" class="w-100 mb-2  text-dark border"
                    variant="outline-light">
            {{ clientInfo(rdv.user) }} : {{ rdv.start }} - {{ rdv.end }}
          </b-button>

          <b-collapse :id="`collapse-rdv-${rdv.id}`">
            <b-card>
              <b-row>
                <b-col lg="4"><h5>Service : </h5>
                  <p>{{ rdv.service.nom }}</p>
                </b-col>
                <b-col lg="4"><h5>Client : </h5>
                  <p>{{ clientInfo(rdv.user) }}</p>
                </b-col>
              </b-row>
              <div v-if="rdv.devis !== null">
                <b-button variant="outline-light" class="text-dark" v-b-toggle="`collapse-devis-${rdv.numero_devis}`">
                  Devis n° {{ rdv.devis.numero_devis }}
                </b-button>
                <b-collapse :id="`collapse-devis-${rdv.numero_devis}`">
                  <b-card></b-card>
                </b-collapse>
              </div>
            </b-card>
          </b-collapse>
        </b-col>
      </b-row>
    </div>

    <hr>
    <h4>Nouveau</h4>
    <hr>
    <b-input type="month" v-model="monthYear"></b-input>
    <b-tabs pills card class="mt-2">
      <b-tab title="Active">
        <b-card-text>
          <b-table
              :items="rendezVousActive"
              :fields="champsTable"
              stacked="md"
              small
              show-empty
              hover
              :tbody-tr-class="rowClass"
              class="text-center mt-3"
          >
            <template #cell(date)="data">
              {{ data.item.date | getFullDate }}
            </template>

            <template #cell(service)="data">
              {{ data.item.service.nom }}
            </template>

            <template #cell(devis)="data">
              <i :class="data.item.devis !== null ? 'fas fa-check text-success' : 'fas fa-times text-danger'"></i>
            </template>

            <template #cell(client)="data">
              {{ clientInfo(data.item.user) }}
            </template>

            <template #cell(actions)="data">
              <span hidden>{{ data.item.id }}</span>
              <b-button size="sm" variant="outline-primary" v-b-modal.modal-1 @click="selectRdv(data.item)">
                <i class="fas fa-eye"></i>
              </b-button>
            </template>
          </b-table>
        </b-card-text>
      </b-tab>

      <b-tab title="Annulés">
        <b-card-text>
          <b-table
              :items="rendezVousAnnules"
              :fields="champsTable"
              stacked="md"
              small
              show-empty
              hover
              class="text-center mt-3"
          >
            <template #cell(date)="data">
              {{ data.item.date | getFullDate }}
            </template>

            <template #cell(service)="data">
              {{ data.item.service.nom }}
            </template>

            <template #cell(devis)="data">
              <i :class="data.item.devis !== null ? 'fas fa-check text-success' : 'fas fa-times text-danger'"></i>
            </template>

            <template #cell(client)="data">
              {{ clientInfo(data.item.user) }}
            </template>

            <template #cell(actions)="data">
              <span hidden>{{ data.item.id }}</span>
              <b-button size="sm" variant="outline-primary" v-b-modal.modal-1 @click="selectRdv(data.item)">
                <i class="fas fa-eye"></i>
              </b-button>
            </template>
          </b-table>
        </b-card-text>
      </b-tab>
    </b-tabs>

    <l-jumbotron hidden :data="selectedRdv"></l-jumbotron>

    <div v-if="selectedRdv !== null">
      <b-modal id="modal-1" :title="selectedRdv.user.email">

        <div class="text-center">
          <h4><strong>{{ selectedRdv.user.first_name + " " + selectedRdv.user.last_name }}</strong></h4>
          <p><strong>{{ selectedRdv.date | getFullDate }}</strong></p>
          <p>de <strong>{{ selectedRdv.start }}</strong> à <strong>{{ selectedRdv.end }}</strong></p>
          <p>Pour le service <strong>{{ selectedRdv.service.nom }}</strong></p>
          <div v-if="selectedRdv.devis !== null">
            <p>
              <strong>Devis n° : </strong>
              <router-link :to="{name: 'VADevisAddOrUpdate', params: { id: selectedRdv.devis.id }}">
                {{ selectedRdv.devis.numero_devis }}
              </router-link>
            </p>
          </div>
        </div>

        <!--        <template #modal-footer>-->
        <!--          <div class="text-right">-->
        <!--            <b-button-group>-->
        <!--              <b-button variant="secondary">-->
        <!--                Fermer-->
        <!--              </b-button>-->
        <!--              <b-button variant="outline-danger">-->
        <!--                Annuler le rendez-vous-->
        <!--              </b-button>-->
        <!--            </b-button-group>-->
        <!--          </div>-->
        <!--        </template>-->
      </b-modal>
    </div>

  </div>
</template>

<script>
import {commonMixin} from "@/mixins/common.mixin";
import {mapActions, mapGetters} from "vuex";
import {format} from "date-fns";
import {htmlTitle} from "@/utils/tools";

export default {
  name: "VARendezVous",
  mixins: [commonMixin],
  title() {
    return htmlTitle('Rendez-vous')
  },
  data() {
    return {
      selected: '',
      monthYear: format(new Date(), "yyyy-MM"),
      champsTable: [
        {key: 'date', label: 'Date', sortable: true},
        {key: 'service', label: 'Service', sortable: false},
        {key: 'start', label: 'De', sortable: false},
        {key: 'end', label: 'À', sortable: false},
        {key: 'client', label: 'Client(e)', sortable: false},
        {key: 'devis', label: 'Devis', sortable: false},
        {key: 'actions', label: 'Actions'}
      ],
      selectedRdv: null
    }
  },
  computed: {
    ...mapGetters({rendezVous: "RendezVous/adminRendezVouss"}),
    currentYearMonthRdv() {
      // console.table(this.rendezVous);
      return this.rendezVous.filter(item => item.date.includes(this.monthYear));
    },
    rendezVousActive() {
      return this.currentYearMonthRdv.filter(item => item.est_annule === false)
    },
    rendezVousAnnules() {
      return this.currentYearMonthRdv.filter(item => item.est_annule === true)
    }
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
        return user.email
      } else {
        return `${user.first_name} ${user.last_name}`
      }
    },

    rowClass(item, type) {
      if (!item || type !== 'row') return
      let today = format(new Date(), "MM-dd");
      let itemDay = format(new Date(item.date), "MM-dd");
      if (today === itemDay) return 'table-success'
    },

    selectRdv(item) {
      this.selectedRdv = item;
    }

    // loadCurrentMonthRdv: function () {
    //   this.currentYearMonthRdv = this.getRdvFromDate(this.monthYear);
    // },
  },
  created() {
    this.loadRendezVous()
    this.selected = format(new Date(), "yyyy-MM-dd")
  },
}
</script>

<style scoped>

</style>