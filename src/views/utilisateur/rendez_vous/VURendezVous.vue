<template>
  <div
      v-if="$route.name === routes.RENDEZ_VOUS_USER.name"
      class="rendez_vous"
  >
    <b-card
        :class="BSClass.CARD_BORDERLESS_SHADOW"
    >
      <div class="text-right">
        <p>{{ new Date() | getFullDate }}, {{ time }}</p>
      </div>
      <b-tabs>
        <b-tab title="Mes rendez-vous à venir">
          <b-card-body>
            <b-button
                class="mb-3"
                size="sm"
                variant="outline-success"
                :to="{name: routes.RENDEZ_VOUS_USER_RESERVATION.name}"
            >
              Prendre un rendez-vous
            </b-button>

            <b-table
                :items="rendezVousAVenir"
                :fields="todayFields"
                :busy="busy"
                show-empty
                :tbody-tr-class="rowClass"
                class="text-center"
            >
              <template #empty>
                <l-table-empty/>
              </template>
              <template #table-busy>
                <l-table-busy/>
              </template>
              <template #cell(created_at)="data">
                <p>{{ new Date(data.item.created_at).toLocaleDateString() }}</p>
              </template>
              <template #cell(type_service)="data">
                <p>{{ data.item.type_service.type_service }}</p>
              </template>
              <template #cell(devis)="data">
                <p>{{ data.item.devis !== null ? data.item.devis.numero_devis : 'X' }}</p>
              </template>
              <template #cell(actions)="data">
                <b-button
                    size="sm"
                    variant="outline-info"
                    @click="showModal(`rendez-vous-modal-${data.item.id}`)"
                >
                  <i :class="icons.INFO"></i>
                </b-button>
                <b-modal
                    :id="`rendez-vous-modal-${data.item.id}`"
                    :title="data.item.date | getFullDate"
                >
                  <div class="text-center">
                    <p>Votre rendez-vous le</p>
                    <p><strong>{{ data.item.date | getFullDate }}</strong></p>
                    <p>de <strong>{{ data.item.start }}</strong> à <strong>{{ data.item.end }}</strong></p>
                    <p>Pour le service <strong>{{ data.item.type_service.type_service }}</strong></p>
                    <p v-if="data.item.devis !== null">Et pour le devis numero <strong>{{ data.item.devis.numero_devis }}</strong></p>
                  </div>
                  <template #modal-footer>
                    <div class="text-right">
                      <b-button-group>
                        <b-button
                            variant="secondary"
                            @click="hideModal(`rendez-vous-modal-${data.item.id}`)"
                        >
                          Fermer
                        </b-button>
                        <b-button
                            variant="outline-danger"
                            @click="showModal(`annuler-rendez-vous-modal-${data.item.id}`)"
                        >
                          Annuler le rendez-vous
                        </b-button>
                      </b-button-group>
                    </div>
                  </template>
                </b-modal>
                <b-modal
                    title="Annulation du rendez-vous"
                    :id="`annuler-rendez-vous-modal-${data.item.id}`"
                >
                  <div class="text-center">
                    <p>Êtes-vous sure de vouloir annuler votre rendez-vous</p>
                    <p>de <strong>{{ data.item.date | getFullDate }}</strong></p>
                    <p>de <strong>{{ data.item.start }}</strong> à <strong>{{ data.item.end }}</strong></p>
                  </div>
                  <template #modal-footer>
                    <div class="text-right">
                      <b-button-group>
                        <b-button
                            variant="secondary"
                            @click="hideModal(`annuler-rendez-vous-modal-${data.item.id}`)"
                        >
                          Annuler
                        </b-button>
                        <b-button
                            variant="outline-danger"
                            @click="cancelAppointment(data.item)"
                        >
                          Oui
                        </b-button>
                      </b-button-group>
                    </div>
                  </template>
                </b-modal>
              </template>
            </b-table>
          </b-card-body>
        </b-tab>

        <b-tab title="Mes rendez-vous passés">
          <b-card-body>
            <b-table
                :items="rendezVousPasses"
                :fields="commonFields"
                :busy="busy"
                show-empty
            >
              <template #empty>
                <l-table-empty/>
              </template>
              <template #table-busy>
                <l-table-busy/>
              </template>

              <template #cell(created_at)="data">
                <p>{{ new Date(data.item.created_at).toLocaleDateString() }}</p>
              </template>
              <template #cell(type_service)="data">
                <p>{{ data.item.type_service.type_service }}</p>
              </template>
              <template #cell(devis)="data">
                <p>{{ data.item.devis !== null ? data.item.devis.numero_devis : 'X' }}</p>
              </template>
            </b-table>
          </b-card-body>
        </b-tab>
        <b-tab title="Mes rendez-vous annulés">
          <b-card-body>
            <b-table
                :items="rendezVousAnnules"
                :fields="commonFields"
                :busy="busy"
                show-empty
            >
              <template #empty>
                <l-table-empty/>
              </template>
              <template #table-busy>
                <l-table-busy/>
              </template>

              <template #cell(created_at)="data">
                <p>{{ new Date(data.item.created_at).toLocaleDateString() }}</p>
              </template>
              <template #cell(type_service)="data">
                <p>{{ data.item.type_service.type_service }}</p>
              </template>
              <template #cell(devis)="data">
                <p>{{ data.item.devis !== null ? data.item.devis.numero_devis : 'X' }}</p>
              </template>
            </b-table>
          </b-card-body>
        </b-tab>
      </b-tabs>
    </b-card>

  </div>
  <router-view v-else/>
</template>

<script>
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";
import {htmlTitle} from "@/utils/tools";
import RendezVousModel from "@/models/rendez_vous.model";
import {date2str} from "@/utils/filters";
import {commonMixin} from "@/mixins/common.mixin";

export default {
  name: "VURendezVous",
  mixins: [commonMixin],
  title() {
    return htmlTitle('Mes rendez-vous')
  },
  data() {
    return {
      routes: LemkaHelpers.Routes,
      BSClass: LemkaHelpers.BSClass,
      icons: LemkaHelpers.FontAwesomeIcons,

      commonFields: RendezVousModel.commonTableFields,
      todayFields: RendezVousModel.todayAndFuturTableFields,

      interval: null,
      time: null
    }
  },
  computed: {
    ...mapGetters({rendezVouss: 'RendezVous/rendezvouss', busy: 'RendezVous/loadingStatus'}),
    rendezVousAVenir() {
      return this.rendezVouss.filter(item => item.est_annule === false && item.date >= this.today).reverse()
    },
    rendezVousPasses() {
      return this.rendezVouss.filter(item =>
          item.est_annule === false &&
          item.date < this.today
      )
    },
    rendezVousAnnules() {
      return this.rendezVouss.filter(item => item.est_annule === true)
    },
    getDate() {
      return Intl.DateTimeFormat('fr').format(new Date())
    },
    today() {
      return date2str(new Date(), 'yyyy-MM-dd')
    }
  },
  methods: {
    ...mapActions({loadRendezVous: "RendezVous/loadRendezVous", annulerRendezVous: 'RendezVous/annulerRendezVous'}),
    initialisation: async function () {
      if (this.rendezVouss.length === 0) {
        await this.loadRendezVous()
      }
    },
    intervalFonction: function () {
      return setInterval(() => {
        // Concise way to format time according to system locale.
        // In my case this returns "3:48:00 am"
        this.time = Intl.DateTimeFormat(navigator.language, {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        }).format()
      }, 1000)
    },
    cancelAppointment: function(item) {
      this.annulerRendezVous(item)
      this.hideModal(`annuler-rendez-vous-modal-${item.id}`)
      this.hideModal(`rendez-vous-modal-${item.id}`)
    },
    rowClass(item, type) {
      if (!item || type !== 'row') return
      if (item.date === this.today && (item.start < this.time)) return 'table-danger'
      if (item.date === this.today && (item.start <= this.time && this.time <= item.end)) return 'table-success'
      if (item.date > this.today) return 'table-info'
    }
  },
  created() {
    this.initialisation()
    this.interval = this.intervalFonction()
  }
}
</script>

<style scoped>

</style>