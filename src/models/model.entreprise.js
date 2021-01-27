export default class Entreprise {
    constructor(nom_societe = '',
                rue = '',
                numero = '',
                numero_tva = '',
                mail_contact = '',
                numero_tel = '',
                site_web = '',
                ref_ville = 0) {
        this.nom_societe = nom_societe;
        this.rue = rue;
        this.numero_tva = numero_tva;
        this.numero = numero;
        this.mail_contact = mail_contact;
        this.numero_tel = numero_tel;
        this.site_wet = site_web;
        this.ref_ville = ref_ville
    }
}