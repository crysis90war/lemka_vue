export default class Mensuration {
    // constructor(nom) {
    //     this.nom = nom
    // }
    #_id;
    getMensurationId () {
        return this.#_id
    }
    setMensurationId (id) {
        this.#_id = id
    }

    #_nom;
    getMensurationNom () {
        return this.#_nom
    }
    setMensurationNom (nom) {
        this.#_nom = nom
    }

    constructor(id, nom) {
        this.setMensurationId(id)
        this.setMensurationNom(nom)
    }
}