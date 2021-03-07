import * as R from 'ramda'
import {maxLength, minLength, alpha, required, numeric, between} from "vuelidate/lib/validators";
import ApiService from "@/services";

export default class TypeServiceModel {
    constructor(typeService = {}) {
        this.id = R.is(Number, typeService.id) ? typeService.id : null
        this.type_service = R.is(String, typeService.type_service) ? typeService.type_service : ""
        this.duree_minute = R.is(Number, typeService.duree_minute) ? typeService.duree_minute : null
    }

    toCreatePayload() {
        return {
            type_service: this.type_service,
            duree_minute: this.duree_minute
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
            type_service: {
                alpha,
                minLength: minLength(3),
                maxLength: maxLength(50),
                required
            },
            duree_minute: {
                numeric,
                between: between(1, 180),
                required
            }
        }
    }

    static async fetchTypeServices() {
        let typeService = []
        await ApiService.TypeServiceService.getTypeServiceList().then(response => {
            typeService = response.data
        })
        return typeService
    }

    static async getTypeService(typeServiceId) {
        let typeService = {}
        await ApiService.TypeServiceService.getTypeServiceDetail(typeServiceId).then(response => {
            typeService = response.data
        })
        return typeService
    }

    static async createTypeService(payload) {
        let typeService = null
        await ApiService.TypeServiceService.postTypeService(payload).then(res => {
            typeService = res.data
        })
        return typeService
    }

    static async updateTypeService(payload) {
        let typeService = null
        await ApiService.TypeServiceService.updateTypeService(payload.id, payload).then(res => {
            typeService = res.data
        })
        return typeService
    }

    static async deleteTypeService(typeServiceId) {
        await ApiService.TypeServiceService.deleteTypeService(typeServiceId)
    }
}