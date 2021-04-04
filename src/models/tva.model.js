import * as R from 'ramda'

export default class TVAModel {
    constructor(tva = {}) {
        this.id = R.is(Number, tva.id) ? tva.id : 0
        this.taux = R.is(Number, tva.taux) ? tva.taux : 0
    }
}