import * as R from 'ramda'
import {maxLength, minLength, required, alpha} from "vuelidate/lib/validators";
import ApiService from "@/services";

export default class TypeProduitModel {
    constructor(typeProduit = {}) {
        this.id = R.is(Number, typeProduit.id) ? typeProduit.id : null
        this.type_produit = R.is(String, typeProduit.type_produit) ? typeProduit.type_produit : ""
        this.type_produit_slug = R.is(String, typeProduit.type_produit_slug) ? typeProduit.type_produit_slug : ""
    }

    toCreatePayload() {
        return {
            type_produit: this.type_produit_slug
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
            type_produit: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(50),
                alpha
            }
        }
    }

    static async getTypeProduitList() {
        let typeProduits = []
        await ApiService.TypeProduitService.getTypeProduitList().then(response => {
            typeProduits = response.data
        })
        return typeProduits
    }

    static async getTypeProduitDetail(typeProduitId) {
        let typeProduit = {}
        await ApiService.TypeProduitService.getTypeProduitDetail(typeProduitId).then(response => {
            typeProduit = response.data
        })
        return typeProduit
    }

    static async createTypeProduit(payload) {
        await ApiService.TypeProduitService.postTypeProduit(payload)
    }

    static async updateTypeProduit(typeProduitId, payload) {
        await ApiService.TypeProduitService.putTypeProduit(typeProduitId, payload)
    }

    static async deleteTypeProduit(typeProduitId) {
        await ApiService.TypeProduitService.deleteTypeProduit(typeProduitId)
    }
}