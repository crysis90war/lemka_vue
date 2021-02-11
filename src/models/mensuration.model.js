import * as R from 'ramda'
import ApiService from "@/services";

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

            }
        }
    }

    static async fetchMensurations() {
        let mensurations = []
        await ApiService.MensurationService.getMensurationList().then(response => {
            response.data.forEach(item => {
                Object.assign(new MensurationModel(), item)
                mensurations.push(item)
            })
        })
        return mensurations
    }

    static async fetchMensuration(mensurationId) {
        let mensuration = {}
        await ApiService.MensurationService.getMensurationDetail(mensurationId).then(response => {
            mensuration = response.data
        })
        return mensuration
    }
}
