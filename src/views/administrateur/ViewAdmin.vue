<template>
  <div class="administration">
    <div class="wrapper">
      <!-- Sidebar  -->
      <nav id="sidebar" class="bg-light">
        <div class="sidebar-header">
          <h3><img :src="logo" alt="" style="max-width: 200px;"/></h3>
          <strong>LK</strong>
        </div>

        <ul class="list-unstyled components">
          <li v-for="(item, index) in menu" :key="index">
            <b-nav-item :to="item.href">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
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

        <section class="p-5">
          <router-view></router-view>
        </section>
      </div>

    </div>

  </div>
</template>

<script>
import LemkaHelpers from "@/helpers";
import {mapGetters} from "vuex";
import ApiService from '@/services/api.service';

export default {
  name: "ViewAdmin",
  data() {
    return {
      menu: [
        {
          href: {name: LemkaHelpers.Routes.PARAMETRES_ENTREPRISE.name},
          title: LemkaHelpers.Routes.PARAMETRES_ENTREPRISE.value,
          icon: LemkaHelpers.FontAwesomeIcons.COMPANY
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
          href: {name: LemkaHelpers.Routes.DEMANDE_DEVIS_ADMIN.name},
          title: LemkaHelpers.Routes.DEMANDE_DEVIS_ADMIN.value,
          icon: LemkaHelpers.FontAwesomeIcons.FOLDER_OPEN
        },
        {
          href: {name: LemkaHelpers.Routes.DEVIS.name},
          title: LemkaHelpers.Routes.DEVIS.value,
          icon: LemkaHelpers.FontAwesomeIcons.FOLDER
        },
        {
          href: {name: LemkaHelpers.Routes.RENDEZ_VOUS.name},
          title: LemkaHelpers.Routes.RENDEZ_VOUS.value,
          icon: LemkaHelpers.FontAwesomeIcons.CALENDAR
        },
        {
          href: {name: LemkaHelpers.Routes.ADMIN_HORAIRE.name},
          title: LemkaHelpers.Routes.ADMIN_HORAIRE.value,
          icon: LemkaHelpers.FontAwesomeIcons.CLOCK
        },
        {
          href: {name: LemkaHelpers.Routes.PARAMETRES.name},
          title: LemkaHelpers.Routes.PARAMETRES.value,
          icon: LemkaHelpers.FontAwesomeIcons.PARAMETRES
        },
      ],
      toggled: false,
      BSClass: LemkaHelpers.BSClass
    }
  },
  computed: {
    ...mapGetters({currentUser: "Auth/user"}),
    logo() {
      return require('@/assets/Lemka.png')
    },
    thisRoute() {
      return this.$route.name
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
        this.$router.push({name: LemkaHelpers.Routes.PARAMETRES_ENTREPRISE.name})
      }
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
        this.$router.push({name: LemkaHelpers.Routes.PARAMETRES_ENTREPRISE.name})
      }
    }
  },
  async beforeRouteEnter(to, from, next) {
    next(vm => {
      const currentUser = vm.$store.getters["Auth/user"]
      if (currentUser.is_staff === true) {
        ApiService.GETData('is-admin/').then(() => {
          next();
        }, () => {
          next({name: LemkaHelpers.Routes.PROFIL_ROUTE.name})
        })
        next();
      } else {
        next({name: LemkaHelpers.Routes.LOGIN_ROUTE.name})
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";

.router-link-exact-active {
  color: #79648F !important;
  background: #B4A8BF;
}

p {
  font-family: 'Poppins', sans-serif;
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: #999;
}

a {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
  }

  &:focus {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
  }
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

i {
  display: inline-block;
}

span {
  display: inline-block;
}

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

  ul {
    li {
      a {
        text-align: left;
        padding: 10px;
        font-size: 1.1em;
        display: block;

        &:hover {
          color: #B4A8BF !important;
          background: #79648F;
        }

        i {
          margin-right: 10px;
        }
      }
    }

    li.active {
      > a {
        color: #fff;
        background: #6d7fcc;
      }
    }
  }

  .sidebar-header {
    padding: 20px;
    background: #F1F1F1;
    background: -webkit-linear-gradient(to bottom, #B4A8BF, #F1F1F1);
    background: linear-gradient(to bottom, #B4A8BF, #F1F1F1);

    strong {
      display: none;
      font-size: 1.8em;
    }
  }

  ul.components {
    padding: 20px 0;
  }
}

#sidebar.active {
  min-width: 100px;
  max-width: 100px;
  text-align: center;

  .sidebar-header {
    h3 {
      display: none;
    }

    strong {
      display: block;
    }
  }

  .CTAs {
    display: none;
  }

  ul {
    li {
      a {
        padding: 20px 10px;
        text-align: center;
        font-size: 0.85em;

        i {
          margin-right: 0;
          display: block;
          font-size: 1.8em;
          margin-bottom: 5px;
        }
      }
    }

    ul {
      a {
        padding: 10px !important;
      }
    }
  }

  .dropdown-toggle {
    &::after {
      top: auto;
      bottom: 10px;
      right: 50%;
      -webkit-transform: translateX(50%);
      -ms-transform: translateX(50%);
      transform: translateX(50%);
    }
  }
}

a[aria-expanded="true"] {
  color: #fff;
  background: #6d7fcc;
}

a[data-toggle="collapse"] {
  position: relative;
}

.dropdown-toggle {
  &::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }
}

ul {
  ul {
    a {
      font-size: 0.9em !important;
      padding-left: 30px !important;
      background: #6d7fcc;
    }
  }
}

ul.CTAs {
  padding: 20px;

  a {
    text-align: center;
    font-size: 0.9em !important;
    display: block;
    border-radius: 5px;
    margin-bottom: 5px;
  }
}

a.download {
  background: #fff;
  color: #7386D5;
}

a.article {
  background: #6d7fcc !important;
  color: #fff !important;

  &:hover {
    background: #6d7fcc !important;
    color: #fff !important;
  }
}

#content {
  width: 100%;
  min-height: 100vh;
  transition: all 0.3s;
}

@media (max-width: 768px) {
  #sidebar {
    min-width: 80px;
    max-width: 80px;
    text-align: center;
    margin-left: -80px !important;

    .sidebar-header {
      h3 {
        display: none;
      }

      strong {
        display: block;
      }
    }

    .CTAs {
      display: none;
    }

    ul {
      li {
        a {
          padding: 20px 10px;

          span {
            font-size: 0.85em;
          }

          i {
            margin-right: 0;
            display: block;
            font-size: 1.3em;
          }
        }
      }

      ul {
        a {
          padding: 10px !important;
        }
      }
    }
  }
  .dropdown-toggle {
    &::after {
      top: auto;
      bottom: 10px;
      right: 50%;
      -webkit-transform: translateX(50%);
      -ms-transform: translateX(50%);
      transform: translateX(50%);
    }
  }
  #sidebar.active {
    margin-left: 0 !important;
  }
  #sidebarCollapse {
    span {
      display: none;
    }
  }
}
</style>