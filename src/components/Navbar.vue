<template>
  <b-navbar id="navbar" toggleable="lg" type="light" variant="light" class="bg-white border-0 nav-shadow colored">
    <b-container>
      <b-navbar-brand :to="{name: LemkaEnums.GlobalRoutes.HOME_ROUTE.name}" v-if="brandVisible"><img src="../assets/logo.png" alt="" style="max-width: 100px;"></b-navbar-brand>
      <b-navbar-brand :to="{name: LemkaEnums.GlobalRoutes.HOME_ROUTE.name}" v-else><img src="../assets/logo.png" alt="" style="max-width: 150px;"></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">

          <b-nav-item :to="{ name: LemkaEnums.GlobalRoutes.HOME_ROUTE.name }" :active="$route.name === LemkaEnums.GlobalRoutes.HOME_ROUTE.name">
            {{ LemkaEnums.GlobalRoutes.HOME_ROUTE.value }}
          </b-nav-item>

          <b-nav-item :to="{ name: LemkaEnums.GlobalRoutes.HORAIRE_ROUTE.name }" :active="$route.name === LemkaEnums.GlobalRoutes.HORAIRE_ROUTE.name">
            {{ LemkaEnums.GlobalRoutes.HORAIRE_ROUTE.value}}
          </b-nav-item>

          <b-nav-item-dropdown text="Galérie" right>
            <b-dropdown-item>Confection</b-dropdown-item>
            <b-dropdown-item>Retouche</b-dropdown-item>
            <b-dropdown-item>Réparation</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item :to="{ name: LemkaEnums.GlobalRoutes.ABOUT_ROUTE.name }" :active="$route.name === LemkaEnums.GlobalRoutes.ABOUT_ROUTE.name">
            {{ LemkaEnums.GlobalRoutes.ABOUT_ROUTE.value }}
          </b-nav-item>

          <b-nav-item :to="{ name: LemkaEnums.GlobalRoutes.CONTACT_ROUTE.name }" :active="$route.name === LemkaEnums.GlobalRoutes.CONTACT_ROUTE.name">
            {{ LemkaEnums.GlobalRoutes.CONTACT_ROUTE.value }}
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item v-b-modal.modal-no-backdrop>
            <i class="fas fa-search"></i>
            <lemka-search></lemka-search>
          </b-nav-item>

          <b-nav-item-dropdown right v-if="!currentUser">
            <template v-slot:button-content>
              <i class="far fa-user"></i>
            </template>
            <b-dropdown-item :to="{ name: LemkaEnums.GlobalRoutes.LOGIN_ROUTE.name }">Se connecter</b-dropdown-item>
            <b-dropdown-item :to="{ name: LemkaEnums.GlobalRoutes.REGISTER_ROUTE.name }">S'inscrire</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right v-if="currentUser">
            <template v-slot:button-content>
              {{ currentUser.username }}
            </template>
            <b-dropdown-item :to="{ name: LemkaEnums.UserRoutes.PROFIL_ROUTE.name }">Mon profil</b-dropdown-item>
            <b-dropdown-item @click="refreshToken">Refresh Token</b-dropdown-item>
            <b-dropdown-item v-if="currentUser.is_staff === true" :to="{ name: LemkaEnums.AdminRoutes.ADMIN_ROUTE.name}">Administration</b-dropdown-item>
            <b-dropdown-item href="#">Prendre rendez-vous</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click.prevent="logOut">Se déconnecter</b-dropdown-item>
          </b-nav-item-dropdown>

        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import SearchModal from "@/components/SearchModal";
import {LemkaEnums} from "@/helpers/enums.helper";

export default {
  name: "Navbar",
  components: {
    'lemka-search': SearchModal,
  },
  props: {
    visibleoffset: {
      type: [String, Number],
      default: 350
    },
  },
  data() {
    return {
      LemkaEnums,
      show: false,
      brandVisible: false,
      register_login_logo_size: '250px',
      isConnected: false
    }
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  mounted() {
    window.smoothscroll = () => {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      if (currentScroll > 0) {
        window.requestAnimationFrame(window.smoothscroll)
        window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)))
      }
    }
    window.addEventListener('scroll', this.catchScroll)
  },

  destroyed() {
    window.removeEventListener('scroll', this.catchScroll)
  },

  methods: {
    refreshToken() {
      this.$store.dispatch('auth/refreshToken', this.currentUser)
      window.location.reload()
    },

    catchScroll() {
      let navbar = document.getElementById('navbar')
      this.brandVisible = (window.pageYOffset > parseInt(this.visibleoffset))

      if (this.brandVisible === true) {
        navbar.classList.add("fixed-top")
        navbar.classList.remove("colored")
      } else {
        navbar.classList.remove('fixed-top')
        navbar.classList.add('colored')
      }
    },

    logOut() {
      this.$store.dispatch('auth/logout');
      // this.$router.push('/login');
    }
  },
}

</script>

<style scoped>

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.nav-shadow {
  -webkit-box-shadow: 0 10px 10px -5px rgba(190, 190, 190, 0.5);
  box-shadow: 0 10px 10px -5px rgba(190, 190, 190, 0.5);
}

.fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
  -webkit-animation: .95s ease-in-out 0s normal none 1 running fadeInDown;
  animation: .95s ease-in-out 0s normal none 1 running fadeInDown;
  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.1);
}

.navbar.colored {
  background: #F1F1F1;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #B4A8BF, #F1F1F1);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #B4A8BF, #F1F1F1); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  /*background: linear-gradient(to bottom, #99bf54 0%, #FFFFFF 100%);*/
  /*font-size: 16px;*/
  /*font-weight: bold;*/
  /*background: #56ab2f;  !* fallback for old browsers *!*/
  /*background: -webkit-linear-gradient(to right, #a8e063, #56ab2f);  !* Chrome 10-25, Safari 5.1-6 *!*/
  /*background: linear-gradient(to right, #a8e063, #56ab2f); !* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ *!*/
}

.nav-link:hover {
  color: purple !important;
}

.active {
  color: #79648F!important;
  /*background-image: linear-gradient(to right, #834d9b 0%, #d04ed6 51%, #834d9b 100%);*/
  /*-webkit-background-clip: text;*/
  /*-webkit-text-fill-color: transparent;*/
}

</style>