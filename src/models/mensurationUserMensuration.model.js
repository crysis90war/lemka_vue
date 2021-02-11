import * as R from 'ramda'
import ApiService from "@/services";
import {between, decimal} from "vuelidate/lib/validators";

export default class MensurationUserMensurationModel {
    constructor(mensurationUserMensuration = {}) {
        this.id = R.is(Number, mensurationUserMensuration.id) ? mensurationUserMensuration.id : null
        this.mesure = R.is(Number, mensurationUserMensuration.mesure) ? mensurationUserMensuration.mesure : null
        this.ref_mensuration = R.is(String, mensurationUserMensuration.ref_mensuration)
            ? mensurationUserMensuration.ref_mensuration
            : ""
    }

    toUpdatePayload() {
        return {
            mesure: this.mesure,
        }
    }

    static get validations() {
        return {
            mesure: {
                between: between(0, 250),
                decimal
            }
        }
    }

    static async fetchMensurationUserMensurationList(userMensurationId) {
        let mensurationUserMensurations = []
        await ApiService.MensurationUserMensurationService.getMensurationUserMensurationsList(userMensurationId).then(response => {
            mensurationUserMensurations = response.data
        })
        return mensurationUserMensurations
    }

    static async fetchMensurationUserMensurationDetail(userMensurationId, mensurationUserMensurationId) {
        let mensurationUserMensuration = {}
        await ApiService.MensurationUserMensurationService.getMensurationUserMensurationsDetail(userMensurationId, mensurationUserMensurationId).then(response => {
            mensurationUserMensuration = response.data
        })
        return mensurationUserMensuration
    }

    static async updateMensurationUserMensuration(userMensurationId, mensurationUserMensurationId, payload) {
        await ApiService.MensurationUserMensurationService.putMensurationUserMensurations(userMensurationId, mensurationUserMensurationId, payload)
    }
}