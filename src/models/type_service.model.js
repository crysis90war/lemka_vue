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

    static get tableFields() {
        return [
            {key: 'id', label: '#'},
            {key: 'type_service', label: 'Service', sortable: true},
            {key: 'duree_minute', label: 'Durée en minutes', sortable: true},
            {key: 'actions', label: 'Actions'}
        ]
    }

    static async getTypeService(typeServiceId) {
        let typeService = {}
        await ApiService.TypeService.getTypeService(typeServiceId).then(response => {
            typeService = response.data
        })
        return typeService
    }
}