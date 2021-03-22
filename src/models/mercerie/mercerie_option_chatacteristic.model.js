import * as R from 'ramda'
import CharacteristicModel from "@/models/characteristic.model";
import {decimal, required} from "vuelidate/lib/validators";

export default class MercerieOptionChatacteristicModel {
    constructor(mercerie_option_chatacteristic = {}) {
        this.id = R.is(Number, mercerie_option_chatacteristic.id) ? mercerie_option_chatacteristic.id : null
        this.valeur = R.is(Number, mercerie_option_chatacteristic.valeur) ? mercerie_option_chatacteristic.valeur : null
        this.caracteristique = R.is(String, mercerie_option_chatacteristic.caracteristique)
            ? mercerie_option_chatacteristic.caracteristique
            : ""
        this.ref_caracteristique = R.is(Object, mercerie_option_chatacteristic.ref_caracteristique)
            ? new CharacteristicModel(mercerie_option_chatacteristic.ref_caracteristique)
            : new CharacteristicModel()
    }

    toCreatePayload() {
        return {
            ref_caracteristique: this.ref_caracteristique.id,
            valeur: this.valeur
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
            valeur: {
                required,
                decimal
            }
        }
    }

    static get tableFields() {
        return [
            {key: 'caracteristique', label: 'Nom', sortable: true},
            {key: 'valeur', label: 'Valeur', sortable: true},
            {key: 'actions', label: 'Actions'}
        ]
    }
}