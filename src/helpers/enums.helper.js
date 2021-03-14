const DOMAIN = 'https://lemka-api.herokuapp.com/api';
// const DOMAIN = 'http://127.0.0.1:8000/api';
const PROFIL = DOMAIN + '/profil';

const Endpoints = {
    DOMAIN: DOMAIN,
    PROFIL: DOMAIN + '/profil',
    // region Global endpoints
    LOGIN_ENDPOINT: DOMAIN + '/login/',
    REGISTER_ENDPOINT: DOMAIN + '/register/',
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

export const LemkaEnums = {
    Endpoints,
}