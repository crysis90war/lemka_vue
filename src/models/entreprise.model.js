import * as R from 'ramda'
import VilleModel from "@/models/pays/ville.model";
import {minLength, required, alphaNum, maxLength, email, numeric, url} from "vuelidate/lib/validators";

export default class EntrepriseModel {
    constructor(entreprise = {}) {
        this.id = R.is(Number, entreprise.id) ? entreprise.id : null
        this.nom_societe = R.is(String, entreprise.nom_societe) ? entreprise.nom_societe : ""
        this.numero_tva = R.is(String, entreprise.numero_tva) ? entreprise.numero_tva : ""
        this.mail_contact = R.is(String, entreprise.mail_contact) ? entreprise.mail_contact : ""
        this.numero_tel = R.is(String, entreprise.numero_tel) ? entreprise.numero_tel : ""
        this.site_web = R.is(String, entreprise.site_web) ? entreprise.site_web : ""
        this.rue = R.is(String, entreprise.rue) ? entreprise.rue : ""
        this.numero = R.is(String, entreprise.numero) ? entreprise.numero : ""
        this.ville = R.is(Object, entreprise.ref_ville) ? new VilleModel(entreprise.ref_ville) : null
    }

    toCreatePayload() {
        return {
            nom_societe: this.nom_societe,
            numero_tva: this.numero_tva,
            mail_contact: this.mail_contact,
            numero_tel: this.numero_tel,
            site_web: this.site_web,
            rue: this.rue,
            numero: this.numero,
            ref_ville: this.ville.id
        }
    }

    toUpdatePayload() {
        return {
            ...this.toCreatePayload(),
            id: this.id
        }
    }

    static get validations() {
        return {
            nom_societe: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(255)
            },
            numero_tva: {
                required,
                alphaNum
            },
            mail_contact: {
                required,
                email,
                minLength: minLength(5),
                maxLength: maxLength(255)
            },
            numero_tel: {
                required,
                numeric,
                minLength: minLength(5),
                maxLength: maxLength(255)
            },
            site_web: {
                required,
                url
            },
            rue: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(255)
            },
            numero: {
                required,
                alphaNum
            }
        }
    }
}