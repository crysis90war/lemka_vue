import * as R from 'ramda'
import {between, decimal} from "vuelidate/lib/validators";

export default class MesureModel {
    constructor(mesure = {}) {
        this.id = R.is(Number, mesure.id) ? mesure.id : null
        this.mesure = R.is(Number, mesure.mesure) ? mesure.mesure : null
        this.mensuration = R.is(String, mesure.mensuration)
            ? mesure.mensuration
            : ""
    }

    toUpdatePayload() {
        return {
            mesure: this.mesure,
            id: this.id
        }
    }

    static get validations() {
        return {
            mesure: {
                between: between(0, 250),
                decimal
            }
        }
    }
}