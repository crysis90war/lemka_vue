const AdminView = 'ViewAdmin';
const UserView = 'ViewUser';
const GlobalView = 'ViewGlobal';

export const Routes = {
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
    USER_MENSURATIONS: {name: UserView + 'Mensurations', value: 'Mensurations'},
    USER_MENSURATION_ADD_OR_UPDATE: {name: UserView + 'UserMensurationAddOrUpdate', value: 'Ajout-Modifier du mensuration'},
    // MENSURATION_ADD: {name: UserView + 'MensurationAdd', value: 'Ajouter Mensuration'},
    // MENSURATION_UPDATE: {name: UserView + 'MensurationUpdate', value: 'Modification'},
    USER_MENSURATION_DETAIL: {name: UserView + 'MensurationDetail', value: 'Détail'},
    // endregion

    // region Admin routes
    ADMIN_ROUTE: {name: AdminView, value: 'Administration'},

    DASHBOARD: {name: AdminView + 'Dashboard', value: 'Dashboard'},

    UTILISATEURS: {name: AdminView + 'Utilisateurs', value: 'Utilisateurs'},
    UTILISATEURS_DETAIL: {name: AdminView + 'UtilisateursDetail', value: 'Detail',},

    ARTICLES: {name: AdminView + 'Articles', value: 'Articles',},
    ARTICLES_ADD_OR_UPDATE: {name: AdminView + 'ArticleAddOrUPdate', value: "Ajouter-modifer l'article"},
    ARTICLE_ADD: {name: AdminView + 'AddArticle', value: 'Ajouter un articles',},
    ARTICLES_UPDATE: {name: AdminView + 'ArticleUpdate', value: 'Update',},
    ARTICLES_DETAIL: {name: AdminView + 'ArticleDetail', value: 'Detail de l\'article',},

    DEMANDE_DE_DEVIS: {name: AdminView + 'DemandeDeDevis', value: 'Demande de devis'},

    DEVIS: {name: AdminView + 'Devis', value: 'Devis', icon: 'far fa-folder'},

    MERCERIES: {name: AdminView + 'Merceries', value: 'Merceries', icon: 'fas fa-dolly-flatbed'},
    MERCERIES_ADD_OR_UPDATE: {name: AdminView + 'MercerieAddOrUpdate', value: 'Mercerie'},
    MERCERIE_OPTIONS: {name: AdminView + 'MercerieOptions', value: 'Options'},
    MO_ADD_OR_UPDATE: {name: AdminView + 'MOAddOrUpdate', value: 'Ajouter/Modifier'},
    MOC_ADD_OR_UPDATE: {name: 'VAMOCAddOrUpdate' , value: 'Ajouter/Modifier'},

    BONS_DE_COMMANDE: {name: AdminView + 'BonDeCommande', value: 'Bons de commande'},

    FACTURE: {name: AdminView + 'Facture', value: 'Facture'},

    RENDEZ_VOUS: {name: AdminView + 'RendezVous', value: 'Rendez-vous'},

    PARAMETRES: {name: AdminView + 'Parametres', value: 'Parametres'},
    PARAMETRES_ENTREPRISE: {name: AdminView + 'Entreprise', value: 'Entreprise'},
    PARAMETRES_ENTREPRISE_ADD: {name: AdminView + 'EntrepriseAdd', value: 'Ajout des informations de l\'entreprise'},
    PARAMETRES_ENTREPRISE_UPDATE: {
        name: AdminView + 'EntrepriseUpdate',
        value: 'Modifier information de l\'entreprise'
    },
    PARAMETRES_GENRE: {name: AdminView + 'Genre', value: 'Genres'},
    PARAMETRES_GENRE_DETAIL: {name: AdminView + 'GenreDetail', value: 'Détail'},
    PARAMETRES_GENRE_ADD_OR_UPDATE: {name: AdminView + 'GenreAddOrUpdate', value: 'Ajouter - Modifier genre'},
    PARAMETRES_MENSURATION: {name: AdminView + 'Mensuration', value: 'Mensurations'},
    PARAMETRES_MENSURATION_ADD_OR_UPDATE: {name: AdminView + 'MensurationAddOrUpdate', value: 'Ajouter mensuration'},
    PARAMETRES_SERVICE: {name: AdminView + 'Service', value: 'Services'},
    PARAMETRES_SERVICE_ADD_OR_UPDATE: {name: AdminView + 'ServiceAdd', value: 'Ajouter un service'},
    // endregion
}