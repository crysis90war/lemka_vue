
export default class User {

    /**
     * Constructeur par défaut
     * @param {String} email L'email de l'utilisateur
     * @param {String} password Le mot de passe de l'utilisateur
     * @param {String} username Le nom de l'utilisateur
     * @param {String} password2 le mot de passe de confirmation de l'utilisateur
     * @param {Boolean} is_staff Le boolean pour identifier si l'utilisateur est un admin ou pas.
     * @param {Object} tokens Les tokens refresh et access.
     */
    constructor(email = '', password = '', username = '', password2 = '', is_staff = false, tokens = {}) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.password2 = password2;
        this.is_staff = is_staff;
        this.tokens = tokens;
    }

    /**
     * Constructeur pour l'utilisateur identifié
     * @param {String} email L'email de l'utilisateur
     * @param {Boolean} is_staff Le boolean pour identifier l'utilisateur admin et membre par vrai ou faux
     * @param {Object} tokens Les tokens refresh et access de l'utilisateur
     * @param {String} username L'identifiant de l'utilisateur
     * @returns {User} Retourne l'objet utilisateur
     * @constructor
     */
    static UtilisateurConnecte(email, is_staff, tokens, username) {
        return new User(email, null, username, null, is_staff, tokens)
    }

    /**
     * Constructeur pour l'utilisateur qui s'enregistre
     * @param {String} email
     * @param {String} username
     * @param {String} password
     * @param {String} password2
     * @returns {User} Renvoie l'objet Utilisateur
     * @constructor
     */
    static UtilisateurRegister(email, username, password, password2) {
        return new User(email, password, username, password2, null, null)
    }
}