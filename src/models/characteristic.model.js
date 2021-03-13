import * as R from 'ramda'
import {maxLength, minLength, required} from "vuelidate/lib/validators";

export default class CharacteristicModel {
    constructor(characteristic = {}) {
        this.id = R.is(Number, characteristic.id) ? characteristic.id : null
        this.nom = R.is(String, characteristic.nom) ? characteristic.nom : ""
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
                minLength: minLength(2),
                maxLength: maxLength(255)
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