import * as R from 'ramda'

export default class DemandeDevisModel {
    constructor(demande_devis = {}) {
        this.id = R.is(Number, demande_devis.id) ? demande_devis.id : null
    }

    toCreatePayload() {
        return {

        }
    }

    toUpdatePayload() {
        return {
            ...this.toCreatePayload(),
            id: this.id
        }
    }

    static get validation() {
        return {

        }
    }

    static get tableFields() {
        return [

        ]
    }
}