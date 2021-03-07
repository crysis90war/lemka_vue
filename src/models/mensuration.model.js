import * as R from 'ramda'
import {maxLength, minLength, required} from "vuelidate/lib/validators";
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
                required,
                minLength: minLength(3),
                maxLength: maxLength(50)
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

    static async createMensuration(payload) {
        let mensuration = null
        await ApiService.MensurationService.postMensuration(payload).then(res => {
            mensuration = res.data
        })
        return mensuration
    }

    static async fetchMensuration(mensurationId) {
        let mensuration = {}
        await ApiService.MensurationService.getMensurationDetail(mensurationId).then(response => {
            mensuration = response.data
        })
        return mensuration
    }

    static async deleteMensuration(mensuration_id) {
        await ApiService.MensurationService.deleteMensuration(mensuration_id)
    }
}
