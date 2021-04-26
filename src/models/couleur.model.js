import * as R from 'ramda'
import {maxLength, minLength, required} from "vuelidate/lib/validators";

export default class CouleurModel {
    constructor(json = {}) {
        this.id = R.is(Number, json.id) ? json.id : null
        this.nom = R.is(String, json.nom) ? json.nom : ""
    }

    toCreatePayload() {
        return {
            nom: this.nom
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
            nom: {
                required,
                minLength: minLength(1),
                maxLength: maxLength(255)
            }
        }
    }

    static get tableFields() {
        return [

        ]
    }
}