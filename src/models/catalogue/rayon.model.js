import * as R from 'ramda'
import {minLength, required, alpha, maxLength} from "vuelidate/lib/validators";

export default class RayonModel {
    constructor(rayon = {}) {
        this.id = R.is(Number, rayon.id) ? rayon.id : null
        this.rayon = R.is(String, rayon.rayon) ? rayon.rayon : ""
    }

    toCreatePayload() {
        return {
            rayon: this.rayon
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
            rayon: {
                required,
                alpha,
                minLength: minLength(3),
                maxLength: maxLength(255)
            }
        }
    }

    static get tableFields() {
        return []
    }
}