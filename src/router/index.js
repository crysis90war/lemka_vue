import Vue from 'vue'
import VueRouter from 'vue-router'
import {LemkaEnums} from "@/helpers/enums.helper";

Vue.use(VueRouter)

const PROFIL = '/profil/';
const ADMIN = '/admin/';

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: LemkaEnums.GlobalRoutes.HOME_ROUTE.name,
      meta: {value: LemkaEnums.GlobalRoutes.HOME_ROUTE.value},
      component: () => import('../views/global/ViewGlobalHome')
    },
    {
      path: '/login',
      name: LemkaEnums.GlobalRoutes.LOGIN_ROUTE.name,
      meta: {value: LemkaEnums.GlobalRoutes.LOGIN_ROUTE.value},
      component: () => import('../views/global/ViewGlobalLogin')
    },
    {
      path: '/register',
      name: LemkaEnums.GlobalRoutes.REGISTER_ROUTE.name,
      meta: {value: LemkaEnums.GlobalRoutes.REGISTER_ROUTE.value},
      component: () => import('../views/global/ViewGlobalRegister')
    },
    {
      path: '/about',
      name: LemkaEnums.GlobalRoutes.ABOUT_ROUTE.name,
      meta: {value: LemkaEnums.GlobalRoutes.ABOUT_ROUTE.value},
      component: () => import('../views/global/ViewGlobalAbout')
    },
    {
      path: '/horaire',
      name: LemkaEnums.GlobalRoutes.HORAIRE_ROUTE.name,
      meta: {value: LemkaEnums.GlobalRoutes.HORAIRE_ROUTE.value},
      component: () => import('../views/global/ViewGlobalHoraire')
    },
    {
      path: PROFIL,
      name: LemkaEnums.UserRoutes.PROFIL_ROUTE.name,
      meta: {
        value: LemkaEnums.UserRoutes.PROFIL_ROUTE.value,
        requiresAuth: true
      },
      component: () => import('../views/utilisateur/profil/ViewUserProfil'),
      children: [
        {
          path: PROFIL + 'informations',
          name: 'ViewUserInformations',
          meta: {value: 'Informations de l\'utilisateur'},
          component: () => import('../views/utilisateur/profil/informations/ViewUserInformations')
        },
        {
          path: PROFIL + 'mensurations',
          name: 'ViewUserMensurations',
          meta: {value: 'Mes mensurations'},
          component: () => import('@/views/utilisateur/profil/mensurations/ViewUserMensurations')
        }
      ]
    },
    {
      path: '/contact',
      name: LemkaEnums.GlobalRoutes.CONTACT_ROUTE.name,
      meta: {value: LemkaEnums.GlobalRoutes.CONTACT_ROUTE.value},
      component: () => import('../views/global/ViewGlobalContact')
    },
    {
      path: '/admin',
      name: LemkaEnums.AdminRoutes.ADMIN_ROUTE.name,
      meta: {
        value: LemkaEnums.AdminRoutes.ADMIN_ROUTE.value,
        requiresAuth: true
      },
      component: () => import('../components/administrateur/view.admin'),
      children: [
        {
          path: ADMIN + 'dashboard',
          name: LemkaEnums.AdminRoutes.DASHBOARD.name,
          meta: {value: LemkaEnums.AdminRoutes.DASHBOARD.value},
          component: () => import('../components/administrateur/dashboard/view.admin.dashboard')
        },
        {
          path: ADMIN + 'utilisateurs',
          name: LemkaEnums.AdminRoutes.UTILISATEURS.name,
          meta: {value: LemkaEnums.AdminRoutes.UTILISATEURS.value},
          component: () => import('../components/administrateur/utilisateurs/view.admin.users'),
          children: [
            {
              path: ADMIN + 'utiilisateurs/:username',
              name: LemkaEnums.AdminRoutes.UTILISATEURS_DETAIL.name,
              meta: {value: LemkaEnums.AdminRoutes.UTILISATEURS_DETAIL.value},
              component: () => import('../components/administrateur/utilisateurs/view.admin.users.detail'),
              props: true,
            }
          ]
        },
        {
          path: ADMIN + 'articles',
          name: LemkaEnums.AdminRoutes.ARTICLES.name,
          meta: {value: LemkaEnums.AdminRoutes.ARTICLES.value},
          component: () => import('../components/administrateur/articles/view.admin.articles'),
          children: [
            {
              path: ADMIN + 'articles/add',
              name: LemkaEnums.AdminRoutes.ARTICLE_ADD.name,
              meta: {value: LemkaEnums.AdminRoutes.ARTICLE_ADD.value},
              component: () => import('../components/administrateur/articles/view.admin.articles.ajouter')
            },
            {
              path: ADMIN + 'articles/:slug/detail',
              name: LemkaEnums.AdminRoutes.ARTICLES_DETAIL.name,
              meta: {value: LemkaEnums.AdminRoutes.ARTICLES_DETAIL.value},
              component: () => import('../components/administrateur/articles/view.admin.articles.detail'),
              props: true
            },
            {
              path: ADMIN + 'articles/:slug/update',
              name: LemkaEnums.AdminRoutes.ARTICLES_UPDATE.name,
              meta: {value: LemkaEnums.AdminRoutes.ARTICLES_UPDATE.value},
              component: () => import('../components/administrateur/articles/view.admin.articles.update'),
              props: true
            }
          ]
        },
        {
          path: ADMIN + 'merceries',
          name: LemkaEnums.AdminRoutes.MERCERIES.name,
          meta: {value: LemkaEnums.AdminRoutes.MERCERIES.value},
          component: () => import('../components/administrateur/merceries/view.merceries')
        },
        {
          path: ADMIN + 'demande-de-devis',
          name: LemkaEnums.AdminRoutes.DEMANDE_DE_DEVIS.name,
          meta: {value: LemkaEnums.AdminRoutes.DEMANDE_DE_DEVIS.value},
          component: () => import('../components/administrateur/demande de devis/view.admin.demandeDeDevis')
        },
        {
          path: ADMIN + 'devis',
          name: LemkaEnums.AdminRoutes.DEVIS.name,
          meta: {value: LemkaEnums.AdminRoutes.DEVIS.value},
          component: () => import('../components/administrateur/devis/view.admin.devis')
        },
        {
          path: ADMIN + 'bons-de-commande',
          name: LemkaEnums.AdminRoutes.BONS_DE_COMMANDE.name,
          meta: {value: LemkaEnums.AdminRoutes.BONS_DE_COMMANDE.value},
          component: () => import('../components/administrateur/bon de commande/view.admin.bonDeCommande')
        },
        {
          path: ADMIN + 'facture',
          name: LemkaEnums.AdminRoutes.FACTURE.name,
          meta: {value: LemkaEnums.AdminRoutes.FACTURE.value},
          component: () => import('../components/administrateur/factures/view.facture')
        },
        {
          path: ADMIN + 'rendez-vous',
          name: LemkaEnums.AdminRoutes.RENDEZ_VOUS.name,
          meta: {value: LemkaEnums.AdminRoutes.RENDEZ_VOUS.value},
          component: () => import('../components/administrateur/rendez-vous/view.rendezVous')
        },
        {
          path: ADMIN + 'parametres',
          name: LemkaEnums.AdminRoutes.PARAMETRES.name,
          meta: {value: LemkaEnums.AdminRoutes.PARAMETRES.value},
          component: () => import('../components/administrateur/parametres/view.admin.parametres'),
          children: [
            {
              path: ADMIN + 'parametres/entreprise',
              name: LemkaEnums.AdminRoutes.PARAMETRES_ENTREPRISE.name,
              meta: {value: LemkaEnums.AdminRoutes.PARAMETRES_ENTREPRISE.value},
              component: () => import('../components/administrateur/parametres/entreprise/view.admin.entreprise'),
              children: [
                {
                  path: ADMIN + 'parametres/entreprise/ajouter',
                  name: LemkaEnums.AdminRoutes.PARAMETRES_ENTREPRISE_ADD.name,
                  meta: {value: LemkaEnums.AdminRoutes.PARAMETRES_ENTREPRISE_ADD.value},
                  component: () => import('../components/administrateur/parametres/entreprise/view.admin.entreprise.add')
                }
              ]
            },
            {
              path: ADMIN + 'parametres/genres',
              name: LemkaEnums.AdminRoutes.PARAMETRES_GENRE.name,
              meta: {value: LemkaEnums.AdminRoutes.PARAMETRES_GENRE.value},
              component: () => import('../components/administrateur/parametres/genre/view.admin.genre'),
              children: [
                {
                  path: ADMIN + 'parametres/genres/ajouter',
                  name: LemkaEnums.AdminRoutes.PARAMETRES_GENRE_ADD.name,
                  meta: {value: LemkaEnums.AdminRoutes.PARAMETRES_GENRE_ADD.value},
                  component: () => import('../components/administrateur/parametres/genre/view.admin.genre.add')
                }
              ]
            },
            {
              path: '/admin/parametres/mensurations',
              name: LemkaEnums.AdminRoutes.PARAMETRES_MENSURATION.name,
              meta: {value: LemkaEnums.AdminRoutes.PARAMETRES_MENSURATION.value},
              component: () => import('../components/administrateur/parametres/mensuration/view.admin.mensurations'),
              children: [
                {
                  path: '/admin/parametres/mensurations/ajouter',
                  name: LemkaEnums.AdminRoutes.PARAMETRES_MENSURATION_ADD.name,
                  meta: {value: LemkaEnums.AdminRoutes.PARAMETRES_MENSURATION_ADD.value},
                  component: () => import('../components/administrateur/parametres/mensuration/view.admin.mensurations.add')
                }
              ]
            },
            {
              path: '/admin/parametres/services',
              name: LemkaEnums.AdminRoutes.PARAMETRES_SERVICE.name,
              meta: {value: LemkaEnums.AdminRoutes.PARAMETRES_SERVICE.value},
              component: ()=>import('../components/administrateur/parametres/service/view.admin.service'),
              children: [
                {
                  path: '/admin/parametres/services/ajouter',
                  name: LemkaEnums.AdminRoutes.PARAMETRES_SERVICE_ADD.name,
                  meta: {value: LemkaEnums.AdminRoutes.PARAMETRES_SERVICE_ADD.value},
                  component: () => import('../components/administrateur/parametres/service/view.admin.service.add')
                }
              ]
            }
          ]
        }
      ],
    },
    {
      path: '/404',
      name: LemkaEnums.GlobalRoutes.PAGE_NOT_FOUND_ROUTE.name,
      meta: {value: LemkaEnums.GlobalRoutes.PAGE_NOT_FOUND_ROUTE.value},
      component: () => import('../views/global/ViewGlobalNotFound')
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
    next({name: LemkaEnums.GlobalRoutes.HOME_ROUTE.name});
  } else {
    next();
  }
});

export default router
