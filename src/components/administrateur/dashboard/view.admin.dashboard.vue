<template>
  <b-card>
    <b-card-body>
      <b-container>
        <b-card-group deck class="my-2">
          <!-- UTILISATEUR -->
          <DashboardCard :icon="AdminRouteName.UTILISATEURS.icon"
                         :route_value="AdminRouteName.UTILISATEURS.value"
                         :count="dashboard.user_count"
                         :route_link="AdminRouteName.UTILISATEURS.name"
                         :message="`${AdminRouteName.UTILISATEURS.value} actifs`"></DashboardCard>

          <!-- ARTICLE -->
          <DashboardCard :icon="AdminRouteName.ARTICLES.icon"
                         :route_value="AdminRouteName.ARTICLES.value"
                         :count="dashboard.articles_count"
                         :route_link="AdminRouteName.ARTICLES.name"
                         :message="`${AdminRouteName.ARTICLES.value} actifs`"></DashboardCard>

          <!-- MERCERIE -->
          <DashboardCard :icon="AdminRouteName.MERCERIES.icon"
                         :route_value="AdminRouteName.MERCERIES.value"
                         :count="dashboard.merceries_count"
                         :route_link="AdminRouteName.MERCERIES.name"
                         :message="`${AdminRouteName.MERCERIES.value} actifs`"></DashboardCard>
        </b-card-group>

        <b-card-group deck class="my-2">
          <!-- DEMANDE DE DEVIS -->
          <DashboardCard :icon="AdminRouteName.DEMANDE_DE_DEVIS.icon"
                         :route_value="AdminRouteName.DEMANDE_DE_DEVIS.value"
                         :count="dashboard.demandes_de_devis_count"
                         :route_link="AdminRouteName.DEMANDE_DE_DEVIS.name"
                         :message="`${AdminRouteName.DEMANDE_DE_DEVIS.value} actifs`"></DashboardCard>

          <!-- DEVIS -->
          <DashboardCard :icon="AdminRouteName.DEVIS.icon"
                         :route_value="AdminRouteName.DEVIS.value"
                         :count="dashboard.devis_count"
                         :route_link="AdminRouteName.DEVIS.name"
                         :message="`${AdminRouteName.DEVIS.value} actifs`"></DashboardCard>

          <!-- BON DE COMMANDE -->
          <DashboardCard :icon="AdminRouteName.BONS_DE_COMMANDE.icon"
                         :route_value="AdminRouteName.BONS_DE_COMMANDE.value"
                         :count="dashboard.bons_de_commande_count"
                         :route_link="AdminRouteName.BONS_DE_COMMANDE.name"
                         :message="`${AdminRouteName.BONS_DE_COMMANDE.value} actifs`"></DashboardCard>

          <!-- FACTURE -->
          <DashboardCard :icon="AdminRouteName.FACTURE.icon"
                         :route_value="AdminRouteName.FACTURE.value"
                         :count="dashboard.factures_count"
                         :route_link="AdminRouteName.FACTURE.name"
                         :message="`${AdminRouteName.FACTURE.value} actifs`"></DashboardCard>
        </b-card-group>

        <b-card-group deck>
          <!-- RENDEZ-VOUS -->
          <DashboardCard :icon="AdminRouteName.RENDEZ_VOUS.icon"
                         :route_value="AdminRouteName.RENDEZ_VOUS.value"
                         :count="dashboard.rendez_vous_count"
                         :route_link="AdminRouteName.RENDEZ_VOUS.name"
                         :message="`${AdminRouteName.RENDEZ_VOUS.value} actifs`"></DashboardCard>

          <!-- PARAMETRE -->
          <DashboardCard :icon="AdminRouteName.PARAMETRES.icon"
                         :route_value="AdminRouteName.PARAMETRES.value"
                         :route_link="AdminRouteName.PARAMETRES.name"
                         :message="`${AdminRouteName.PARAMETRES.value} actifs`"></DashboardCard>
        </b-card-group>
      </b-container>
    </b-card-body>
  </b-card>
</template>

<script>
import {AdminRouteName, Endpoints} from "@/helpers/enums.helper";
import axios from "axios";
import authHeader from "@/services/auth-header";
import DashboardCard from "@/components/administrateur/dashboard/component.dashboard.card"

export default {
  name: "ViewDashboard",
  components: {
    DashboardCard
  },
  data() {
    return {
      AdminRouteName,
      dashboard: {
        articles_count: 0,
        bons_de_commande_count: 0,
        demandes_de_devis_count: 0,
        devis_count: 0,
        factures_count: 0,
        merceries_count: 0,
        rendez_vous_count: 0,
        user_count: 0,
      }
    }
  },
  mounted() {
    this.loadDashboard()
  },
  methods: {
    async loadDashboard() {
      await axios.get(Endpoints.DASHBOARD_ENDPOINT, {headers: authHeader()}).then(response => {
        this.dashboard = response.data
      })
    }
  },
}
</script>

<style scoped>

</style>