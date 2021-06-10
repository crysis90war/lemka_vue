import * as R from 'ramda'
import {maxLength, minLength, alpha, required, numeric, between} from "vuelidate/lib/validators";

export default class ServiceModel {
    constructor(json = {}) {
        this.id = R.is(Number, json.id) ? json.id : null
        this.nom = R.is(String, json.nom) ? json.nom : ""
        this.duree_minute = R.is(Number, json.duree_minute) ? json.duree_minute : null
    }

    toCreatePayload() {
        return {
            nom: this.nom,
            duree_minute: this.duree_minute
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
                alpha,
                minLength: minLength(3),
                maxLength: maxLength(50),
                required
            },
            duree_minute: {
                numeric,
                between: between(1, 180),
                required
            }
        }
    }

    static get tableFields() {
        return [
            {key: 'nom', label: 'Service', sortable: true},
            {key: 'duree_minute', label: 'Durée en minutes', sortable: true},
            {key: 'actions', label: 'Actions'}
        ]
    }
}