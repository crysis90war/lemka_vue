<template>
  <div class="account-index">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-toggle target="profil-collapse"></b-navbar-toggle>

      <b-collapse id="profil-collapse" is-nav>
        <b-navbar-nav class="mx-auto">

          <b-nav-item v-for="(item, index) in menu" :key="index" :to="item.to"
                      :active="item.children.includes($route.name)">
            <i :class="item.icon"></i>
            {{ item.title }}
          </b-nav-item>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>

import LemkaHelpers from "@/helpers";

export default {
  name: "Index",

  data() {
    return {
      menu: [
        {
          to: {name: 'profilIndex'},
          title: 'Profil',
          icon: 'fas fa-user-alt',
          children: [
            'profilIndex',
            'profilDetails',
            'profilUpdate',
          ]
        },
        {
          to: {name: 'mensurationsIndex'},
          title: 'Mensurations',
          icon: 'fas fa-ruler-horizontal',
          children: [
            'mensurationsIndex',
            'mensurationsList',
            'mensurationsCreate',
            'mensurationsDetails',
            'mensurationsUpdate',
          ]
        },
        {
          to: {name: 'demandesDevisIndex'},
          title: 'Demandes de devis',
          icon: 'far fa-folder-open',
          children: [
            'demandesDevisIndex',
            'demandesDevisList',
            'demandesDevisCreate',
            'demandesDevisDetails',
            'demandesDevisUpdate',
          ]
        },
        {
          to: {name: LemkaHelpers.Routes.DEVIS_USER.name},
          title: LemkaHelpers.Routes.DEVIS_USER.value,
          icon: LemkaHelpers.FontAwesomeIcons.FOLDER,
          children: [
            LemkaHelpers.Routes.DEVIS_USER.name,
            LemkaHelpers.Routes.USER_DEVIS_DETAIL.name
          ]
        },
        {
          to: {name: 'rendezVousIndex'},
          title: 'Rendez-vous',
          icon: 'fas fa-calendar-check',
          children: [
            'rendezVousIndex',
            'rendezVousList',
            'rendezVousCreate',
          ]
        }
      ]
    }
  },

  methods: {},

  mounted() {
  },

  destroyed() {
  }
}

</script>

<style scoped>

</style>