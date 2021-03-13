<template>
  <div class="administration">
    <div class="wrapper">
      <!-- Sidebar  -->
      <nav id="sidebar" class="bg-light">
        <div class="sidebar-header">
          <h3><img :src="imageLogo" alt="" style="max-width: 200px;"/></h3>
          <strong>LK</strong>
        </div>

        <ul class="list-unstyled components">
          <li>
            <b-nav-item v-for="(item, index) in menu" :key="index" :to="item.href">
              <i :class="item.icon"></i>
              {{ item.title }}
            </b-nav-item>
          </li>
        </ul>
      </nav>

      <!-- Page Content  -->
      <div id="content">
        <nav class="navbar navbar-expand-lg navbar-light bg-light my-0">
          <div class="container-fluid">
            <button type="button" id="sidebarCollapse" @click="sidebarCollapse" class="btn">
              <i class="fas fa-align-left"></i>
            </button>
            <p class="nav navbar-nav ml-auto">{{ $route.meta.value }}</p>
          </div>
        </nav>

        <b-card :class="BSClass.CARD_BORDERLESS_SHADOW">
          <router-view></router-view>
        </b-card>
      </div>

    </div>

  </div>
</template>

<script>
import LemkaHelpers from "@/helpers";

export default {
  name: "ViewAdmin",
  data() {
    return {
      menu: [
        {
          href: {name: LemkaHelpers.Routes.DASHBOARD.name},
          title: LemkaHelpers.Routes.DASHBOARD.value,
          icon: LemkaHelpers.FontAwesomeIcons.TACHOMETRE
        },
        {
          href: {name: LemkaHelpers.Routes.UTILISATEURS.name},
          title: LemkaHelpers.Routes.UTILISATEURS.value,
          icon: LemkaHelpers.FontAwesomeIcons.USERS
        },
        {
          href: {name: LemkaHelpers.Routes.ARTICLES.name},
          title: LemkaHelpers.Routes.ARTICLES.value,
          icon: LemkaHelpers.FontAwesomeIcons.STORE
        },
        {
          href: {name: LemkaHelpers.Routes.MERCERIES.name},
          title: LemkaHelpers.Routes.MERCERIES.value,
          icon: LemkaHelpers.FontAwesomeIcons.PLATEAU
        },
        {
          href: {name: LemkaHelpers.Routes.DEMANDE_DE_DEVIS.name},
          title: LemkaHelpers.Routes.DEMANDE_DE_DEVIS.value,
          icon: LemkaHelpers.FontAwesomeIcons.FOLDER_OPEN
        },
        {
          href: {name: LemkaHelpers.Routes.DEVIS.name},
          title: LemkaHelpers.Routes.DEVIS.value,
          icon: LemkaHelpers.FontAwesomeIcons.FOLDER
        },
        {
          href: {name: LemkaHelpers.Routes.BONS_DE_COMMANDE.name},
          title: LemkaHelpers.Routes.BONS_DE_COMMANDE.value,
          icon: LemkaHelpers.FontAwesomeIcons.SHOPPING_CART
        },
        {
          href: {name: LemkaHelpers.Routes.FACTURE.name},
          title: LemkaHelpers.Routes.FACTURE.value,
          icon: LemkaHelpers.FontAwesomeIcons.MONEY
        },
        {
          href: {name: LemkaHelpers.Routes.RENDEZ_VOUS.name},
          title: LemkaHelpers.Routes.RENDEZ_VOUS.value,
          icon: LemkaHelpers.FontAwesomeIcons.CALENDAR
        },
        {
          href: {name: LemkaHelpers.Routes.PARAMETRES.name},
          title: LemkaHelpers.Routes.PARAMETRES.value,
          icon: LemkaHelpers.FontAwesomeIcons.PARAMETRES
        },
      ],
      toggled: false,
      imageLogo: require('@/assets/logo.png'),
      BSClass: LemkaHelpers.BSClass
    }
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    thisRoute() {
      return this.$route.name
    }
  },

  methods: {
    sidebarCollapse() {
      this.toggled = !this.toggled
      let sidebar = document.getElementById('sidebar')
      if (this.toggled === true) {
        sidebar.classList.add("active")
      } else {
        sidebar.classList.remove('active')
      }
    }
  },

  created() {
    if (!this.currentUser) {
      this.$router.push({name: LemkaHelpers.Routes.LOGIN_ROUTE.name})
    } else {
      if (this.$route.name === LemkaHelpers.Routes.ADMIN_ROUTE.name) {
        this.$router.push({name: LemkaHelpers.Routes.DASHBOARD.name})
      }
    }
  },

  watch: {
    currentUser() {
      if (!this.currentUser) {
        this.$router.push({name: LemkaHelpers.Routes.LOGIN_ROUTE.name})
      }
    },
    thisRoute: function () {
      if (this.thisRoute === LemkaHelpers.Routes.ADMIN_ROUTE.name) {
        this.$router.push({name: LemkaHelpers.Routes.DASHBOARD.name})
      }
    }
  },

  async beforeRouteEnter(to, from, next) {
    let currentUser = JSON.parse(sessionStorage.getItem('user'))
    if (currentUser.is_staff === true) {
      next();
    } else {
      next({name: LemkaHelpers.Routes.LOGIN_ROUTE.name})
    }
  }
}
</script>

<style scoped>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";

.router-link-exact-active {
  color: #79648F !important;
  background: #B4A8BF
}

/* ---------------------------------------------------
    DEMO STYLE
----------------------------------------------------- */

/* region demo style */

body {
  font-family: 'Poppins', sans-serif;
  background: #fafafa;
}

p {
  font-family: 'Poppins', sans-serif;
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: #999;
}

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

.navbar {
  padding: 15px 10px;
  background: #fff;
  border: none;
  border-radius: 0;
  margin-bottom: 40px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.navbar-btn {
  box-shadow: none;
  outline: none !important;
  border: none;
}

.line {
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #ddd;
  margin: 40px 0;
}

i,
span {
  display: inline-block;
}

/* endregion */

/* ---------------------------------------------------
    SIDEBAR STYLE
----------------------------------------------------- */

/* region sidebar style */

.wrapper {
  display: flex;
  align-items: stretch;
  margin-top: 0 !important;
  padding-top: 0 !important;
}

#sidebar {
  min-width: 250px;
  max-width: 250px;
  color: #808080;
  transition: all 0.3s;
}

#sidebar.active {
  min-width: 100px;
  max-width: 100px;
  text-align: center;
}

#sidebar.active .sidebar-header h3,
#sidebar.active .CTAs {
  display: none;
}

#sidebar.active .sidebar-header strong {
  display: block;
}

#sidebar ul li a {
  text-align: left;
}

#sidebar.active ul li a {
  padding: 20px 10px;
  text-align: center;
  font-size: 0.85em;
}

#sidebar.active ul li a i {
  margin-right: 0;
  display: block;
  font-size: 1.8em;
  margin-bottom: 5px;
}

#sidebar.active ul ul a {
  padding: 10px !important;
}

#sidebar.active .dropdown-toggle::after {
  top: auto;
  bottom: 10px;
  right: 50%;
  -webkit-transform: translateX(50%);
  -ms-transform: translateX(50%);
  transform: translateX(50%);
}

#sidebar .sidebar-header {
  padding: 20px;
  background: #F1F1F1; /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #B4A8BF, #F1F1F1); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #B4A8BF, #F1F1F1); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

#sidebar .sidebar-header strong {
  display: none;
  font-size: 1.8em;
}

#sidebar ul.components {
  padding: 20px 0;
  /*border-bottom: 1px solid #47748b;*/
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}

#sidebar ul li a:hover {
  color: #B4A8BF !important;
  background: #79648F; /* fallback for old browsers */
}

#sidebar ul li a i {
  margin-right: 10px;
}

#sidebar ul li.active > a,
a[aria-expanded="true"] {
  color: #fff;
  background: #6d7fcc;
}

a[data-toggle="collapse"] {
  position: relative;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: #6d7fcc;
}

ul.CTAs {
  padding: 20px;
}

ul.CTAs a {
  text-align: center;
  font-size: 0.9em !important;
  display: block;
  border-radius: 5px;
  margin-bottom: 5px;
}

a.download {
  background: #fff;
  color: #7386D5;
}

a.article,
a.article:hover {
  background: #6d7fcc !important;
  color: #fff !important;
}

/* endregion */

/* ---------------------------------------------------
    CONTENT STYLE
----------------------------------------------------- */

#content {
  width: 100%;
  min-height: 100vh;
  transition: all 0.3s;
}

/* ---------------------------------------------------
    MEDIAQUERIES
----------------------------------------------------- */

@media (max-width: 768px) {
  #sidebar {
    min-width: 80px;
    max-width: 80px;
    text-align: center;
    margin-left: -80px !important;
  }

  .dropdown-toggle::after {
    top: auto;
    bottom: 10px;
    right: 50%;
    -webkit-transform: translateX(50%);
    -ms-transform: translateX(50%);
    transform: translateX(50%);
  }

  #sidebar.active {
    margin-left: 0 !important;
  }

  #sidebar .sidebar-header h3,
  #sidebar .CTAs {
    display: none;
  }

  #sidebar .sidebar-header strong {
    display: block;
  }

  #sidebar ul li a {
    padding: 20px 10px;
  }

  #sidebar ul li a span {
    font-size: 0.85em;
  }

  #sidebar ul li a i {
    margin-right: 0;
    display: block;
  }

  #sidebar ul ul a {
    padding: 10px !important;
  }

  #sidebar ul li a i {
    font-size: 1.3em;
  }

  #sidebar {
    margin-left: 0;
  }

  #sidebarCollapse span {
    display: none;
  }

}
</style>