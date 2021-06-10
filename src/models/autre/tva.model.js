import * as R from 'ramda'

export default class TVAModel {
    constructor(json = {}) {
        this.id = R.is(Number, json.id) ? json.id : null
        this.taux = R.is(Number, json.taux) ? json.taux : null
    }
}