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
      name: LemkaEnums.Routes.HOME_ROUTE.name,
      meta: {value: LemkaEnums.Routes.HOME_ROUTE.value},
      component: () => import('../views/global/ViewGlobalHome')
    },
    {
      path: '/login',
      name: LemkaEnums.Routes.LOGIN_ROUTE.name,
      meta: {value: LemkaEnums.Routes.LOGIN_ROUTE.value},
      component: () => import('../views/global/ViewGlobalLogin')
    },
    {
      path: '/register',
      name: LemkaEnums.Routes.REGISTER_ROUTE.name,
      meta: {value: LemkaEnums.Routes.REGISTER_ROUTE.value},
      component: () => import('../views/global/ViewGlobalRegister')
    },
    {
      path: '/about',
      name: LemkaEnums.Routes.ABOUT_ROUTE.name,
      meta: {value: LemkaEnums.Routes.ABOUT_ROUTE.value},
      component: () => import('../views/global/ViewGlobalAbout')
    },
    {
      path: '/horaire',
      name: LemkaEnums.Routes.HORAIRE_ROUTE.name,
      meta: {value: LemkaEnums.Routes.HORAIRE_ROUTE.value},
      component: () => import('../views/global/ViewGlobalHoraire')
    },
    {
      path: '/contact',
      name: LemkaEnums.Routes.CONTACT_ROUTE.name,
      meta: {value: LemkaEnums.Routes.CONTACT_ROUTE.value},
      component: () => import('../views/global/ViewGlobalContact')
    },
    {
      path: PROFIL,
      name: LemkaEnums.Routes.PROFIL_ROUTE.name,
      meta: {value: LemkaEnums.Routes.PROFIL_ROUTE.value, requiresAuth: true},
      component: () => import('../views/utilisateur/profil/ViewUserProfil'),
      children: [
        {
          path: PROFIL + '/informations',
          name: LemkaEnums.Routes.INFORMATIONS.name,
          meta: {value: LemkaEnums.Routes.INFORMATIONS.value},
          component: () => import('../views/utilisateur/profil/informations/ViewUserInformations'),
        },
        {
          path: PROFIL + '/informations/update',
          name: LemkaEnums.Routes.INFORMATIONS_UPDATE.name,
          meta: {value: LemkaEnums.Routes.INFORMATIONS_UPDATE.value},
          component: () => import('../views/utilisateur/profil/informations/ViewUserInformationsUpdate')
        },
        {
          path: PROFIL + '/adresse',
          name: LemkaEnums.Routes.ADRESSE_ADD.name,
          meta: {value: LemkaEnums.Routes.ADRESSE_ADD.value},
          component: () => import('../views/utilisateur/profil/informations/ViewUserAdresseAdd')
        },
        {
          path: PROFIL + '/adresse/update',
          name: LemkaEnums.Routes.ADRESSE_UPDATE.name,
          meta: {value: LemkaEnums.Routes.ADRESSE_UPDATE.value},
          component: () => import('../views/utilisateur/profil/informations/ViewUserAdresseUpdate')
        },
        {
          path: PROFIL + '/mensurations',
          name: 'ViewUserMensurations',
          meta: {value: 'Mes mensurations'},
          component: () => import('../views/utilisateur/profil/mensurations/ViewUserMensurations')
        },
        {
          path: PROFIL + '/mensurations/ajouter',
          name: LemkaEnums.Routes.MENSURATION_ADD.name,
          meta: {value: LemkaEnums.Routes.MENSURATION_ADD.value},
          component: () => import('../views/utilisateur/profil/mensurations/ViewUserMensurationAdd')
        },
        {
          path: PROFIL + '/mensurations/:id/detail',
          name: LemkaEnums.Routes.MENSURATION_DETAIL.name,
          meta: {value: LemkaEnums.Routes.MENSURATION_DETAIL.value},
          component: () => import('../views/utilisateur/profil/mensurations/ViewUserMensurationsDetail'),
          props: true
        },
        {
          path: PROFIL + 'mensurations/:id/update',
          name: LemkaEnums.Routes.MENSURATION_UPDATE.name,
          meta: {value: LemkaEnums.Routes.MENSURATION_UPDATE.value},
          component: () => import('../views/utilisateur/profil/mensurations/ViewUserMensurationUpdate'),
          props: true
        }
      ]
    },
    {
      path: ADMIN,
      name: LemkaEnums.Routes.ADMIN_ROUTE.name,
      meta: {
        value: LemkaEnums.Routes.ADMIN_ROUTE.value,
        requiresAuth: true
      },
      component: () => import('../views/administrateur/ViewAdmin'),
      children: [
        {
          path: ADMIN + 'dashboard',
          name: LemkaEnums.Routes.DASHBOARD.name,
          meta: {value: LemkaEnums.Routes.DASHBOARD.value},
          component: () => import('../views/administrateur/dashboard/ViewAdminDashboard')
        },
        {
          path: ADMIN + 'utilisateurs',
          name: LemkaEnums.Routes.UTILISATEURS.name,
          meta: {value: LemkaEnums.Routes.UTILISATEURS.value},
          component: () => import('../views/administrateur/utilisateurs/ViewAdminUsers'),
          children: [
            {
              path: ADMIN + 'utilisateurs/:username/detail',
              name: LemkaEnums.Routes.UTILISATEURS_DETAIL.name,
              meta: {value: LemkaEnums.Routes.UTILISATEURS_DETAIL.value},
              component: () => import('../views/administrateur/utilisateurs/ViewAdminUsersDetail'),
              props: true,
            }
          ]
        },
        {
          path: ADMIN + 'articles',
          name: LemkaEnums.Routes.ARTICLES.name,
          meta: {value: LemkaEnums.Routes.ARTICLES.value},
          component: () => import('../views/administrateur/articles/ViewAdminArticles'),
          children: [
            {
              path: ADMIN + 'articles/add',
              name: LemkaEnums.Routes.ARTICLE_ADD.name,
              meta: {value: LemkaEnums.Routes.ARTICLE_ADD.value},
              component: () => import('../views/administrateur/articles/ViewAdminArticlesAdd')
            },
            {
              path: ADMIN + 'articles/:slug/detail',
              name: LemkaEnums.Routes.ARTICLES_DETAIL.name,
              meta: {value: LemkaEnums.Routes.ARTICLES_DETAIL.value},
              component: () => import('../views/administrateur/articles/ViewAdminArticlesDetail'),
              props: true
            },
            {
              path: ADMIN + 'articles/:slug/update',
              name: LemkaEnums.Routes.ARTICLES_UPDATE.name,
              meta: {value: LemkaEnums.Routes.ARTICLES_UPDATE.value},
              component: () => import('../views/administrateur/articles/ViewAdminArticlesUpdate'),
              props: true
            }
          ]
        },
        {
          path: ADMIN + 'merceries',
          name: LemkaEnums.Routes.MERCERIES.name,
          meta: {value: LemkaEnums.Routes.MERCERIES.value},
          component: () => import('../views/administrateur/merceries/ViewAdminMerceries')
        },
        {
          path: ADMIN + 'demande-de-devis',
          name: LemkaEnums.Routes.DEMANDE_DE_DEVIS.name,
          meta: {value: LemkaEnums.Routes.DEMANDE_DE_DEVIS.value},
          component: () => import('../views/administrateur/demande de devis/view.admin.demandeDeDevis')
        },
        {
          path: ADMIN + 'devis',
          name: LemkaEnums.Routes.DEVIS.name,
          meta: {value: LemkaEnums.Routes.DEVIS.value},
          component: () => import('../views/administrateur/devis/view.admin.devis')
        },
        {
          path: ADMIN + 'bons-de-commande',
          name: LemkaEnums.Routes.BONS_DE_COMMANDE.name,
          meta: {value: LemkaEnums.Routes.BONS_DE_COMMANDE.value},
          component: () => import('../views/administrateur/bon de commande/view.admin.bonDeCommande')
        },
        {
          path: ADMIN + 'facture',
          name: LemkaEnums.Routes.FACTURE.name,
          meta: {value: LemkaEnums.Routes.FACTURE.value},
          component: () => import('../views/administrateur/factures/view.facture')
        },
        {
          path: ADMIN + 'rendez-vous',
          name: LemkaEnums.Routes.RENDEZ_VOUS.name,
          meta: {value: LemkaEnums.Routes.RENDEZ_VOUS.value},
          component: () => import('../views/administrateur/rendez-vous/view.rendezVous')
        },
        {
          path: ADMIN + 'parametres',
          name: LemkaEnums.Routes.PARAMETRES.name,
          meta: {value: LemkaEnums.Routes.PARAMETRES.value},
          component: () => import('../views/administrateur/parametres/ViewAdminParametres'),
          children: [
            {
              path: ADMIN + 'parametres/entreprise',
              name: LemkaEnums.Routes.PARAMETRES_ENTREPRISE.name,
              meta: {value: LemkaEnums.Routes.PARAMETRES_ENTREPRISE.value},
              component: () => import('../views/administrateur/parametres/entreprise/ViewAdminEntreprise'),
              children: [
                {
                  path: ADMIN + 'parametres/entreprise/ajouter',
                  name: LemkaEnums.Routes.PARAMETRES_ENTREPRISE_ADD.name,
                  meta: {value: LemkaEnums.Routes.PARAMETRES_ENTREPRISE_ADD.value},
                  component: () => import('../views/administrateur/parametres/entreprise/ViewAdminEntrepriseAdd')
                }
              ]
            },
            {
              path: ADMIN + 'parametres/genres',
              name: LemkaEnums.Routes.PARAMETRES_GENRE.name,
              meta: {value: LemkaEnums.Routes.PARAMETRES_GENRE.value},
              component: () => import('../views/administrateur/parametres/genre/view.admin.genre'),
              children: [
                {
                  path: ADMIN + 'parametres/genres/ajouter',
                  name: LemkaEnums.Routes.PARAMETRES_GENRE_ADD.name,
                  meta: {value: LemkaEnums.Routes.PARAMETRES_GENRE_ADD.value},
                  component: () => import('../views/administrateur/parametres/genre/view.admin.genre.add')
                }
              ]
            },
            {
              path: '/admin/parametres/mensurations',
              name: LemkaEnums.Routes.PARAMETRES_MENSURATION.name,
              meta: {value: LemkaEnums.Routes.PARAMETRES_MENSURATION.value},
              component: () => import('../views/administrateur/parametres/mensuration/view.admin.mensurations'),
              children: [
                {
                  path: '/admin/parametres/mensurations/ajouter',
                  name: LemkaEnums.Routes.PARAMETRES_MENSURATION_ADD.name,
                  meta: {value: LemkaEnums.Routes.PARAMETRES_MENSURATION_ADD.value},
                  component: () => import('../views/administrateur/parametres/mensuration/view.admin.mensurations.add')
                }
              ]
            },
            {
              path: '/admin/parametres/services',
              name: LemkaEnums.Routes.PARAMETRES_SERVICE.name,
              meta: {value: LemkaEnums.Routes.PARAMETRES_SERVICE.value},
              component: () => import('../views/administrateur/parametres/service/view.admin.service'),
              children: [
                {
                  path: '/admin/parametres/services/ajouter',
                  name: LemkaEnums.Routes.PARAMETRES_SERVICE_ADD.name,
                  meta: {value: LemkaEnums.Routes.PARAMETRES_SERVICE_ADD.value},
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
      name: LemkaEnums.Routes.PAGE_NOT_FOUND_ROUTE.name,
      meta: {value: LemkaEnums.Routes.PAGE_NOT_FOUND_ROUTE.value},
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
    next({name: LemkaEnums.Routes.LOGIN_ROUTE.name});
  } else {
    next();
  }
});

export default router
