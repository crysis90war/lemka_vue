<template>
  <div class="dashboard">
    <b-card-group deck class="my-2">
      <!-- UTILISATEUR -->
      <DashboardCard :icon="LemkaHelpers.FontAwesomeIcons.USERS"
                     :route_value="routes.UTILISATEURS.value"
                     :count="dashboard.user_count"
                     :route_link="routes.UTILISATEURS.name"
                     :message="`${routes.UTILISATEURS.value} actifs`"></DashboardCard>

      <!-- ARTICLE -->
      <DashboardCard :icon="LemkaHelpers.FontAwesomeIcons.STORE"
                     :route_value="routes.ARTICLES.value"
                     :count="dashboard.articles_count"
                     :route_link="routes.ARTICLES.name"
                     :message="`${routes.ARTICLES.value} actifs`"></DashboardCard>

      <!-- MERCERIE -->
      <DashboardCard :icon="LemkaHelpers.FontAwesomeIcons.MERCERIES"
                     :route_value="routes.MERCERIES.value"
                     :count="dashboard.merceries_count"
                     :route_link="routes.MERCERIES.name"
                     :message="`${routes.MERCERIES.value} actifs`"></DashboardCard>
    </b-card-group>

    <b-card-group deck class="my-2">
      <!-- DEMANDE DE DEVIS -->
      <DashboardCard :icon="LemkaHelpers.FontAwesomeIcons.FOLDER_OPEN"
                     :route_value="routes.DEMANDE_DE_DEVIS.value"
                     :count="dashboard.demandes_de_devis_count"
                     :route_link="routes.DEMANDE_DE_DEVIS.name"
                     :message="`${routes.DEMANDE_DE_DEVIS.value} actifs`"></DashboardCard>

      <!-- DEVIS -->
      <DashboardCard :icon="LemkaHelpers.FontAwesomeIcons.FOLDER"
                     :route_value="routes.DEVIS.value"
                     :count="dashboard.devis_count"
                     :route_link="routes.DEVIS.name"
                     :message="`${routes.DEVIS.value} actifs`"></DashboardCard>

      <!-- BON DE COMMANDE -->
      <DashboardCard :icon="LemkaHelpers.FontAwesomeIcons.PLATEAU"
                     :route_value="routes.BONS_DE_COMMANDE.value"
                     :count="dashboard.bons_de_commande_count"
                     :route_link="routes.BONS_DE_COMMANDE.name"
                     :message="`${routes.BONS_DE_COMMANDE.value} actifs`"></DashboardCard>

      <!-- FACTURE -->
      <DashboardCard :icon="LemkaHelpers.FontAwesomeIcons.MONEY"
                     :route_value="routes.FACTURE.value"
                     :count="dashboard.factures_count"
                     :route_link="routes.FACTURE.name"
                     :message="`${routes.FACTURE.value} actifs`"></DashboardCard>
    </b-card-group>

    <b-card-group deck>
      <!-- RENDEZ-VOUS -->
      <DashboardCard :icon="LemkaHelpers.FontAwesomeIcons.CALENDAR"
                     :route_value="routes.RENDEZ_VOUS.value"
                     :count="dashboard.rendez_vous_count"
                     :route_link="routes.RENDEZ_VOUS.name"
                     :message="`${routes.RENDEZ_VOUS.value} actifs`"></DashboardCard>

      <!-- PARAMETRE -->
      <DashboardCard :icon="LemkaHelpers.FontAwesomeIcons.PARAMETRES"
                     :route_value="routes.PARAMETRES.value"
                     :route_link="routes.PARAMETRES.name"
                     :message="`${routes.PARAMETRES.value} actifs`"></DashboardCard>
    </b-card-group>
  </div>
</template>

<script>
import axios from "axios";
import authHeader from "@/services/auth-header";
import DashboardCard from "@/components/DashboardCard"
import LemkaHelpers from "@/helpers";

export default {
  name: "VADashboard",
  components: {
    DashboardCard
  },
  data() {
    return {
      LemkaHelpers,
      routes: LemkaHelpers.Routes,
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
      await axios.get(LemkaHelpers.Endpoints.DASHBOARD_ENDPOINT, {headers: authHeader()}).then(response => {
        this.dashboard = response.data
      })
    }
  },
}
</script>

<style scoped>

</style>