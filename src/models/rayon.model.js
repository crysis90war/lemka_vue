import * as R from 'ramda'
import {minLength, required, alpha, maxLength} from "vuelidate/lib/validators";
import ApiService from "@/services";

export default class RayonModel {
    constructor(rayon = {}) {
        this.id = R.is(Number, rayon.id) ? rayon.id : null
        this.rayon = R.is(String, rayon.rayon) ? rayon.rayon : ""
        this.rayon_slug = R.is(String, rayon.rayon_slug) ? rayon.rayon_slug : ""
    }

    toCreatePayload() {
        return {
            rayon: this.rayon
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
            rayon: {
                required,
                alpha,
                minLength: minLength(3),
                maxLength: maxLength(255)
            }
        }
    }

    static async getRayonList() {
        let rayons = []
        await ApiService.RayonService.getRayonList().then(response => {
            rayons = response.data
        })
        return rayons
    }

    static async getRayonDetail(rayonId) {
        let rayon = {}
        await ApiService.RayonService.getRayonDetail(rayonId).then(response => {
            rayon = response.data
        })
        return rayon
    }

    static async createRayon(payload) {
        await ApiService.RayonService.postRayon(payload)
    }

    static async updateRayon(rayonId, payload) {
        await ApiService.RayonService.updateRaon(rayonId, payload)
    }

    static async deleteRayon(rayonId) {
        await ApiService.RayonService.deleteRayon(rayonId)
    }
}