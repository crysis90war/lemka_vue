import * as R from 'ramda'
import {maxLength, minLength, required} from "vuelidate/lib/validators";

export default class CouleurModel {
    constructor(couleur = {}) {
        this.id = R.is(Number, couleur.id) ? couleur.id : null
        this.name = R.is(String, couleur.name) ? couleur.name : ""
    }

    toCreatePayload() {
        return {
            name: this.name
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
            name: {
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