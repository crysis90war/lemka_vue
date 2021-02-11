import * as R from "ramda";
import {required, minLength, maxLength } from "vuelidate/lib/validators"
import ApiService from "@/services";

export default class UserMensurationModel {
    constructor(mensuration = {}) {
        this.id = R.is(Number, mensuration.id) ? mensuration.id : null
        this.titre = R.is(String, mensuration.titre) ? mensuration.titre : ""
        this.is_main = !!R.is(Boolean, mensuration.is_main)
    }

    toCreatePayload() {
        return {
            titre: this.titre,
            is_main: this.is_main
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
            titre: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(100)
            }
        }
    }

    static async fetchUserMensurations() {
        let userMensurations = []
        await ApiService.UserMensurationsService.getUserMensurationsList().then(response => {
            userMensurations = response.data
        })
        return userMensurations
    }

    static async fetchUserMensuration(userMensurationId) {
        let userMensuration = {}
        await ApiService.UserMensurationsService.getUserMensurationsDetail(userMensurationId).then(response => {
            userMensuration = response.data
        })
        return userMensuration
    }

    static async createUserMensuration(payload) {
        await ApiService.UserMensurationsService.postUserMensuration(payload)
    }

    static async updateUserMensuration(usermensurationId, payload) {
        await ApiService.UserMensurationsService.putUserMensurations(usermensurationId, payload)
    }

    static async supprimerUserMensuration(userMensurationId) {
        await ApiService.UserMensurationsService.deleteUserMensurations(userMensurationId)
    }
}