import * as R from 'ramda'
import VilleModel from "@/models/adresse/ville.model";
import {minLength, required, alphaNum, maxLength, email, numeric, url} from "vuelidate/lib/validators";

export default class EntrepriseModel {
    constructor(json = {}) {
        this.id = R.is(Number, json.id) ? json.id : null
        this.nom_societe = R.is(String, json.nom_societe) ? json.nom_societe : ""
        this.numero_tva = R.is(String, json.numero_tva) ? json.numero_tva : ""
        this.mail_contact = R.is(String, json.mail_contact) ? json.mail_contact : ""
        this.numero_tel = R.is(String, json.numero_tel) ? json.numero_tel : ""
        this.a_propos_resume = R.is(String, json.a_propos_resume) ? json.a_propos_resume : ""
        this.a_propos_complet = R.is(String, json.a_propos_complet) ? json.a_propos_complet : ""
        this.rue = R.is(String, json.rue) ? json.rue : ""
        this.numero = R.is(String, json.numero) ? json.numero : ""
        this.site_web = R.is(String, json.site_web) ? json.site_web : ""
        this.facebook_link = R.is(String, json.facebook_link) ? json.facebook_link : ""
        this.instagram_link = R.is(String, json.instagram_link) ? json.instagram_link : ""
        this.twitter_link = R.is(String, json.twitter_link) ? json.twitter_link : ""
        this.linkedin_link = R.is(String, json.linkedin_link) ? json.linkedin_link : ""
        this.ville = R.is(Object, json.ville) ? new VilleModel(json.ville) : new VilleModel()
    }

    toCreatePayload() {
        return {
            nom_societe: this.nom_societe,
            numero_tva: this.numero_tva,
            mail_contact: this.mail_contact,
            numero_tel: this.numero_tel,
            a_propos_resume: this.a_propos_resume,
            a_propos_complet: this.a_propos_complet,
            site_web: this.site_web,
            rue: this.rue,
            numero: this.numero,
            facebook_link: this.facebook_link,
            instagram_link: this.instagram_link,
            twitter_link: this.twitter_link,
            linkedin_link: this.linkedin_link,
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
                minLength: minLength(9),
                maxLength: maxLength(12),
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
            a_propos_resume: {
                maxLength: maxLength(255)
            },
            a_propos_complet: {
                maxLength: maxLength(2048)
            },
            site_web: {
                required,
                url
            },
            facebook_link: {
                url
            },
            instagram_link: {
                url
            },
            twitter_link: {
                url
            },
            linkedin_link: {
                url
            },
            rue: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(255)
            },
            numero: {
                required,
                minLength: minLength(1),
                alphaNum
            }
        }
    }
}