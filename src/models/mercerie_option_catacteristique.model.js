import * as R from 'ramda'
import CaracteristiqueModel from "@/models/caracteristique.model";

export default class MercerieOptionCatacteristiqueModel {
    constructor(mercerie_option_catacteristique = {}) {
        this.id = R.is(Number, mercerie_option_catacteristique.id) ? mercerie_option_catacteristique.id : null
        this.caracteristique = R.is(String, mercerie_option_catacteristique.caracteristique) ? mercerie_option_catacteristique.caracteristique : ""
        this.ref_caracteristique = R.is(Object, mercerie_option_catacteristique.ref_caracteristique) ? new CaracteristiqueModel(mercerie_option_catacteristique.ref_caracteristique) : new CaracteristiqueModel()
        this.valeur = R.is(Number, mercerie_option_catacteristique.valeur) ? mercerie_option_catacteristique.valeur : null
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

        }
    }

    static get tableFields() {
        return [
            {key: 'id', label: '#'},
            {key: 'caracteristique', label: 'CARAC', sortable: true},
            {key: 'valeur', label: 'Valeur', sortable: true},
            {key: 'actions', label: 'Actions'}
        ]
    }
}