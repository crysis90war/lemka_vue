import * as R from 'ramda'
import VilleModel from "@/models/pays/ville.model";
import {minLength, alphaNum, required} from "vuelidate/lib/validators"

export default class AdresseModel {
    constructor(adresse = {}) {
        this.id = R.is(Number, adresse.id) ? adresse.id : null
        this.rue = R.is(String, adresse.rue) ? adresse.rue : ""
        this.numero = R.is(String, adresse.numero) ? adresse.numero : ""
        this.boite = R.is(String, adresse.boite) ? adresse.boite : ""
        this.ref_ville = R.is(Object, adresse.ref_ville) ? new VilleModel(adresse.ref_ville) : new VilleModel()
    }

    toCreatePayload() {
        return {
            rue: this.rue,
            numero: this.numero,
            boite: this.boite,
            ref_ville: this.ref_ville.id
        }
    }

    toUpdatePayload() {
        return {
            ...this.toCreatePayload(),
            // id: this.id
        }
    }

    static get validations() {
        return {
            rue: {
                required,
                minLength: minLength(3)
            },
            numero: {
                minLength: minLength(1),
                alphaNum
            },
            boite: {
                minLength: minLength(1),
                alphaNum
            }
        }
    }
}