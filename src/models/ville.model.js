import * as R from 'ramda'
import {required, minLength, numeric} from "vuelidate/lib/validators"
import PaysModel from '@/models/pays.model'
import ApiService from "@/services/";

export default class VilleModel {
    constructor(ville = {}) {
        this.id = R.is(Number, ville.id) ? ville.id : null
        this.ref_pays = R.is(Object, ville.ref_pays) ? new PaysModel(ville.ref_pays) : new PaysModel()
        this.ville = R.is(String, ville.ville) ? ville.ville : ""
        this.code_postale = R.is(String, ville.code_postale) ? ville.code_postale : ""
    }

    toCreatePayload() {
        return {
            ville: this.ville,
            code_postal: this.code_postale,
            ref_pays: this.ref_pays.id
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
            ville: {
                required,
                minLength: minLength(2)
            },
            code_postal: {
                required,
                minLength: minLength(4),
                numeric
            }
        }
    }

    static async fetchVilles(searchParam = '') {
        let villes = []
        await ApiService.VilleService.getVillesList(searchParam).then(response => {
            villes = response.data
        })
        return villes
    }

    static async fetchVille(villeId) {
        let ville = {}
        await ApiService.VilleService.getVillesDetail(villeId).then(response => {
            ville = response.data
        })
        return ville
    }
}