<template>
  <div class="rendez_vous_reservation">
    <b-card
        title="Prendre rendez-vous "
        :class="BSClass.CARD_BORDERLESS_SHADOW"
    >
      <b-card-body>
        <div>
          <b-form-group
              label="Service"
              description="Veuillez selectionner le service de l'article"
          >
            <multiselect
                v-model="rendezVous.type_service"
                :options="typeServices"
                :allow-empty="false"
                :show-labels="false"
                label="type_service"
                track-by="type_service"
                :class="{ 'invalid': invalidTypeService }"
                @close="toucheTypeService"
            >
              <template slot="singleLabel" slot-scope="{ option }">
                <span>{{ option.type_service.id !== null ? option.type_service : null }}</span>
              </template>
              <template slot="option" slot-scope="{ option }">
                <span>{{ option.type_service }} - {{ option.duree_minute }} minutes</span>
              </template>
              <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
            </multiselect>
            <span class="text-danger" v-show="invalidTypeService"><small>Ce champ est requis</small></span>
          </b-form-group>

          <div v-if="rendezVous.type_service.id !== null">
            <b-form-group
                label="Date"
                description="Veuillez choissir une date"
            >
              <b-form-datepicker
                  v-model="$v.rendezVous.date.$model"
                  :min="getMinMaxDates().min"
                  :max="getMinMaxDates().max"
                  locale="fr"
                  :date-disabled-fn="dateDisabled"
                  close-button
                  label-close-button="Fermer"
                  label-no-date-selected="Aucune date sélectionnée"
                  @context="onContext(rendezVous.date)"
                  :state="validationState('date')"
              />
              <b-form-invalid-feedback>
                <l-invalid-feedback
                    :condition="!$v.rendezVous.date.required"
                    :error-message="required()"
                />
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div v-if="rendezVous.date !== null">
            <b-badge :variant="available_hours.available_hours.length === 0 ? 'warning' : 'success'">{{ available_hours.message }}</b-badge>
            <b-list-group>
              <b-list-group-item
                  v-for="(heure, index) in available_hours.available_hours"
                  :key="index"
                  button
                  @click="selectHour(heure)"
              >
                {{ heure }}
              </b-list-group-item>
            </b-list-group>
            <b-badge
                v-if="startError === true"
                variant="danger"
            >
              Veuillez selectionner une heure !
            </b-badge>
          </div>
          <hr>
          <div class="mb-4">
            <h4 class="text-secondary">Optionnel</h4>
          </div>
          <b-form-group
              label="Devis"
              description="Veuillez selectionner le devis que vous avez validé."
          >
            <multiselect
                v-model="rendezVous.devis"
                :options="deviss"
                :show-labels="false"
                :allow-empty="true"
                label="Devis"
            >
              <template slot="singleLabel" slot-scope="{ option }">
                <span>{{ option.id !== null ? option.numero_devis : null }}</span>
              </template>
              <template slot="option" slot-scope="{ option }">
                <span>{{ option.numero_devis }} | {{ option.demande_devis.titre }}</span>
              </template>
              <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
            </multiselect>
          </b-form-group>
        </div>
        <div class="text-right">
          <b-button-group>
            <b-button
                variant="outline-dark"
                :to="{name: routes.RENDEZ_VOUS_USER.name}"
            >
              <i class="fas fa-arrow-left"></i></b-button>
            <b-button
                variant="outline-success"
                :disabled="rendezVous.start === null || submitStatus === 'PENDING'"
                @click="submit"
            >
              Créer
            </b-button>
          </b-button-group>
        </div>
      </b-card-body>
    </b-card>
    <l-jumbotron :data="getMinMaxDates()"/>
  </div>
</template>

<script>
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";
import RendezVousModel from "@/models/rendez_vous.model";
import {htmlTitle} from "@/utils/tools";
import {validationMixin} from "vuelidate/src";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import {commonMixin} from "@/mixins/common.mixin";

export default {
  name: "VURendezVousReservation",
  title() {
    return htmlTitle(this.$route.meta.value)
  },
  mixins: [validationMixin, validationMessageMixin, commonMixin],
  validations: {
    rendezVous: RendezVousModel.validations
  },
  data() {
    return {
      BSClass: LemkaHelpers.BSClass,
      submitStatus: null,
      typeServiceTouched: false,
      rendezVous: new RendezVousModel(),
      labels: {
        fr: {
          labelHours: 'Stunden',
          labelMinutes: 'Minuten',
          labelSeconds: 'Sekunden',
          labelIncrement: 'Erhöhen',
          labelDecrement: 'Verringern',
          labelSelected: 'Ausgewählte Zeit',
          labelNoTimeSelected: 'Keine Zeit ausgewählt'
        },
      },
      startError: false,
      heuresDisponibles: null,
      routes: LemkaHelpers.Routes,
      response: null
    }
  },
  computed: {
    ...mapGetters({
      typeServices: "TypeServices/typeServices",
      horaires: "Horaires/horaires",
      deviss: 'Devis/devisAccepte',
      available_hours: "RendezVous/available_hours"
    }),
    invalidTypeService() {
      return this.typeServiceTouched && this.rendezVous.type_service.id === null
    },
    horaireOfDay() {
      if (this.rendezVous.date !== null) {
        let jour = this.horaires.find(item => item.jour_semaine === new Date(this.rendezVous.date).getDay())
        let ouverture = new Date(this.rendezVous.date + ' ' + jour.heure_ouverture).getHours()
        let pauseMidi = new Date(this.rendezVous.date + ' ' + jour.pause_debut).getHours()
        let pauseMidiFin = new Date(this.rendezVous.date + ' ' + jour.pause_fin).getHours()
        let fermeture = new Date(this.rendezVous.date + ' ' + jour.heure_fermeture).getHours()
        let heures = []

        for (ouverture; ouverture < fermeture; ouverture++) {
          if (ouverture < pauseMidi || ouverture >= pauseMidiFin) {
            heures.push(ouverture)
          }
        }

        return heures
      } else {
        return []
      }
    }
  },
  methods: {
    ...mapActions({
      loadTypeServices: "TypeServices/loadTypeServices",
      loadHoraires: "Horaires/loadHoraires",
      loadUserDevis: "Devis/loadUserDevis",
      loadHeuresDispo: "RendezVous/loadHeuresDispo",
      createRendezVous: "RendezVous/createRendezVous"
    }),
    initialisation: async function () {
      if (this.deviss.length === 0) {
        await this.loadUserDevis()
      }
      if (this.typeServices.length === 0) {
        await this.loadTypeServices()
      }
      if (this.horaires.length === 0) {
        await this.loadHoraires()
      }
    },
    submit: function () {
      this.$v.$touch()
      if (this.$v.$invalid ||
          (this.typeServiceTouched === false && this.invalidTypeService === false) ||
          (this.typeServiceTouched === true && this.invalidTypeService === true) ||
          this.rendezVous.start === null
      ) {
        this.typeServiceTouched = true
        this.startError = true
        console.log(this.startError)
        this.submitStatus = 'ERROR'
      } else {
        this.startError = false
        this.submitStatus = 'PENDING'

        this.createRendezVous(this.rendezVous.toCreatePayload()).then(() => {
          this.makeToast('success', 'Votre rendez vous à été créé avec succès', this.rendezVous.date)
        }, error => {
          this.makeToast('danger', error.response.data.detail, this.rendezVous.date)
        })

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: this.routes.RENDEZ_VOUS_USER.name})
        }, 500)
      }
    },
    selectHour: function (hour) {
      this.rendezVous.start = hour
    },
    toucheTypeService: function () {
      this.typeServiceTouched = true
    },
    dateDisabled(ymd, date) {
      // Disable weekends (Sunday = `0`, Saturday = `6`) and
      // disable days that fall on the 13th of the month
      const weekday = date.getDay()
      // const day = date.getDate()
      // let now = new Date()

      // Return `true` if the date should be disabled
      return weekday === 0
    },
    onContext(date) {
      if (date !== null) {
        this.loadHeuresDispo(date)
        this.rendezVous.start = null
      }
      // this.context = ctx
    },
    getMinMaxDates: function() {
      // TODO - Récupérer correctement les dates max disponible. + 7 semaines
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const minDate = new Date(today)
      minDate.setDate(minDate.getDate() + 1)
      // minDate.setDate(15)
      // 15th in two months
      const maxDate = new Date(today)
      maxDate.setDate(maxDate.getDay() + 13)
      // maxDate.setDate(15)
      return {
        min: minDate,
        max: maxDate,
        test: minDate.setDate(minDate.getDate() + 1),
        test2: maxDate.setDate(maxDate.getDay() + 13)
      }
    },
    validationState: function (name) {
      const {$dirty, $error} = this.$v.rendezVous[name]
      return $dirty ? !$error : null;
    }
  },
  created() {
    this.initialisation()
  },
  filters: {}
}
</script>

<style scoped>
</style>