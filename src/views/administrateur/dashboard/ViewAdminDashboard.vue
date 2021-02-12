<template>
  <b-card>
    <b-card-body>
      <b-container>
        <b-card-group deck class="my-2">
          <!-- UTILISATEUR -->
          <DashboardCard :icon="LemkaEnums.FontAwesomeIcons.USERS"
                         :route_value="LemkaEnums.Routes.UTILISATEURS.value"
                         :count="dashboard.user_count"
                         :route_link="LemkaEnums.Routes.UTILISATEURS.name"
                         :message="`${LemkaEnums.Routes.UTILISATEURS.value} actifs`"></DashboardCard>

          <!-- ARTICLE -->
          <DashboardCard :icon="LemkaEnums.FontAwesomeIcons.STORE"
                         :route_value="LemkaEnums.Routes.ARTICLES.value"
                         :count="dashboard.articles_count"
                         :route_link="LemkaEnums.Routes.ARTICLES.name"
                         :message="`${LemkaEnums.Routes.ARTICLES.value} actifs`"></DashboardCard>

          <!-- MERCERIE -->
          <DashboardCard :icon="LemkaEnums.FontAwesomeIcons.MERCERIES"
                         :route_value="LemkaEnums.Routes.MERCERIES.value"
                         :count="dashboard.merceries_count"
                         :route_link="LemkaEnums.Routes.MERCERIES.name"
                         :message="`${LemkaEnums.Routes.MERCERIES.value} actifs`"></DashboardCard>
        </b-card-group>

        <b-card-group deck class="my-2">
          <!-- DEMANDE DE DEVIS -->
          <DashboardCard :icon="LemkaEnums.FontAwesomeIcons.FOLDER_OPEN"
                         :route_value="LemkaEnums.Routes.DEMANDE_DE_DEVIS.value"
                         :count="dashboard.demandes_de_devis_count"
                         :route_link="LemkaEnums.Routes.DEMANDE_DE_DEVIS.name"
                         :message="`${LemkaEnums.Routes.DEMANDE_DE_DEVIS.value} actifs`"></DashboardCard>

          <!-- DEVIS -->
          <DashboardCard :icon="LemkaEnums.FontAwesomeIcons.FOLDER"
                         :route_value="LemkaEnums.Routes.DEVIS.value"
                         :count="dashboard.devis_count"
                         :route_link="LemkaEnums.Routes.DEVIS.name"
                         :message="`${LemkaEnums.Routes.DEVIS.value} actifs`"></DashboardCard>

          <!-- BON DE COMMANDE -->
          <DashboardCard :icon="LemkaEnums.FontAwesomeIcons.PLATEAU"
                         :route_value="LemkaEnums.Routes.BONS_DE_COMMANDE.value"
                         :count="dashboard.bons_de_commande_count"
                         :route_link="LemkaEnums.Routes.BONS_DE_COMMANDE.name"
                         :message="`${LemkaEnums.Routes.BONS_DE_COMMANDE.value} actifs`"></DashboardCard>

          <!-- FACTURE -->
          <DashboardCard :icon="LemkaEnums.FontAwesomeIcons.MONEY"
                         :route_value="LemkaEnums.Routes.FACTURE.value"
                         :count="dashboard.factures_count"
                         :route_link="LemkaEnums.Routes.FACTURE.name"
                         :message="`${LemkaEnums.Routes.FACTURE.value} actifs`"></DashboardCard>
        </b-card-group>

        <b-card-group deck>
          <!-- RENDEZ-VOUS -->
          <DashboardCard :icon="LemkaEnums.FontAwesomeIcons.CALENDAR"
                         :route_value="LemkaEnums.Routes.RENDEZ_VOUS.value"
                         :count="dashboard.rendez_vous_count"
                         :route_link="LemkaEnums.Routes.RENDEZ_VOUS.name"
                         :message="`${LemkaEnums.Routes.RENDEZ_VOUS.value} actifs`"></DashboardCard>

          <!-- PARAMETRE -->
          <DashboardCard :icon="LemkaEnums.FontAwesomeIcons.PARAMETRES"
                         :route_value="LemkaEnums.Routes.PARAMETRES.value"
                         :route_link="LemkaEnums.Routes.PARAMETRES.name"
                         :message="`${LemkaEnums.Routes.PARAMETRES.value} actifs`"></DashboardCard>
        </b-card-group>
      </b-container>
    </b-card-body>
  </b-card>
</template>

<script>
import {LemkaEnums} from "@/helpers/enums.helper";
import axios from "axios";
import authHeader from "@/configs/auth-header";
import DashboardCard from "@/views/administrateur/dashboard/DashboardCard"

export default {
  name: "ViewAdminDashboard",
  components: {
    DashboardCard
  },
  data() {
    return {
      LemkaEnums,
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
      await axios.get(LemkaEnums.Endpoints.DASHBOARD_ENDPOINT, {headers: authHeader()}).then(response => {
        this.dashboard = response.data
      })
    }
  },
}
</script>

<style scoped>

</style>