<template>
  <b-navbar id="navbar" toggleable="lg" type="light" variant="light" class="border-0 nav-shadow colored">
    <b-container>
      <b-navbar-brand :to="{name: 'home'}" v-if="brandVisible">
        <img :src="logo" alt="" style="max-width: 100px;">
      </b-navbar-brand>

      <b-navbar-brand :to="{name: 'home'}" v-else>
        <img :src="logo" alt="" style="max-width: 150px;">
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">

          <b-nav-item v-for="(item, index) in globalMenu" :key="index" :to="{name: item.to}"
                      :active="$route.name === item.to">
            {{ item.title }}
          </b-nav-item>

        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">

          <b-nav-item v-b-modal.modal-no-backdrop>
            <i class="fas fa-search"></i>
            <lemka-search></lemka-search>
          </b-nav-item>

          <b-nav-item-dropdown right v-if="!currentUser">
            <template v-slot:button-content>
              <i class="far fa-user"></i>
            </template>
            <b-dropdown-item :to="{ name: 'authLogin' }">S'identifier</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'authRegister' }">S'inscrire</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right v-if="currentUser">
            <template v-slot:button-content>
              {{ currentUser.username }}
            </template>
            <b-dropdown-item :to="{ name: routes.PROFIL_ROUTE.name }">
              {{ routes.PROFIL_ROUTE.value }}
            </b-dropdown-item>
            <b-dropdown-item :to="{name: routes.RENDEZ_VOUS_USER_RESERVATION.name}">
              {{ routes.RENDEZ_VOUS_USER_RESERVATION.value }}
            </b-dropdown-item>
            <b-dropdown-item :to="{name: routes.DEMANDE_DE_DEVIS_ADD_OR_UPDATE.name}">
              Demander un devis
            </b-dropdown-item>

            <b-dropdown-item v-if="currentUser.is_staff === true" :to="{ name: routes.ADMIN_ROUTE.name}">
              {{ routes.ADMIN_ROUTE.value }}
            </b-dropdown-item>

            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click.prevent="disconnect()">Se déconnecter</b-dropdown-item>
          </b-nav-item-dropdown>

        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import SearchModal from "@/components/SearchModal";
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Navbar",
  components: {'lemka-search': SearchModal,},
  props: {
    visibleoffset: {
      type: [String, Number],
      default: 350
    },
  },
  data() {
    return {
      routes: LemkaHelpers.Routes,
      globalMenu: [
        {to: 'home', title: 'Accueil'},
        {to: 'horaire', title: 'Horaire'},
        {to: 'about', title: 'À propos'},
        {to: 'contact', title: 'Contact'},
      ],
      brandVisible: false,
    }
  },

  computed: {
    ...mapGetters({loggedIn: "Auth/loggedIn", currentUser: "Auth/user"}),
    logo() {
      return require('@/assets/Lemka.png')
    }
  },

  methods: {
    ...mapActions({logout: "Auth/logout"}),

    disconnect: function() {
      this.logout();
      this.$router.push({name: 'home'});
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
    }
  },

  created() {
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
}

</script>

<style lang="scss" scoped>

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}

.slide-fade-leave-to {
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
  background: #F1F1F1;
  background: -webkit-linear-gradient(to right, #B4A8BF, #F1F1F1);
  background: linear-gradient(to right, #B4A8BF, #F1F1F1);
}

.nav-link {
  &:hover {
    color: purple !important;
  }
}

.active {
  color: #79648F !important;
}

</style>