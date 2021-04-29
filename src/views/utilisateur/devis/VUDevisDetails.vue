<template>
  <div class="devis_detail" :class="BSClass.CARD_BORDERLESS_SHADOW">
    <l-spinner v-if="busy"></l-spinner>
    <div v-else>
      <b-row>
        <b-col lg="6" class="my-auto">
          <h3>
            <b-badge :variant="devis.statutDevis(devis).variant">État du devis : {{ devis.statutDevis(devis).etat }}</b-badge>
          </h3>
        </b-col>
        <b-col lg="6">
          <div class="text-right">
            <b-button-group size="sm" class="w-100">
              <b-button
                  v-b-tooltip.hover title="Accepter"
                  variant="outline-success"
                  :disabled="devis.est_accepte !== null"
              >
                <i class="fas fa-check"></i>
              </b-button>
              <b-button
                  v-b-tooltip.hover title="Refuser"
                  variant="outline-danger"
                  :disabled="devis.est_accepte !== null"
              >
                <i class="fas fa-times"></i>
              </b-button>
              <b-button
                  v-b-tooltip.hover title="Télécharger le PDF"
                  variant="outline-secondary"
              >
                <i class="fas fa-file-pdf"></i>
              </b-button>
            </b-button-group>
          </div>
        </b-col>
      </b-row>

      <div class="mx-4">
        <div class="pdf mt-5">
          <b-row>
            <b-col cols="9" class="my-auto">
              <h2>Devis n° {{ devis.numero_devis }}</h2>
            </b-col>
            <b-col cols="3">
              <div class="text-center">
                <b-img
                    :src="logo"
                    width="112"
                />
              </div>
            </b-col>
          </b-row>
          <hr class="new1">
          <div class="my-5">
            <div>
              <h5><strong>{{ entreprise.nom_societe }}</strong></h5>
              <div><span>{{ entreprise.numero }}, {{ entreprise.rue }}</span></div>
              <div><span>{{ entreprise.ville.code_postale }} - {{ entreprise.ville.ville }}</span></div>
              <div><span>{{ entreprise.ville.pays.pays }}</span></div>
              <div><span>{{ entreprise.numero_tel }}</span></div>
            </div>
            <div class="mx-3 my-4">
              <b-row>
                <b-col cols="8"></b-col>
                <b-col cols="4">
                  <div>
                    <h5><strong>Destinataire</strong></h5>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="8">
                  <b-row>
                    <b-col cols="5">
                      <div><span>Date du devis : </span></div>
                      <div><span>Référence du devis : </span></div>
                      <div><span>Référence du demande de devis : </span></div>
                      <div><span>Contact client : </span></div>
                    </b-col>
                    <b-col cols="7">
                      <div><span>{{ devis.created_at | localTimeStr }}</span></div>
                      <div><span>{{ devis.numero_devis }}</span></div>
                      <div><span>{{ devis.demande_devis.numero_demande_devis }}</span></div>
                      <div><span>{{ devis.demande_devis.utilisateur }}</span></div>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col cols="4">
                  <div v-if="adresse">
                    <div><span>{{ devis.demande_devis.utilisateur }}</span></div>
                    <div><span>{{ adresse.numero }}, {{ adresse.rue }}</span></div>
                    <div><span>{{ adresse.ville.code_postale }} - {{ adresse.ville.ville }}</span></div>
                    <div><span>{{ adresse.ville.pays.pays }}</span></div>
                  </div>
                </b-col>
              </b-row>
              <div class="mt-5">
                <p><strong>Remarque :</strong></p>
                <div><span>{{ devis.remarque === "" ? '...' : devis.remarque }}</span></div>
              </div>
            </div>
          </div>
          <hr class="new1">
          <div class="my-5">
            <b-table
                :items="devis.details"
                :fields="detailFields"
                :show-empty="true"
                stacked="md"
                small
                class="text-center my-2"
            >
              <template #cell(tva)="data">
                <p>{{ data.item.tva.taux * 100 }} %</p>
              </template>
              <template #cell(total_ht)="data">
                <p>{{ detail.calculeTotalHT(data.item) }} €</p>
              </template>
              <template #cell(total_tva)="data">
                <p>{{ detail.calculerTVA(data.item) }} €</p>
              </template>
              <template #cell(total_ttc)="data">
                <p>{{ detail.calculerTotalTTC(data.item) }} €</p>
              </template>
            </b-table>
            <div class="mt-3">
              <b-row>
                <b-col cols="9"></b-col>
                <b-col cols="3">
                  <div><span><strong>Total HT : </strong>{{ detail.totalHT(devis.details) }} €</span></div>
                  <div><span><strong>Total TVA : </strong>{{ detail.totalTVA(devis.details) }} €</span></div>
                  <div><span><strong>Total TTC : </strong>{{ detail.totalTTC(devis.details) }} €</span></div>
                </b-col>
              </b-row>
            </div>
          </div>
          <hr class="new1">
          <div class="text-center">
            <b-row>
              <b-col cols="6">
                <div><span><strong>Siège social</strong></span></div>
                <div><span>{{ entreprise.numero }}, {{ entreprise.rue }}</span></div>
                <div><span>{{ entreprise.ville.code_postale }} - {{ entreprise.ville.ville }}</span></div>
                <div><span>{{ entreprise.ville.pays.pays }}</span></div>
                <div><span>N° TVA : {{ entreprise.numero_tva }}</span></div>
              </b-col>
              <b-col cols="6">
                <div><span><strong>Coordonnées</strong></span></div>
                <div><span>{{ entreprise.nom_societe }}</span></div>
                <div><span>Tél : {{ entreprise.numero_tel }}</span></div>
                <div><span>Email : {{ entreprise.mail_contact }}</span></div>
                <div><span>{{ entreprise.site_web }}</span></div>
              </b-col>
              <b-col cols="4"></b-col>
            </b-row>
          </div>
        </div>
      </div>


      <l-jumbotron :data="devis" class="mt-4"/>
    </div>
  </div>
</template>

<script>
import DevisModel from "@/models/devis/devis.model";
import {mapActions, mapGetters} from "vuex";
import LemkaHelpers from "@/helpers";
import {htmlTitle} from "@/utils/tools";
import EntrepriseModel from "@/models/entreprise.model";
import {localTimeStr} from "@/utils/filters";
import DetailModel from "@/models/devis/detail.model";

export default {
  name: "VUDevisDetails",
  title() {
    return htmlTitle('Devis N° ' + this.$route.params.numero_devis)
  },
  data() {
    return {
      detail: new DetailModel(),
      devis: new DevisModel(),
      entreprise: new EntrepriseModel(),
      detailFields: DetailModel.userTableField,
      BSClass: LemkaHelpers.BSClass
    }
  },
  computed: {
    ...mapGetters({
      deviss: "Devis/deviss",
      busy: "Devis/loadingStatus",
      entreprises: 'Entreprises/entreprises',
      adresse: "Adresse/adresse"
    }),
    logo() {
      return require('@/assets/favicon.png')
    },
    normalizedFullName() {
      return undefined;
    }
  },
  methods: {
    ...mapActions({loadDevis: "Devis/loadUserDevis", loadEntreprises: 'Entreprises/loadEntreprises', loadAdresse: "Adresse/loadAdresse"}),
    initialisation: async function () {
      if (this.deviss.length === 0) {
        await this.loadDevis()
      }
      if (this.entreprises.length === 0) {
        await this.loadEntreprises()
      }
      await this.loadAdresse()
    },
    chargerEntreprise: function () {
      Object.assign(this.entreprise, this.$store.getters["Entreprises/entreprise"])
    },
    chargerDevis: async function (numero_devis) {
      await this.initialisation()
      await this.chargerEntreprise()
      let devis = await this.$store.getters["Devis/devisNumberDevis"](parseInt(numero_devis))
      if (devis !== undefined) {
        Object.assign(this.devis, await this.$store.getters["Devis/devisNumberDevis"](parseInt(numero_devis)))
        this.$route.meta.value = this.devis.numero_devis
      } else {
        await this.$router.push({name: "VUDevis"})
      }
    }
  },
  filters: {
    localTimeStr: function (value) {
      value = localTimeStr(value)
      return value
    }
  },
  created() {
    this.chargerDevis(this.$route.params.numero_devis)
  }
}
</script>

<style lang="scss" scoped>
hr.new1 {
  border-top: 4px solid #79648F;
}
</style>

