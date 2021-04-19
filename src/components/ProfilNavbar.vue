<template>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-toggle target="profil-collapse"></b-navbar-toggle>

    <b-collapse id="profil-collapse" is-nav>
      <b-navbar-nav class="mx-auto">

        <b-nav-item v-for="(item, index) in menu" :key="index" :to="item.href"
                    :active="item.children.includes($route.name)">
          <i :class="item.icon"></i>
          {{ item.title }}
        </b-nav-item>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import LemkaHelpers from "@/helpers";

export default {
  name: "ProfilNavbar",
  data() {
    return {
      menu: [
        {
          href: {name: LemkaHelpers.Routes.INFORMATIONS.name},
          title: LemkaHelpers.Routes.INFORMATIONS.value,
          icon: LemkaHelpers.FontAwesomeIcons.USER,
          children: [
            LemkaHelpers.Routes.INFORMATIONS.name,
            LemkaHelpers.Routes.INFORMATIONS_UPDATE.name,
            LemkaHelpers.Routes.ADRESSE_ADD.name,
            LemkaHelpers.Routes.ADRESSE_UPDATE.name
          ]
        },
        {
          href: {name: LemkaHelpers.Routes.USER_MENSURATIONS.name},
          title: LemkaHelpers.Routes.USER_MENSURATIONS.value,
          icon: LemkaHelpers.FontAwesomeIcons.MESURE,
          children: [
            LemkaHelpers.Routes.USER_MENSURATIONS.name,
            LemkaHelpers.Routes.USER_MENSURATION_ADD_OR_UPDATE.name,
            LemkaHelpers.Routes.USER_MESURES.name
          ]
        },
        {
          href: {name: LemkaHelpers.Routes.DEMANDE_DE_DEVIS.name},
          title: LemkaHelpers.Routes.DEMANDE_DE_DEVIS.value,
          icon: LemkaHelpers.FontAwesomeIcons.FOLDER_OPEN,
          children: [
              LemkaHelpers.Routes.DEMANDE_DE_DEVIS.name,
              LemkaHelpers.Routes.DEMANDE_DE_DEVIS_ADD_OR_UPDATE.name,
          ]
        },
        {
          href: {name: LemkaHelpers.Routes.DEVIS_USER.name},
          title: LemkaHelpers.Routes.DEVIS_USER.value,
          icon: LemkaHelpers.FontAwesomeIcons.FOLDER,
          children: [
              LemkaHelpers.Routes.DEVIS_USER.name,
              LemkaHelpers.Routes.USER_DEVIS_DETAIL.name
          ]
        },
        {
          href: {name: LemkaHelpers.Routes.RENDEZ_VOUS_USER.name},
          title: LemkaHelpers.Routes.RENDEZ_VOUS_USER.value,
          icon: LemkaHelpers.FontAwesomeIcons.CALENDAR,
          children: []
        }
      ],
    }
  },
}
</script>

<style scoped>

</style>