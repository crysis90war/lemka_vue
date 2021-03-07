import * as R from 'ramda'
import CategorieModel from "@/models/categorie.model";
import ApiService from "@/services";

export default class MercerieModel {
    constructor(mercerie = {}) {
        this.id = R.is(Number, mercerie.id) ? mercerie.id : null
        this.nom = R.is(String, mercerie.nom) ? mercerie.nom : ""
        this.est_publie = R.is(Boolean, mercerie.est_publie) ? mercerie.est_publie : false
        this.categorie = R.is(String, mercerie.categorie) ? mercerie.categorie : ""
        this.ref_categorie = R.is(Object, mercerie.ref_categorie) ? new CategorieModel(mercerie.ref_categorie) : null
    }

    toCreatePaypload() {
        return {
            nom: this.nom,
            est_publie: this.est_publie,
            ref_categorie: this.ref_categorie.id
        }
    }

    toUpdatePayload() {
        return {
            ...this.toCreatePaypload(),
            id: this.id
        }
    }

    static get validations(){
        return {
            nom: {

            },
            ref_categorie: {

            }
        }
    }

    static async fetchMerceries() {
        let merceries = []
        await ApiService.MercerieService.getMerceries().then(res => {
            merceries = res.data
        })
        return merceries
    }

    static async fetchMercerie(mercerie_id) {
        let mercerie = null
        await ApiService.MercerieService.getMercerie(mercerie_id).then(res => {
            mercerie = res.data
        })
        return mercerie
    }
}