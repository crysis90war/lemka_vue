import * as R from 'ramda'
import {required, minLength, numeric} from "vuelidate/lib/validators"
import PaysModel from '@/models/adresse/pays.model'

export default class VilleModel {
    constructor(ville = {}) {
        this.id = R.is(Number, ville.id) ? ville.id : null
        this.ville = R.is(String, ville.ville) ? ville.ville : ""
        this.code_postale = R.is(String, ville.code_postale) ? ville.code_postale : ""
        this.pays = R.is(Object, ville.pays) ? new PaysModel(ville.pays) : new PaysModel()
    }

    toCreatePayload() {
        return {
            ville: this.ville,
            code_postal: this.code_postale,
            ref_pays: this.pays.id
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
            ville: {
                required,
                minLength: minLength(2)
            },
            code_postal: {
                required,
                minLength: minLength(4),
                numeric
            }
        }
    }
}