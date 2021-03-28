<template>
  <section v-if="$route.name === routes.DEMANDE_DE_DEVIS.name" class="demande_devis">
    <div :class="BSClass.CARD_BORDERLESS_SHADOW" class="my-4">
      <l-create-refresh size="md" :route="routes.DEMANDE_DE_DEVIS_ADD_OR_UPDATE.name" :load-or-refresh="loadDemandeDevis"/>

      <b-tabs pills card class="mt-2">
        <b-tab title="En rédaction">
          <b-card-text>
            <b-table :items="demandesDevisEnRedaction" :fields="redactionTableFields" :busy="busy"
                     stacked="md" small show-empty hover class="text-center mt-3">
              <template #table-busy>
                <l-table-busy/>
              </template>

              <template #cell(created_at)="data">
                {{ data.item.created_at | localTimeStr }}
              </template>

              <template #cell(est_urgent)="data">
                <b-badge pill :variant="data.item.est_urgent === true ? 'success' : 'danger'">
                  <i :class="`fas fa-${data.item.est_urgent  === true ? 'check' : 'times'}-circle`"></i>
                </b-badge>
              </template>

              <template #cell(actions)="data">
                <b-button-group size="sm">
                  <b-button variant="outline-primary" :to="{name: routes.DEMANDE_DE_DEVIS_ADD_OR_UPDATE.name, params: {id: data.item.id}}">
                    <i class="fas fa-edit"></i>
                  </b-button>
                  <b-button variant="outline-success" @click.stop.prevent="envoyer(data.item)">
                    <i class="fas fa-paper-plane"></i>
                  </b-button>
                </b-button-group>
              </template>
            </b-table>
          </b-card-text>
        </b-tab>

        <b-tab title="Soumis">
          <b-card-text>
            <b-table :items="demandeDevisSoumis" :fields="soumisTableFields" :busy="busy"
                     stacked="md" small show-empty hover class="text-center mt-3">
              <template #table-busy>
                <l-table-busy/>
              </template>

              <template #empty>
                <l-table-empty/>
              </template>
              <template #cell(created_at)="data">
                {{ data.item.created_at | localTimeStr }}
              </template>
              <template #cell(est_urgent)="data">
                <b-badge pill :variant="data.item.est_urgent === true ? 'success' : 'danger'">
                  <i :class="`fas fa-${data.item.est_urgent === true ? 'check' : 'times'}-circle`"></i>
                </b-badge>
              </template>

              <template #cell(actions)>
                <b-button size="sm" variant="outline-primary">
                  <i class="fas fa-eye"></i>
                </b-button>
              </template>
            </b-table>
          </b-card-text>
        </b-tab>

        <b-tab title="Traités">
          <b-card-text>
            <b-table :items="demandeDevisTraite" :fields="taiteTableFields" :busy="busy"
                     stacked="md" small show-empty hover class="text-center mt-3">
              <template #table-busy>
                <l-table-busy/>
              </template>
              <template #cell(created_at)="data">
                {{ data.item.created_at | localTimeStr }}
              </template>
            </b-table>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </div>
  </section>

  <router-view v-else/>
</template>

<script>
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";
import DemandeDevisModel from "@/models/demande_devis.model";
import {localTimeStr} from "@/utils/filters";
import Tools from '@/utils/tools'

export default {
  name: "VUDemandeDevis",
  props: {},
  title() {
    return Tools.htmlTitle("Demande de devis")
  },
  data() {
    return {
      BSClass: LemkaHelpers.BSClass,
      routes: LemkaHelpers.Routes,
      redactionTableFields: DemandeDevisModel.redactionTableFields,
      taiteTableFields: DemandeDevisModel.taiteTableFields,
    }
  },
  computed: {
    ...mapGetters({
      demandes_devis: "DemandesDevis/demandesDevis",
      busy: "DemandesDevis/demandesDevisLoadingStatus",
      demandesDevisEnRedaction: "DemandesDevis/demandesDevisEnRedaction",
      demandeDevisSoumis: "DemandesDevis/demandeDevisSoumis",
      demandeDevisTraite: "DemandesDevis/demandeDevisTraite"
    }),
    soumisTableFields() {
      return DemandeDevisModel.soumisTableFields
    }
  },
  watch: {

  },
  methods: {
    ...mapActions({loadDemandeDevis: "DemandesDevis/loadDemandeDevis", updateDemandeDevis: "DemandesDevis/updateDemandeDevis"}),
    envoyer: function (payload) {
      payload.est_soumis = true
      this.updateDemandeDevis(payload)
    }
  },
  created() {
    if (this.demandes_devis.length === 0) {
      this.loadDemandeDevis()
    }
  },
  filters: {
    localTimeStr: function (value) {
      value = localTimeStr(value)
      return value
    }
  }
}
</script>

<style scoped>

</style>