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
import LemkaHelpers from "@/helpers";

export default {
  name: "ProfilNavbar",
  data() {
    return {
      menu: [
        {
          href: {name: LemkaHelpers.Routes.INFORMATIONS.name},
          title: LemkaHelpers.Routes.INFORMATIONS.value,
          icon: LemkaHelpers.FontAwesomeIcons.USER
        },
        {
          href: {name: LemkaHelpers.Routes.USER_MENSURATIONS.name},
          title: LemkaHelpers.Routes.USER_MENSURATIONS.value,
          icon: LemkaHelpers.FontAwesomeIcons.MESURE
        },
      ],
    }
  },
}
</script>

<style scoped>

</style>