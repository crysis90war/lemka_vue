export default class UserAddress {
    constructor(id = 0, rue = '', numero = '', boite = '', ref_ville = 0) {
        this.id = id;
        this.rue = rue;
        this.numero = numero;
        this.boite = boite;
        this.ref_ville = ref_ville
    }
}