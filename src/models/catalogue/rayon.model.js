import * as R from 'ramda'
import {minLength, required, alpha, maxLength} from "vuelidate/lib/validators";

export default class RayonModel {
    constructor(json = {}) {
        this.id = R.is(Number, json.id) ? json.id : null
        this.rayon = R.is(String, json.rayon) ? json.rayon : ""
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