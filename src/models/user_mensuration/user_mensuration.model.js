import * as R from "ramda";
import {required, minLength, maxLength } from "vuelidate/lib/validators"

export default class UserMensurationModel {
    constructor(json = {}) {
        this.id = R.is(Number, json.id) ? json.id : null
        this.titre = R.is(String, json.titre) ? json.titre : ""
        this.is_main = R.is(Boolean, json.is_main) ? json.is_main : false
        this.remarque = R.is(String, json.remarque) ? json.remarque : ""
        this.mesures = R.is(Array, json.mesures) ? json.mesures : []
    }

    toCreatePayload() {
        return {
            is_main: this.is_main,
            titre: this.titre,
            remarque: this.remarque
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
            titre: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(100)
            },
            remarque: {
                maxLength: maxLength(1024)
            }
        }
    }

    static get tableFields() {
        return [
            {key: 'is_main', label: '#', sortable: true},
            {key: 'titre', label: 'Titre', sortable: true},
            {key: 'actions', label: 'Actions'}
        ]
    }
}