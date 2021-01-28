const DOMAIN = 'https://lemka-api.herokuapp.com/api';

export const AdminRouteName = {
    DASHBOARD:  {
        name: 'AdminDashboard',
        value: 'Dashboard',
        icon: 'fas fa-tachometer-alt'
    } ,
    UTILISATEURS: {
        name: 'AdminUtilisateurs',
        value: 'Utilisateurs',
        icon: 'fas fa-users'
    },
    UTILISATEURS_DETAIL: {
        name: 'AdminUtilisateursDetail',
        value: 'Detail',
        icon: ''
    },
    ARTICLES: {
        name: 'AdminArticles',
        value: 'Articles',
        icon: 'fas fa-store-alt'
    },
    ARTICLES_DETAIL: {
      name: 'AdminArticleDetail',
      value: 'Detail',
      icon: ''
    },
    ARTICLES_UPDATE: {
      name: 'AdminArticleUpdate',
      value: 'Update',
      icon: ''
    },
    DEMANDE_DE_DEVIS: {
        name: 'AdminDemandeDeDevis',
        value: 'Demande de devis',
        icon: 'far fa-folder-open'
    },
    DEVIS: {
        name: 'AdminDevis',
        value: 'Devis',
        icon: 'far fa-folder'
    },
    MERCERIES: {
        name: 'AdminMercerie',
        value: 'Merceries',
        icon: 'fas fa-dolly-flatbed'
    },
    BONS_DE_COMMANDE: {
        name: 'AdminBonDeCommande',
        value: 'Bons de commande',
        icon: 'fas fa-shopping-cart'
    },
    FACTURE: {
        name: 'AdminFacture',
        value: 'Facture',
        icon: 'fas fa-money-bill'
    },
    RENDEZ_VOUS: {
        name: 'AdminRendezVous',
        value: 'Rendez-vous',
        icon: 'fas fa-calendar-check'
    },
    PARAMETRES: {
        name: 'AdminParametres',
        value: 'Parametres',
        icon: 'fas fa-sliders-h'
    },
    ARTICLE_ADD: {
        name: 'ViewAddArticle',
        value: 'Ajouter un articles',
        icon: ''
    },
    ENTREPRISE: {
      name: 'ViewEntreprise',
      value: 'Entreprise',
      icon: ''
    },
    ADD_ENTREPRISE: {
        name: 'ViewAddEntreprise',
        value: 'Ajout des informations de l\'entreprise',
        icon: ''
    },
    GENRE: {
        name: 'ViewGenre',
        value: 'Genres',
        icon: ''
    },
    GENRE_ADD: {
        name: 'ViewGenreAdd',
        value: 'Ajouter un genre',
        icon: ''
    },
    MENSURATION: {
        name: 'ViewMensuration',
        value: 'Mensurations'
    }
}


export const RouteNames = {
    HOME_ROUTE: {
        name: 'Home',
        value: 'Accueil'
    },
    ADMIN_ROUTE: {
        name: 'Admin',
        value: 'Admin'
    },
    LOGIN_ROUTE: {
        name: 'Login',
        value: 'Login'
    },
    REGISTER_ROUTE: {
        name: 'Register',
        value: 'Register'
    },
    PROFIL_ROUTE: {
        name: 'Profil',
        value: 'Profil'
    },
    HORAIRE_ROUTE: {
        name: 'Horaire',
        value: 'Horaire'
    },
    CONTACT_ROUTE: {
        name: 'Contact',
        value: 'Contact'
    },
    ABOUT_ROUTE: {
        name: 'About',
        value: 'À propos'
    },
    PAGE_NOT_FOUND_ROUTE: {
        name: 'PageNotFound',
        value: 'PageNotFound'
    }
}

export const Endpoints = {
    PROFILE_ENDPOINT: DOMAIN + '/profil/',
    PROFIL_GENRE_ENDPOINT: DOMAIN + '/profil/genres/',
    GENRES_ENDPOINT: DOMAIN + '/genres/',
    MENSURATION_ENDPOINT: DOMAIN + /mensurations/,
    USER_MENSURATION_ENDPOINT: DOMAIN + /user_mensurations/,
    VILLES_ENDPOINT: DOMAIN + '/user_adresses/villes/',
    ADRESSE_ENDPOINT: DOMAIN + '/user_adresses/',
    USERS_ENDPOINT: DOMAIN + '/utilisateurs/',
    LOGIN_ENDPOINT: DOMAIN + '/login/',
    REGISTER_ENDPOINT: DOMAIN + '/register/',
    REFRESH_ENDPOINT: DOMAIN + '/token/refresh/',
    TYPES_SERVICES_ENDPOINT: DOMAIN + '/types_services/',
    CATALOGUES_ENDPOINT: DOMAIN + '/catalogues/',
    RAYON_ENDPOINT: DOMAIN + '/rayons/',
    SECTION_ENDPOINT: DOMAIN + '/sections/',
    TYPE_PRODUIT_ENDPOINT: DOMAIN + '/type_produits/',
    CATEGORIES_ENDPOINT: DOMAIN + '/categories/',
    CHECK_USER_EXISTS_ENDPOINT: DOMAIN + '/check/',
    ENTREPRISE_ENDPOINT: DOMAIN + '/entreprise/',
    DASHBOARD_ENDPOINT: DOMAIN + '/admin-dashboard/',
    ARTICLES_ENDPOINT: DOMAIN + '/articles/',
    MERCERIE_ENDPOINT: DOMAIN + '/merceries/',
    TAGS_ENDPOINT: DOMAIN + '/tags/',
}

export const AdminEndpoints = {

}

export const GlobalEndpoints = {

}

export const FontAwesomeIcons = {
    INFO: 'fas fa-eye',
    MODIFIER: 'fas fa-edit',
    SUPPRIMER: 'fas fa-trash-alt'
}