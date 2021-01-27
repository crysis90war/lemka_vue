import MensurationUserMensuration from "@/models/mensuration_user_mensuration.model";

/**
 * La classe pour récupérer la mensuration d'un utilisateur
 */
export default class UserMensuration {

    /**
     * Le constructeur spécifique pour la mensuration de l'utlisateur
     * @param {Number} id Identifiant unique
     * @param {String} titre Titre spécifique
     * @param {Boolean} is_main Booléan pour principale ou secondaire
     * @param {Array} mensurations List de mensurations regroupant différents mesures
     */
    constructor(id = 0, titre = '', is_main = false, mensurations = [new MensurationUserMensuration()]) {
        this.id = id;
        this.titre = titre;
        this.is_main = is_main;
        this.mensurations = mensurations
    }
}