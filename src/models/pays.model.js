import * as R from 'ramda'
import {required, minLength, maxLength, alpha} from "vuelidate/lib/validators"
import ApiService from "@/services/";

export default class PaysModel {
    constructor(pays = {}) {
        this.id = R.is(Number, pays.id) ? pays.id : null
        this.pays = R.is(String, pays.pays) ? pays.pays : ""
        this.code = R.is(String, pays.code) ? pays.code : ""
    }

    toCreatePayload() {
        return {
            pays: this.pays,
            code: this.code
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
            pays: {
                required
            },
            code: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(2),
                alpha
            }
        }
    }

    static async fetchPaysList() {
        let pays = []
        await ApiService.PaysService.getPaysList().then(response => {
            pays = response.data
        })
        return pays
    }

    static async fetchPays(paysId) {
        let pays = {}
        await ApiService.PaysService.getPaysDetail(paysId).then(response => {
            pays = response.data
        })
        return pays
    }
}