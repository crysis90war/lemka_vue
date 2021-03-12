import Vue from 'vue'
import VueRouter from 'vue-router'
import LemkaHelpers from "@/helpers";
import VAMOCAddOrUpdate from "@/views/administrateur/merceries/VAMOCAddOrUpdate";
import VADashboard from "@/views/administrateur/dashboard/VADashboard";
import ViewAdminUsers from "@/views/administrateur/utilisateurs/ViewAdminUsers";
import VGHome from "@/views/global/VGHome";
import VGLogin from "@/views/global/VGLogin";
import VGRegister from "@/views/global/VGRegister";
import VGAbout from "@/views/global/VGAbout";
import VGHoraire from "@/views/global/VGHoraire";
import VGContact from "@/views/global/VGContact";
import VGNotFound from "@/views/global/VGNotFound";

Vue.use(VueRouter)

const PROFIL = '/profil';
const ADMIN = '/admin/';
const ROUTES = LemkaHelpers.Routes;

const adminRoutes = [
  {
    path: ADMIN + 'dashboard',
    name: ROUTES.DASHBOARD.name,
    meta: {value: ROUTES.DASHBOARD.value},
    component: VADashboard
  },
  {
    path: ADMIN + 'utilisateurs',
    name: ROUTES.UTILISATEURS.name,
    meta: {value: ROUTES.UTILISATEURS.value},
    component: () => ViewAdminUsers,
    children: [
      {
        path: ADMIN + 'utilisateurs/:username/detail',
        name: ROUTES.UTILISATEURS_DETAIL.name,
        meta: {value: ROUTES.UTILISATEURS_DETAIL.value},
        component: () => import('../views/administrateur/utilisateurs/ViewAdminUsersDetail'),
        props: true,
      }
    ]
  },
  {
    path: ADMIN + 'articles',
    name: ROUTES.ARTICLES.name,
    meta: {value: ROUTES.ARTICLES.value},
    component: () => import('../views/administrateur/articles/ViewAdminArticles'),
    children: [
      {
        path: ADMIN + 'article/:slug?',
        name: ROUTES.ARTICLES_ADD_OR_UPDATE.name,
        meta: {value: ROUTES.ARTICLES_ADD_OR_UPDATE.value},
        component: () => import('@/views/administrateur/articles/ViewAdminArticleAddOrUpdate'),
        props: true
      },
      {
        path: ADMIN + 'articles/:slug/detail',
        name: ROUTES.ARTICLES_DETAIL.name,
        meta: {value: ROUTES.ARTICLES_DETAIL.value},
        component: () => import('../views/administrateur/articles/ViewAdminArticlesDetail'),
        props: true
      }
    ]
  },
  {
    path: ADMIN + 'merceries',
    name: ROUTES.MERCERIES.name,
    meta: {value: ROUTES.MERCERIES.value},
    component: () => import('../views/administrateur/merceries/ViewAdminMerceries'),
    children: [
      {
        path: ADMIN + 'mercerie/:id?',
        name: ROUTES.MERCERIES_ADD_OR_UPDATE.name,
        meta: {value: ROUTES.MERCERIES_ADD_OR_UPDATE.value},
        component: () => import('@/views/administrateur/merceries/ViewAdminMercerieAddOrUpdate'),
        props: true
      },
      {
        path: ADMIN + 'merceries/:id/options/',
        name: ROUTES.MERCERIE_OPTIONS.name,
        meta: {value: ROUTES.MERCERIE_OPTIONS.value},
        component: () => import('@/views/administrateur/merceries/ViewAdminMercerieOptions'),
        props: true
      },
      {
        path: ADMIN + 'merceries/:mercerie_id/options/:id?',
        name: ROUTES.MO_ADD_OR_UPDATE.name,
        meta: {value: ROUTES.MO_ADD_OR_UPDATE.value},
        component: () => import('@/views/administrateur/merceries/ViewAdminMercerieOptionAddOrUpdate'),
        props: true
      },
      {
        path: ADMIN + 'mercerie_options/:mercerie_id/caracteristiques/:id?/',
        name: ROUTES.MOCAddOrUpdate.name,
        meta: {value: ROUTES.MOCAddOrUpdate.value},
        component: VAMOCAddOrUpdate,
        props: true
      }
    ]
  },
  {
    path: ADMIN + 'demande-de-devis',
    name: ROUTES.DEMANDE_DE_DEVIS.name,
    meta: {value: ROUTES.DEMANDE_DE_DEVIS.value},
    component: () => import('../views/administrateur/demande de devis/view.admin.demandeDeDevis')
  },
  {
    path: ADMIN + 'devis',
    name: ROUTES.DEVIS.name,
    meta: {value: ROUTES.DEVIS.value},
    component: () => import('../views/administrateur/devis/view.admin.devis')
  },
  {
    path: ADMIN + 'bons-de-commande',
    name: ROUTES.BONS_DE_COMMANDE.name,
    meta: {value: ROUTES.BONS_DE_COMMANDE.value},
    component: () => import('../views/administrateur/bon de commande/view.admin.bonDeCommande')
  },
  {
    path: ADMIN + 'facture',
    name: ROUTES.FACTURE.name,
    meta: {value: ROUTES.FACTURE.value},
    component: () => import('../views/administrateur/factures/view.facture')
  },
  {
    path: ADMIN + 'rendez-vous',
    name: ROUTES.RENDEZ_VOUS.name,
    meta: {value: ROUTES.RENDEZ_VOUS.value},
    component: () => import('../views/administrateur/rendez-vous/view.rendezVous')
  },
  {
    path: ADMIN + 'parametres',
    name: ROUTES.PARAMETRES.name,
    meta: {value: ROUTES.PARAMETRES.value},
    component: () => import('../views/administrateur/parametres/ViewAdminParametres'),
    children: [
      {
        path: ADMIN + 'parametres/entreprise',
        name: ROUTES.PARAMETRES_ENTREPRISE.name,
        meta: {value: ROUTES.PARAMETRES_ENTREPRISE.value},
        component: () => import('@/views/administrateur/parametres/entreprise/ViewAdminEntreprise'),
        children: [
          {
            path: ADMIN + 'parametres/entreprise/ajouter',
            name: ROUTES.PARAMETRES_ENTREPRISE_ADD.name,
            meta: {value: ROUTES.PARAMETRES_ENTREPRISE_ADD.value},
            component: () => import('../views/administrateur/parametres/entreprise/ViewAdminEntrepriseAdd')
          },
          {
            path: ADMIN + 'parametres/entreprise/update',
            name: ROUTES.PARAMETRES_ENTREPRISE_UPDATE.name,
            meta: {value: ROUTES.PARAMETRES_ENTREPRISE_UPDATE.value},
            component: () => import('../views/administrateur/parametres/entreprise/ViewAdminEntrepriseUpdate')
          }
        ]
      },
      {
        path: ADMIN + 'parametres/genres',
        name: ROUTES.PARAMETRES_GENRE.name,
        meta: {value: ROUTES.PARAMETRES_GENRE.value},
        component: () => import('../views/administrateur/parametres/genre/ViewAdminGenre'),
        children: [
          {
            path: ADMIN + 'parametres/genre/:id?',
            name: ROUTES.PARAMETRES_GENRE_ADD_OR_UPDATE.name,
            meta: {value: ROUTES.PARAMETRES_GENRE_ADD_OR_UPDATE.value},
            component: () => import('../views/administrateur/parametres/genre/ViewAdminGenreAddOrUpdate'),
            props: true
          },
        ]
      },
      {
        path: '/admin/parametres/mensurations',
        name: ROUTES.PARAMETRES_MENSURATION.name,
        meta: {value: ROUTES.PARAMETRES_MENSURATION.value},
        component: () => import('../views/administrateur/parametres/mensuration/ViewAdminMensuration'),
        children: [
          {
            path: '/admin/parametres/mensuration/:id?',
            name: ROUTES.PARAMETRES_MENSURATION_ADD_OR_UPDATE.name,
            meta: {value: ROUTES.PARAMETRES_MENSURATION_ADD_OR_UPDATE.value},
            component: () => import('../views/administrateur/parametres/mensuration/ViewAdminMensurationAddOrUpdate'),
            props: true
          }
        ]
      },
      {
        path: '/admin/parametres/services',
        name: ROUTES.PARAMETRES_SERVICE.name,
        meta: {value: ROUTES.PARAMETRES_SERVICE.value},
        component: () => import('../views/administrateur/parametres/service/ViewAdminService'),
        children: [
          {
            path: '/admin/parametres/service/:id?',
            name: ROUTES.PARAMETRES_SERVICE_ADD_OR_UPDATE.name,
            meta: {value: ROUTES.PARAMETRES_SERVICE_ADD_OR_UPDATE.value},
            component: () => import('../views/administrateur/parametres/service/ViewAdminServiceAddOrUpdate'),
            props: true
          }
        ]
      }
    ]
  }
]

const profilRoutes = [
  {
    path: PROFIL + '/informations',
    name: ROUTES.INFORMATIONS.name,
    meta: {value: ROUTES.INFORMATIONS.value},
    component: () => import('../views/utilisateur/profil/informations/ViewUserInformations'),
  },
  {
    path: PROFIL + '/informations/update',
    name: ROUTES.INFORMATIONS_UPDATE.name,
    meta: {value: ROUTES.INFORMATIONS_UPDATE.value},
    component: () => import('../views/utilisateur/profil/informations/ViewUserInformationsUpdate')
  },
  {
    path: PROFIL + '/adresse',
    name: ROUTES.ADRESSE_ADD.name,
    meta: {value: ROUTES.ADRESSE_ADD.value},
    component: () => import('../views/utilisateur/profil/informations/ViewUserAdresseAdd')
  },
  {
    path: PROFIL + '/adresse/update',
    name: ROUTES.ADRESSE_UPDATE.name,
    meta: {value: ROUTES.ADRESSE_UPDATE.value},
    component: () => import('../views/utilisateur/profil/informations/ViewUserAdresseUpdate')
  },
  {
    path: PROFIL + '/mensurations',
    name: 'ViewUserMensurations',
    meta: {value: 'Mes mensurations'},
    component: () => import('../views/utilisateur/profil/mensurations/ViewUserMensurations')
  },
  {
    path: PROFIL + '/mensurations/:id/detail',
    name: ROUTES.USER_MENSURATION_DETAIL.name,
    meta: {value: ROUTES.USER_MENSURATION_DETAIL.value},
    component: () => import('../views/utilisateur/profil/mensurations/ViewUserMensurationsDetail'),
    props: true
  },
  {
    path: PROFIL + '/mensuration/:id?',
    name: ROUTES.USER_MENSURATION_ADD_OR_UPDATE.name,
    meta: {value: ROUTES.USER_MENSURATION_ADD_OR_UPDATE.value},
    component: () => import('../views/utilisateur/profil/mensurations/ViewUserUserMensurationAddOrUpdate'),
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: ROUTES.HOME_ROUTE.name,
      meta: {value: ROUTES.HOME_ROUTE.value},
      component: VGHome
    },
    {
      path: '/login',
      name: ROUTES.LOGIN_ROUTE.name,
      meta: {value: ROUTES.LOGIN_ROUTE.value},
      component: VGLogin
    },
    {
      path: '/register',
      name: ROUTES.REGISTER_ROUTE.name,
      meta: {value: ROUTES.REGISTER_ROUTE.value},
      component: VGRegister
    },
    {
      path: '/about',
      name: ROUTES.ABOUT_ROUTE.name,
      meta: {value: ROUTES.ABOUT_ROUTE.value},
      component: VGAbout
    },
    {
      path: '/horaire',
      name: ROUTES.HORAIRE_ROUTE.name,
      meta: {value: ROUTES.HORAIRE_ROUTE.value},
      component: VGHoraire
    },
    {
      path: '/contact',
      name: ROUTES.CONTACT_ROUTE.name,
      meta: {value: ROUTES.CONTACT_ROUTE.value},
      component: VGContact
    },
    {
      path: PROFIL,
      name: ROUTES.PROFIL_ROUTE.name,
      meta: {value: ROUTES.PROFIL_ROUTE.value, requiresAuth: true},
      component: () => import('../views/utilisateur/profil/ViewUserProfil'),
      children: profilRoutes
    },
    {
      path: ADMIN,
      name: ROUTES.ADMIN_ROUTE.name,
      meta: {value: ROUTES.ADMIN_ROUTE.value, requiresAuth: true},
      component: () => import('../views/administrateur/ViewAdmin'),
      children: adminRoutes
    },
    {
      path: '/404',
      name: ROUTES.PAGE_NOT_FOUND_ROUTE.name,
      meta: {value: ROUTES.PAGE_NOT_FOUND_ROUTE.value},
      component: VGNotFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some(record => record.meta.requiresAuth);
  const loggedIn = sessionStorage.getItem('user');

  if (authRequired && !loggedIn) {
    next({name: ROUTES.LOGIN_ROUTE.name});
  } else {
    next();
  }
});

export default router
