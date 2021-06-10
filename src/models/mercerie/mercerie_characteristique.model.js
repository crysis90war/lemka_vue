import * as R from 'ramda'
import CaracteristiqueModel from "@/models/mercerie/caracteristique.model";
import {decimal, required} from "vuelidate/lib/validators";

export default class MercerieChatacteristiqueModel {
    constructor(json = {}) {
        this.id = R.is(Number, json.id) ? json.id : null
        this.valeur = R.is(Number, json.valeur) ? json.valeur : 0
        this.caracteristique = R.is(Object, json.caracteristique) ? new CaracteristiqueModel(json.caracteristique) : new CaracteristiqueModel()
    }

    toCreatePayload() {
        return {
            ref_caracteristique: this.caracteristique.id,
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