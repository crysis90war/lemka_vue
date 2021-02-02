const DOMAIN = 'https://lemka-api.herokuapp.com/api';
const PROFIL = DOMAIN + '/profil';
const AdminView = 'ViewAdmin';
const UserView = 'ViewUser';
const GlobalView = 'ViewGlobal';

const GlobalRoutes = {
    HOME_ROUTE: {name: GlobalView + 'Home', value: 'Accueil'},
    LOGIN_ROUTE: {name: GlobalView + 'Login', value: 'Login'},
    REGISTER_ROUTE: {name: GlobalView + 'Register', value: 'Register'},
    HORAIRE_ROUTE: {name: GlobalView + 'Horaire', value: 'Horaire'},
    CONTACT_ROUTE: {name: GlobalView + 'Contact', value: 'Contact'},
    ABOUT_ROUTE: {name: GlobalView + 'About', value: 'À propos'},
    PAGE_NOT_FOUND_ROUTE: {name: GlobalView + 'PageNotFound', value: 'PageNotFound'}
}

const UserRoutes = {
    PROFIL_ROUTE: {name: UserView + 'Profil', value: 'Profil'},
    INFORMATIONS: {name: UserView + 'Informations', value: 'Informations'},
    ADRESSE_ADD: {name: UserView + 'AdresseAdd', value: 'Ajouter une adresse'},
    MENSURATIONS: {name: UserView + 'Mensurations', value: 'Mensurations'},
}

const AdminRoutes = {
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
    PARAMETRES_ENTREPRISE_ADD: {name: AdminView + 'AddEntreprise', value: 'Ajout des informations de l\'entreprise'},
    PARAMETRES_GENRE: {name: AdminView + 'Genre', value: 'Genres'},
    PARAMETRES_GENRE_ADD: {name: AdminView + 'GenreAdd', value: 'Ajouter un genre'},
    PARAMETRES_MENSURATION: {name: AdminView + 'Mensuration', value: 'Mensurations'},
    PARAMETRES_MENSURATION_ADD: {name: AdminView + 'MensurationAdd', value: 'Ajouter mensuration'},
    PARAMETRES_SERVICE: {name: AdminView + 'Service', value: 'Services'},
    PARAMETRES_SERVICE_ADD: {name: AdminView + 'ServiceAdd', value: 'Ajouter un service'}
}

export const Endpoints = {

}

const GlobalEndpoints = {
    LOGIN_ENDPOINT: DOMAIN + '/login/',
    REGISTER_ENDPOINT: DOMAIN + '/register/',
    REFRESH_ENDPOINT: DOMAIN + '/token/refresh/',
}

const UserEndpoints = {
    PROFILE_ENDPOINT: PROFIL + '/',
    PROFIL_GENRE_ENDPOINT: PROFIL + '/genres/',

    USER_MENSURATION_ENDPOINT: PROFIL + /mensurations/,

    ADRESSE_GUD_ENPOINT: PROFIL + '/adresse/',
    ADRESSE_CREATE_ENDPOINT: PROFIL + '/adresses/',

    VILLE_ENDPOINT: PROFIL + '/villes/',
    PAYS_ENDPOINT: PROFIL + '/pays/'
}

const AdminEndpoints = {
    USERS_ENDPOINT: DOMAIN + '/utilisateurs/',
    GENRES_ENDPOINT: DOMAIN + '/genres/',
    ARTICLES_ENDPOINT: DOMAIN + '/articles/',
    MERCERIE_ENDPOINT: DOMAIN + '/merceries/',

    MENSURATION_ENDPOINT: DOMAIN + /mensurations/,

    TAGS_ENDPOINT: DOMAIN + '/tags/',
    TYPES_SERVICES_ENDPOINT: DOMAIN + '/types_services/',
    CATALOGUES_ENDPOINT: DOMAIN + '/catalogues/',
    RAYON_ENDPOINT: DOMAIN + '/rayons/',
    SECTION_ENDPOINT: DOMAIN + '/sections/',
    TYPE_PRODUIT_ENDPOINT: DOMAIN + '/type_produits/',

    CATEGORIES_ENDPOINT: DOMAIN + '/categories/',

    ENTREPRISE_ENDPOINT: DOMAIN + '/entreprise/',

    DASHBOARD_ENDPOINT: DOMAIN + '/admin-dashboard/',
    CHECK_USER_EXISTS_ENDPOINT: DOMAIN + '/check/',
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
    GENRE: 'fas fa-venus-mars'
}

const BootstrapClass = {
    CARD_BORDERLESS_SHADOW: 'border-0 shadow p-3 mb-5 bg-white rounded'
}

export const LemkaEnums = {
    GlobalEndpoints,
    UserEndpoints,
    AdminEndpoints,
    GlobalRoutes,
    UserRoutes,
    AdminRoutes,
    FontAwesomeIcons,
    BootstrapClass,
    Endpoints,
}