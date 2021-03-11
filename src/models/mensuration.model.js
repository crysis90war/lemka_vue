import * as R from 'ramda'
import {maxLength, minLength, required} from "vuelidate/lib/validators";

export default class MensurationModel {
    constructor(mensuration = {}) {
        this.id = R.is(Number, mensuration.id) ? mensuration.id : null
        this.nom = R.is(String, mensuration.nom) ? mensuration.nom : ""
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
                minLength: minLength(3),
                maxLength: maxLength(50)
            }
        }
    }

    static get tableFields() {
        return [
            {key: 'id', label: '#'},
            {key: 'nom', label: 'Nom', sortable: true},
            {key: 'actions', label: 'Actions'}
        ]
    }
}
