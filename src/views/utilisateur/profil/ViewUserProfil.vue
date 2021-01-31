<template>
  <div class="d-flex">
    <sidebar-menu
        theme='white-theme'
        class="sidebar"
        :menu="menu"
        :collapsed="collapsed"
        @item-click="onItemClick"
        @collapse="onCollapse"
    />
    <b-container id="view" :class="[{'collapsed' : collapsed}]">
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import {LemkaEnums} from "@/helpers/enums.helper";

export default {
  name: "ViewUserProfil",
  data() {
    return {
      menu: [
        {header: true, title: 'Mon profil', hiddenOnCollapse: true},
        {href: {name: 'ViewUserInformations'}, title: 'Informations', icon: LemkaEnums.FontAwesomeIcons.PROFILE},
        {href: {name: 'ViewUserMensurations'}, title: 'Mensurations', icon: LemkaEnums.FontAwesomeIcons.MESURE},
      ],
      collapsed: false
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    onItemClick(e, i) {
      console.log("onItemClick");
    },
    onCollapse(c) {
      this.collapsed = c;
    }
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
    }
  }
}
</script>

<style scoped>

.v-sidebar-menu {
  position: relative!important;
}
</style>