import Vue from 'vue'
import VueRouter from 'vue-router'
import {AdminRouteName, RouteNames} from "@/helpers/enums.helper";

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: RouteNames.HOME_ROUTE.name,
      meta: {value: RouteNames.HOME_ROUTE.value},
      component: () => import('../components/global/view.home')
    },
    {
      path: '/login',
      name: RouteNames.LOGIN_ROUTE.name,
      meta: {value: RouteNames.LOGIN_ROUTE.value},
      component: () => import('../components/global/view.login')
    },
    {
      path: '/register',
      name: RouteNames.REGISTER_ROUTE.name,
      meta: {value: RouteNames.REGISTER_ROUTE.value},
      component: () => import('../components/global/view.register')
    },
    {
      path: '/about',
      name: RouteNames.ABOUT_ROUTE.name,
      meta: {value: RouteNames.ABOUT_ROUTE.value},
      component: () => import('../components/global/view.about')
    },
    {
      path: '/horaire',
      name: RouteNames.HORAIRE_ROUTE.name,
      meta: {value: RouteNames.HORAIRE_ROUTE.value},
      component: () => import('../components/global/view.horaire')
    },
    {
      path: '/profil',
      name: RouteNames.PROFIL_ROUTE.name,
      meta: {
        value: RouteNames.PROFIL_ROUTE.value,
        requiresAuth: true
      },
      component: () => import('../components/utilisateur/view.profil')
    },
    {
      path: '/contact',
      name: RouteNames.CONTACT_ROUTE.name,
      meta: {value: RouteNames.CONTACT_ROUTE.value},
      component: () => import('../components/global/view.contact')
    },
    {
      path: '/admin',
      name: RouteNames.ADMIN_ROUTE.name,
      meta: {
        value: RouteNames.ADMIN_ROUTE.value,
        requiresAuth: true
      },
      component: () => import('../components/administrateur/view.admin'),
      children: [
        {
          path: '/admin/dashboard',
          name: AdminRouteName.DASHBOARD.name,
          meta: {value: AdminRouteName.DASHBOARD.value},
          component: () => import('../components/administrateur/dashboard/view.admin.dashboard')
        },
        {
          path: '/admin/utilisateurs',
          name: AdminRouteName.UTILISATEURS.name,
          meta: {value: AdminRouteName.UTILISATEURS.value},
          component: () => import('../components/administrateur/utilisateurs/view.admin.users'),
          children: [
            {
              path: '/admin/utiilisateurs/:username',
              name: AdminRouteName.UTILISATEURS_DETAIL.name,
              meta: {value: AdminRouteName.UTILISATEURS_DETAIL.value},
              component: () => import('../components/administrateur/utilisateurs/view.admin.users.detail'),
              props: true,
            }
          ]
        },
        {
          path: '/admin/articles',
          name: AdminRouteName.ARTICLES.name,
          meta: {value: AdminRouteName.ARTICLES.value},
          component: () => import('../components/administrateur/articles/view.admin.articles'),
          children: [
            {
              path: '/admin/articles/add',
              name: AdminRouteName.ARTICLE_ADD.name,
              meta: {value: AdminRouteName.ARTICLE_ADD.value},
              component: () => import('../components/administrateur/articles/view.admin.articles.ajouter')
            },
            {
              path:'/admin/articles/:slug/detail',
              name: AdminRouteName.ARTICLES_DETAIL.name,
              meta: {value: AdminRouteName.ARTICLES_DETAIL.value},
              component: () => import('../components/administrateur/articles/view.admin.articles.detail'),
              props: true
            },
            {
              path: '/admin/articles/:slug/update',
              name: AdminRouteName.ARTICLES_UPDATE.name,
              meta: {value: AdminRouteName.ARTICLES_UPDATE.value},
              component: () => import('../components/administrateur/articles/view.admin.articles.update'),
              props: true
            }
          ]
        },
        {
          path: '/admin/merceries',
          name: AdminRouteName.MERCERIES.name,
          meta: {value: AdminRouteName.MERCERIES.value},
          component: () => import('../components/administrateur/merceries/view.merceries')
        },
        {
          path: '/admin/demande-de-devis',
          name: AdminRouteName.DEMANDE_DE_DEVIS.name,
          meta: {value: AdminRouteName.DEMANDE_DE_DEVIS.value},
          component: () => import('../components/administrateur/demande de devis/view.admin.demandeDeDevis')
        },
        {
          path: '/admin/devis',
          name: AdminRouteName.DEVIS.name,
          meta: {value: AdminRouteName.DEVIS.value},
          component: () => import('../components/administrateur/devis/view.admin.devis')
        },
        {
          path: '/admin/bons-de-commande',
          name: AdminRouteName.BONS_DE_COMMANDE.name,
          meta: {value: AdminRouteName.BONS_DE_COMMANDE.value},
          component: () => import('../components/administrateur/bon de commande/view.admin.bonDeCommande')
        },
        {
          path: '/admin/facture',
          name: AdminRouteName.FACTURE.name,
          meta: {value: AdminRouteName.FACTURE.value},
          component: () => import('../components/administrateur/factures/view.facture')
        },
        {
          path: '/admin/rendez-vous',
          name: AdminRouteName.RENDEZ_VOUS.name,
          meta: {value: AdminRouteName.RENDEZ_VOUS.value},
          component: () => import('../components/administrateur/rendez-vous/view.rendezVous')
        },
        {
          path: '/admin/parametres',
          name: AdminRouteName.PARAMETRES.name,
          meta: {value: AdminRouteName.PARAMETRES.value},
          component: () => import('../components/administrateur/parametres/view.admin.parametres'),
          children: [
            {
              path: '/admin/parametres/entreprise',
              name: AdminRouteName.ENTREPRISE.name,
              meta: {value: AdminRouteName.ENTREPRISE.value},
              component: () => import('../components/administrateur/parametres/entreprise/view.admin.entreprise'),
              children: [
                {
                  path: '/admin/parametres/entreprise/ajouter',
                  name: AdminRouteName.ADD_ENTREPRISE.name,
                  meta: {value: AdminRouteName.ADD_ENTREPRISE.value},
                  component: () => import('../components/administrateur/parametres/entreprise/view.admin.entreprise.add')
                }
              ]
            },
            {
              path: '/admin/parametres/genres',
              name: AdminRouteName.GENRE.name,
              meta: {value: AdminRouteName.GENRE.value},
              component: () => import('../components/administrateur/parametres/genre/view.admin.genre'),
              children: [
                {
                  path: '/admin/parametres/genres/ajouter',
                  name: AdminRouteName.GENRE_ADD.name,
                  meta: {value: AdminRouteName.GENRE_ADD.value},
                  component: () => import('../components/administrateur/parametres/genre/view.admin.genre.add')
                }
              ]
            },
            {
              path: '/admin/parametres/mensurations',
              name: AdminRouteName.MENSURATION.name,
              meta: {value: AdminRouteName.MENSURATION.value},
              component: () => import('../components/administrateur/parametres/mensuration/view.admin.mensurations'),
              children: [
                {
                  path: '/admin/parametres/mensurations/ajouter',
                  name: AdminRouteName.MENSURATION_ADD.name,
                  meta: {value: AdminRouteName.MENSURATION_ADD.value},
                  component: () => import('../components/administrateur/parametres/mensuration/view.admin.mensurations.add')
                }
              ]
            },
            {
              path: '/admin/parametres/services',
              name: AdminRouteName.SERVICE.name,
              meta: {value: AdminRouteName.SERVICE.value},
              component: ()=>import('../components/administrateur/parametres/service/view.admin.service'),
              children: [
                {
                  path: '/admin/parametres/services/ajouter',
                  name: AdminRouteName.SERVICE_ADD.name,
                  meta: {value: AdminRouteName.SERVICE_ADD.value},
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
      name: RouteNames.PAGE_NOT_FOUND_ROUTE.name,
      meta: {value: RouteNames.PAGE_NOT_FOUND_ROUTE.value},
      component: () => import('../components/global/view.notFound')
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
    next({name: RouteNames.HOME_ROUTE.name});
  } else {
    next();
  }
});

export default router
