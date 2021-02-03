import Vue from 'vue'
import VueRouter from 'vue-router'
import {LemkaEnums} from "@/helpers/enums.helper";

Vue.use(VueRouter)

const PROFIL = '/profil';
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
      path: '/contact',
      name: LemkaEnums.GlobalRoutes.CONTACT_ROUTE.name,
      meta: {value: LemkaEnums.GlobalRoutes.CONTACT_ROUTE.value},
      component: () => import('../views/global/ViewGlobalContact')
    },
    {
      path: PROFIL,
      name: LemkaEnums.UserRoutes.PROFIL_ROUTE.name,
      meta: {value: LemkaEnums.UserRoutes.PROFIL_ROUTE.value, requiresAuth: true},
      component: () => import('../views/utilisateur/profil/ViewUserProfil'),
      children: [
        {
          path: PROFIL + '/informations',
          name: LemkaEnums.UserRoutes.INFORMATIONS.name,
          meta: {value: LemkaEnums.UserRoutes.INFORMATIONS.value},
          component: () => import('../views/utilisateur/profil/informations/ViewUserInformations'),
        },
        {
          path: PROFIL + '/informations/update',
          name: LemkaEnums.UserRoutes.INFORMATIONS_UPDATE.name,
          meta: {value: LemkaEnums.UserRoutes.INFORMATIONS_UPDATE.value},
          component: () => import('../views/utilisateur/profil/informations/ViewUserInformationsUpdate')
        },
        {
          path: PROFIL + '/adresse',
          name: LemkaEnums.UserRoutes.ADRESSE_ADD.name,
          meta: {value: LemkaEnums.UserRoutes.ADRESSE_ADD.value},
          component: () => import('../views/utilisateur/profil/informations/ViewUserAdresseAdd')
        },
        {
          path: PROFIL + '/mensurations',
          name: 'ViewUserMensurations',
          meta: {value: 'Mes mensurations'},
          component: () => import('../views/utilisateur/profil/mensurations/ViewUserMensurations')
        }
      ]
    },
    {
      path: ADMIN,
      name: LemkaEnums.AdminRoutes.ADMIN_ROUTE.name,
      meta: {
        value: LemkaEnums.AdminRoutes.ADMIN_ROUTE.value,
        requiresAuth: true
      },
      component: () => import('../views/administrateur/ViewAdmin'),
      children: [
        {
          path: ADMIN + 'dashboard',
          name: LemkaEnums.AdminRoutes.DASHBOARD.name,
          meta: {value: LemkaEnums.AdminRoutes.DASHBOARD.value},
          component: () => import('../views/administrateur/dashboard/view.admin.dashboard')
        },
        {
          path: ADMIN + 'utilisateurs',
          name: LemkaEnums.AdminRoutes.UTILISATEURS.name,
          meta: {value: LemkaEnums.AdminRoutes.UTILISATEURS.value},
          component: () => import('../views/administrateur/utilisateurs/ViewAdminUsers'),
          children: [
            {
              path: ADMIN + 'utilisateurs/:username/detail',
              name: LemkaEnums.AdminRoutes.UTILISATEURS_DETAIL.name,
              meta: {value: LemkaEnums.AdminRoutes.UTILISATEURS_DETAIL.value},
              component: () => import('../views/administrateur/utilisateurs/ViewAdminUsersDetail'),
              props: true,
            }
          ]
        },
        {
          path: ADMIN + 'articles',
          name: LemkaEnums.AdminRoutes.ARTICLES.name,
          meta: {value: LemkaEnums.AdminRoutes.ARTICLES.value},
          component: () => import('../views/administrateur/articles/ViewAdminArticles'),
          children: [
            {
              path: ADMIN + 'articles/add',
              name: LemkaEnums.AdminRoutes.ARTICLE_ADD.name,
              meta: {value: LemkaEnums.AdminRoutes.ARTICLE_ADD.value},
              component: () => import('../views/administrateur/articles/ViewAdminArticlesAdd')
            },
            {
              path: ADMIN + 'articles/:slug/detail',
              name: LemkaEnums.AdminRoutes.ARTICLES_DETAIL.name,
              meta: {value: LemkaEnums.AdminRoutes.ARTICLES_DETAIL.value},
              component: () => import('../views/administrateur/articles/ViewAdminArticlesDetail'),
              props: true
            },
            {
              path: ADMIN + 'articles/:slug/update',
              name: LemkaEnums.AdminRoutes.ARTICLES_UPDATE.name,
              meta: {value: LemkaEnums.AdminRoutes.ARTICLES_UPDATE.value},
              component: () => import('../views/administrateur/articles/ViewAdminArticlesUpdate'),
              props: true
            }
          ]
        },
        {
          path: ADMIN + 'merceries',
          name: LemkaEnums.AdminRoutes.MERCERIES.name,
          meta: {value: LemkaEnums.AdminRoutes.MERCERIES.value},
          component: () => import('../views/administrateur/merceries/view.merceries')
        },
        {
          path: ADMIN + 'demande-de-devis',
          name: LemkaEnums.AdminRoutes.DEMANDE_DE_DEVIS.name,
          meta: {value: LemkaEnums.AdminRoutes.DEMANDE_DE_DEVIS.value},
          component: () => import('../views/administrateur/demande de devis/view.admin.demandeDeDevis')
        },
        {
          path: ADMIN + 'devis',
          name: LemkaEnums.AdminRoutes.DEVIS.name,
          meta: {value: LemkaEnums.AdminRoutes.DEVIS.value},
          component: () => import('../views/administrateur/devis/view.admin.devis')
        },
        {
          path: ADMIN + 'bons-de-commande',
          name: LemkaEnums.AdminRoutes.BONS_DE_COMMANDE.name,
          meta: {value: LemkaEnums.AdminRoutes.BONS_DE_COMMANDE.value},
          component: () => import('../views/administrateur/bon de commande/view.admin.bonDeCommande')
        },
        {
          path: ADMIN + 'facture',
          name: LemkaEnums.AdminRoutes.FACTURE.name,
          meta: {value: LemkaEnums.AdminRoutes.FACTURE.value},
          component: () => import('../views/administrateur/factures/view.facture')
        },
        {
          path: ADMIN + 'rendez-vous',
          name: LemkaEnums.AdminRoutes.RENDEZ_VOUS.name,
          meta: {value: LemkaEnums.AdminRoutes.RENDEZ_VOUS.value},
          component: () => import('../views/administrateur/rendez-vous/view.rendezVous')
        },
        {
          path: ADMIN + 'parametres',
          name: LemkaEnums.AdminRoutes.PARAMETRES.name,
          meta: {value: LemkaEnums.AdminRoutes.PARAMETRES.value},
          component: () => import('../views/administrateur/parametres/view.admin.parametres'),
          children: [
            {
              path: ADMIN + 'parametres/entreprise',
              name: LemkaEnums.AdminRoutes.PARAMETRES_ENTREPRISE.name,
              meta: {value: LemkaEnums.AdminRoutes.PARAMETRES_ENTREPRISE.value},
              component: () => import('../views/administrateur/parametres/entreprise/view.admin.entreprise'),
              children: [
                {
                  path: ADMIN + 'parametres/entreprise/ajouter',
                  name: LemkaEnums.AdminRoutes.PARAMETRES_ENTREPRISE_ADD.name,
                  meta: {value: LemkaEnums.AdminRoutes.PARAMETRES_ENTREPRISE_ADD.value},
                  component: () => import('../views/administrateur/parametres/entreprise/view.admin.entreprise.add')
                }
              ]
            },
            {
              path: ADMIN + 'parametres/genres',
              name: LemkaEnums.AdminRoutes.PARAMETRES_GENRE.name,
              meta: {value: LemkaEnums.AdminRoutes.PARAMETRES_GENRE.value},
              component: () => import('../views/administrateur/parametres/genre/view.admin.genre'),
              children: [
                {
                  path: ADMIN + 'parametres/genres/ajouter',
                  name: LemkaEnums.AdminRoutes.PARAMETRES_GENRE_ADD.name,
                  meta: {value: LemkaEnums.AdminRoutes.PARAMETRES_GENRE_ADD.value},
                  component: () => import('../views/administrateur/parametres/genre/view.admin.genre.add')
                }
              ]
            },
            {
              path: '/admin/parametres/mensurations',
              name: LemkaEnums.AdminRoutes.PARAMETRES_MENSURATION.name,
              meta: {value: LemkaEnums.AdminRoutes.PARAMETRES_MENSURATION.value},
              component: () => import('../views/administrateur/parametres/mensuration/view.admin.mensurations'),
              children: [
                {
                  path: '/admin/parametres/mensurations/ajouter',
                  name: LemkaEnums.AdminRoutes.PARAMETRES_MENSURATION_ADD.name,
                  meta: {value: LemkaEnums.AdminRoutes.PARAMETRES_MENSURATION_ADD.value},
                  component: () => import('../views/administrateur/parametres/mensuration/view.admin.mensurations.add')
                }
              ]
            },
            {
              path: '/admin/parametres/services',
              name: LemkaEnums.AdminRoutes.PARAMETRES_SERVICE.name,
              meta: {value: LemkaEnums.AdminRoutes.PARAMETRES_SERVICE.value},
              component: () => import('../views/administrateur/parametres/service/view.admin.service'),
              children: [
                {
                  path: '/admin/parametres/services/ajouter',
                  name: LemkaEnums.AdminRoutes.PARAMETRES_SERVICE_ADD.name,
                  meta: {value: LemkaEnums.AdminRoutes.PARAMETRES_SERVICE_ADD.value},
                  component: () => import('../views/administrateur/parametres/service/view.admin.service.add')
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
