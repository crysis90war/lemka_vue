import * as R from 'ramda'
import ApiService from "@/services";

export default class CategorieModel {
    constructor(categorie = {}) {
        this.id = R.is(Number, categorie.id) ? categorie.id : null
        this.nom = R.is(String, categorie.nom) ? categorie.nom : ""
    }

    toCreatePayload() {
        return {
            nom: this.nom
        }
    }

    toUploadPayload() {
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

    static async fetchCategories() {
        let categories = []
        await ApiService.CategorieService.getCategories().then(res => {
            categories = res.data
        })
        return categories
    }

    static async createCategorie(payload) {
        let categorie = null
        await ApiService.CategorieService.postCategorie(payload).then(res => {
            categorie = res.data
        })
        return categorie
    }

    static async updateCategorie(payload) {
        let categorie = null
        await ApiService.CategorieService.putCategorie(payload).then(res => {
            categorie = res.data
        })
        return categorie
    }

    static async deleteCategorie(categorie_id) {
        await ApiService.CategorieService.deleteCategorie(categorie_id)
    }
}