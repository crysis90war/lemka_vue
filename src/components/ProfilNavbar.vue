<template>
  <b-navbar type="light" variant="light">
    <b-navbar-nav class="mx-auto">

      <b-nav-item v-for="(item, index) in menu" :key="index" :to="item.href">
        <i :class="item.icon"></i>
        {{ item.title }}
      </b-nav-item>

    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import {LemkaEnums} from "@/helpers/enums.helper";

export default {
  name: "ProfilNavbar",
  data() {
    return {
      menu: [
        {
          href: {name: LemkaEnums.UserRoutes.INFORMATIONS.name},
          title: LemkaEnums.UserRoutes.INFORMATIONS.value,
          icon: LemkaEnums.FontAwesomeIcons.USER
        },
        {
          href: {name: LemkaEnums.UserRoutes.MENSURATIONS.name},
          title: LemkaEnums.UserRoutes.MENSURATIONS.value,
          icon: LemkaEnums.FontAwesomeIcons.MESURE
        },
        {href: {name: 'ViewUserMensurations'}, title: 'Mensurations', icon: LemkaEnums.FontAwesomeIcons.MESURE},
        {href: {name: 'ViewUserMensurations'}, title: 'Mensurations', icon: LemkaEnums.FontAwesomeIcons.MESURE},
        {href: {name: 'ViewUserMensurations'}, title: 'Mensurations', icon: LemkaEnums.FontAwesomeIcons.MESURE},
      ],
    }
  },
}
</script>

<style scoped>

</style>