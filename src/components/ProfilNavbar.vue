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
import LemkaHelpers from "@/helpers";

export default {
  name: "ProfilNavbar",
  data() {
    return {
      menu: [
        {
          href: {name: LemkaEnums.Routes.INFORMATIONS.name},
          title: LemkaEnums.Routes.INFORMATIONS.value,
          icon: LemkaHelpers.FontAwesomeIcons.USER
        },
        {
          href: {name: LemkaEnums.Routes.MENSURATIONS.name},
          title: LemkaEnums.Routes.MENSURATIONS.value,
          icon: LemkaHelpers.FontAwesomeIcons.MESURE
        },
      ],
    }
  },
}
</script>

<style scoped>

</style>