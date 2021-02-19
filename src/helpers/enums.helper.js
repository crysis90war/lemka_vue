// const DOMAIN = 'https://lemka-api.herokuapp.com/api';
const DOMAIN = 'http://127.0.0.1:8000/api';
const PROFIL = DOMAIN + '/profil';
const AdminView = 'ViewAdmin';
const UserView = 'ViewUser';
const GlobalView = 'ViewGlobal';

const Routes = {
    // region Global routes
    HOME_ROUTE: {name: GlobalView + 'Home', value: 'Accueil'},
    LOGIN_ROUTE: {name: GlobalView + 'Login', value: 'Se connecter'},
    REGISTER_ROUTE: {name: GlobalView + 'Register', value: 'S\'inscrire'},
    HORAIRE_ROUTE: {name: GlobalView + 'Horaire', value: 'Horaire'},
    CONTACT_ROUTE: {name: GlobalView + 'Contact', value: 'Contact'},
    ABOUT_ROUTE: {name: GlobalView + 'About', value: 'À propos'},
    PAGE_NOT_FOUND_ROUTE: {name: GlobalView + 'PageNotFound', value: 'PageNotFound'},
    // endregion

    // region User routes
    PROFIL_ROUTE: {name: UserView + 'Profil', value: 'Profil'},
    INFORMATIONS: {name: UserView + 'Informations', value: 'Informations'},
    INFORMATIONS_UPDATE: {name: UserView + 'InformationsUpdate', value: 'Modifier'},
    ADRESSE_ADD: {name: UserView + 'AdresseAdd', value: 'Ajouter une adresse'},
    ADRESSE_UPDATE: {name: UserView + 'AdresseUpdate', value: 'Modifier l\'adresse'},
    MENSURATIONS: {name: UserView + 'Mensurations', value: 'Mensurations'},
    MENSURATION_ADD: {name: UserView + 'MensurationAdd', value: 'Ajouter Mensuration'},
    MENSURATION_DETAIL: {name: UserView + 'MensurationDetail', value: 'Détail'},
    MENSURATION_UPDATE: {name: UserView + 'MensurationUpdate', value: 'Modification'},
    // endregion

    // region Admin routes
    ADMIN_ROUTE: {name: AdminView, value: 'Administration'},

    DASHBOARD: {name: AdminView + 'Dashboard', value: 'Dashboard'},

    UTILISATEURS: {name: AdminView + 'Utilisateurs', value: 'Utilisateurs'},
    UTILISATEURS_DETAIL: {name: AdminView + 'UtilisateursDetail', value: 'Detail',},

    ARTICLES: {name: AdminView + 'Articles', value: 'Articles',},
    ARTICLE_ADD: {name: AdminView + 'AddArticle', value: 'Ajouter un articles',},
    ARTICLES_UPDATE: {name: AdminView + 'ArticleUpdate', value: 'Update',},
    ARTICLES_DETAIL: {name: AdminView + 'ArticleDetail', value: 'Detail de l\'article',},

    DEMANDE_DE_DEVIS: {name: AdminView + 'DemandeDeDevis', value: 'Demande de devis'},

    DEVIS: {name: AdminView + 'Devis', value: 'Devis', icon: 'far fa-folder'},

    MERCERIES: {name: AdminView + 'Mercerie', value: 'Merceries', icon: 'fas fa-dolly-flatbed'},

    BONS_DE_COMMANDE: {name: AdminView + 'BonDeCommande', value: 'Bons de commande'},

    FACTURE: {name: AdminView + 'Facture', value: 'Facture'},

    RENDEZ_VOUS: {name: AdminView + 'RendezVous', value: 'Rendez-vous'},

    PARAMETRES: {name: AdminView + 'Parametres', value: 'Parametres'},
    PARAMETRES_ENTREPRISE: {name: AdminView + 'Entreprise', value: 'Entreprise'},
    PARAMETRES_ENTREPRISE_ADD: {name: AdminView + 'EntrepriseAdd', value: 'Ajout des informations de l\'entreprise'},
    PARAMETRES_ENTREPRISE_UPDATE: {name: AdminView + 'EntrepriseUpdate', value: 'Modifier information de l\'entreprise'},
    PARAMETRES_GENRE: {name: AdminView + 'Genre', value: 'Genres'},
    PARAMETRES_GENRE_ADD: {name: AdminView + 'GenreAdd', value: 'Ajouter un genre'},
    PARAMETRES_MENSURATION: {name: AdminView + 'Mensuration', value: 'Mensurations'},
    PARAMETRES_MENSURATION_ADD: {name: AdminView + 'MensurationAdd', value: 'Ajouter mensuration'},
    PARAMETRES_SERVICE: {name: AdminView + 'Service', value: 'Services'},
    PARAMETRES_SERVICE_ADD: {name: AdminView + 'ServiceAdd', value: 'Ajouter un service'},
    // endregion
}

const Endpoints = {
    DOMAIN: DOMAIN,
    PROFIL: DOMAIN + '/profil',
    // region Global endpoints
    LOGIN_ENDPOINT: DOMAIN + '/login/',
    REGISTER_ENDPOINT: DOMAIN + '/register/',
    REFRESH_ENDPOINT: DOMAIN + '/token/refresh/',
    VILLE_ENDPOINT: DOMAIN + '/villes/',
    // endregion

    // region User endpoints
    USER_MENSURATION_ENDPOINT: PROFIL + /mensurations/,

    PAYS_ENDPOINT: DOMAIN + '/pays/',
    // endregion

    // region Admin endpoints
    USERS_ENDPOINT: DOMAIN + '/utilisateurs/',
    GENRES_ENDPOINT: DOMAIN + '/genres/',
    MERCERIE_ENDPOINT: DOMAIN + '/merceries/',

    MENSURATION_ENDPOINT: DOMAIN + /mensurations/,

    TYPES_SERVICES_ENDPOINT: DOMAIN + '/types_services/',
    CATALOGUES_ENDPOINT: DOMAIN + '/catalogues/',
    RAYON_ENDPOINT: DOMAIN + '/rayons/',
    SECTION_ENDPOINT: DOMAIN + '/sections/',
    TYPE_PRODUIT_ENDPOINT: DOMAIN + '/type_produits/',

    CATEGORIES_ENDPOINT: DOMAIN + '/categories/',

    ENTREPRISE_ENDPOINT: DOMAIN + '/entreprise/',

    DASHBOARD_ENDPOINT: DOMAIN + '/admin-dashboard/',
    CHECK_USER_EXISTS_ENDPOINT: DOMAIN + '/check/',
    // endregion

}

const FontAwesomeIcons = {
    HOME: 'fas fa-home',
    USER: 'fas fa-user-alt',
    USER_CIRCLE: 'fas fa-user-circle',
    USERS: 'fas fa-users',
    MESURE: 'fas fa-ruler-horizontal',
    INFO: 'fas fa-eye',
    MODIFIER: 'fas fa-edit',
    SUPPRIMER: 'fas fa-trash-alt',
    TACHOMETRE: 'fas fa-tachometer-alt',
    STORE: 'fas fa-store-alt',
    FOLDER_OPEN: 'far fa-folder-open',
    FOLDER: 'far fa-folder',
    PLATEAU: 'fas fa-dolly-flatbed',
    SHOPPING_CART: 'fas fa-shopping-cart',
    MONEY: 'fas fa-money-bill',
    CALENDAR: 'fas fa-calendar-check',
    PARAMETRES: 'fas fa-sliders-h',
    EMAIL: 'far fa-envelope',
    PHONE: 'fas fa-phone',
    GENRE: 'fas fa-venus-mars',
    LONG_LEFT_ARROW: 'fas fa-long-arrow-alt-left',
    HEART: 'fas fa-heart',
    GLOBE: 'fas fa-globe'
}

const BSClass = {
    CARD_BORDERLESS_SHADOW: 'border-0 shadow p-3 mb-5 bg-white rounded'
}

export const LemkaEnums = {
    Routes,
    Endpoints,
    FontAwesomeIcons,
    BSClass,
}