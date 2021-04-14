import * as R from 'ramda'
import VilleModel from "@/models/pays/ville.model";
import {minLength, alphaNum, required, maxLength} from "vuelidate/lib/validators"

export default class AdresseModel {
    constructor(adresse = {}) {
        this.id = R.is(Number, adresse.id) ? adresse.id : null
        this.rue = R.is(String, adresse.rue) ? adresse.rue : ""
        this.numero = R.is(String, adresse.numero) ? adresse.numero : ""
        this.boite = R.is(String, adresse.boite) ? adresse.boite : ""
        this.ville = R.is(Object, adresse.ville) ? new VilleModel(adresse.ville) : new VilleModel()
    }

    toCreatePayload() {
        return {
            rue: this.rue,
            numero: this.numero,
            boite: this.boite,
            ref_ville: this.ville.id
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
                minLength: minLength(3),
                maxLength: maxLength(50)
            },
            numero: {
                required,
                alphaNum,
                minLength: minLength(1),
                maxLength: maxLength(10)
            },
            boite: {
                alphaNum,
                minLength: minLength(1),
                maxLength: maxLength(10)
            }
        }
    }
}