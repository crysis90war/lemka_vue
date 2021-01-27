<template>
  <b-container>
    <div class="my-3">
      <b-tabs pills card vertical start>
        <b-tab title="Informations">
          <div class="accordion" role="tablist">
            <b-card no-body>
              <b-tabs card>
                <b-tab title="Informations">
                  <ProfilInformations :current-user="currentUser"></ProfilInformations>
                </b-tab>
                <b-tab title="Adresse">
                  <ProfilAdresses :current-user="currentUser"></ProfilAdresses>
                </b-tab>
              </b-tabs>
            </b-card>
          </div>
        </b-tab>

        <b-tab title="Mensurations">
          <ProfilMensurations :current-user="currentUser"></ProfilMensurations>
        </b-tab>

        <b-tab title="Rendez-vous">
          <b-tabs content-class="mt-3">
            <b-tab title="Mes rendez-vous" >
              <p>Afficher les rendez-vous en cours</p>
            </b-tab>
            <b-tab title="Historique">
              <p>Afficher les archives des rendez-vous.</p>
            </b-tab>
          </b-tabs>
        </b-tab>

        <b-tab title="Demande de devis" disabled></b-tab>

        <b-tab title="Devis" disabled></b-tab>

        <b-tab title="Bon de commandes" disabled></b-tab>

        <b-tab title="Factures" disabled></b-tab>

      </b-tabs>
    </div>
  </b-container>
</template>

<script>
import ProfilMensurations from "@/components/utilisateur/profil/ProfilMensurations";
import ProfilInformations from "@/components/utilisateur/profil/ProfilInformations";
import ProfilAdresses from "@/components/utilisateur/profil/ProfilAdresses";

export default {
  name: "Profil",

  components: {
    ProfilInformations,
    ProfilMensurations,
    ProfilAdresses
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  mounted() {
    if (!this.currentUser) {
      this.$router.push('/');
    }
  },

  watch: {
    currentUser: function () {
      if (!this.currentUser) {
        this.$router.push('/');
      }
    },
  }
}
</script>

<style scoped>
.container {
  margin-top: 0!important;
}
</style>