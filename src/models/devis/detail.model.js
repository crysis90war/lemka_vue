import * as R from 'ramda'
import TVAModel from "@/models/tva.model";
import {maxLength, minLength, minValue, required} from "vuelidate/lib/validators";

export default class DetailModel {
    constructor(detail = {}) {
        this.id = R.is(Number, detail.id) ? detail.id : null
        this.designation = R.is(String, detail.designation) ? detail.designation : ""
        this.prix_u_ht = R.is(Number, detail.prix_u_ht) ? detail.prix_u_ht : 0
        this.quantite = R.is(Number, detail.quantite) ? detail.quantite : 0
        this.tva = R.is(Object, detail.tva) ? new TVAModel(detail.tva) : new TVAModel()
    }

    toCreatePayload() {
        return {
            designation: this.designation,
            prix_u_ht: this.prix_u_ht,
            quantite: this.quantite,
            ref_tva: this.tva.id,
            // ref_devis: this.ref_devis.id
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
            designation: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(255),
            },
            prix_u_ht: {
                required,
                minValue: minValue(0)
            },
            quantite: {
                required,
                minValue: minValue(1)
            }
        }
    }

    static get tableFields() {
        return [
            {key: "designation", label: "Description"},
            {key: "prix_u_ht", label: "Prix HT"},
            {key: "quantite", label: "Quantité"},
            {key: "tva", label: "% TVA"},
            {key: "total_ht", label: "Total HT"},
            {key: "total_tva", label: "Total TVA"},
            {key: "total_ttc", label: "Total TTC"},
            {key: "actions", label: "Actions"},
        ]
    }

    static get userTableField() {
        return [
            {key: "designation", label: "Description"},
            {key: "prix_u_ht", label: "Prix HT"},
            {key: "quantite", label: "Quantité"},
            {key: "tva", label: "% TVA"},
            {key: "total_ht", label: "Total HT"},
            {key: "total_tva", label: "Total TVA"},
            {key: "total_ttc", label: "Total TTC"},
        ]
    }

    calculerTVA(item) {
        let totalTVA = 0;
        if (item.tva !== undefined) {
            let tva = item.tva.taux
            totalTVA = this.calculeTotalHT(item) * tva
        }
        return Number.parseFloat(totalTVA).toFixed(2)
    }

    calculeTotalHT(item) {
        let total_ht = 0;
        total_ht = item.prix_u_ht * item.quantite
        return Number.parseFloat(total_ht).toFixed(2)
    }

    calculerTotalTTC(item) {
        let total_tvac = 0;
        let tva = Number.parseFloat(this.calculerTVA(item))
        let tota_ht = Number.parseFloat(this.calculeTotalHT(item))
        total_tvac = tva + tota_ht
        return Number.parseFloat(total_tvac).toFixed(2)
    }

    totalHT(details) {
        let total = 0
        details.forEach(item => {
            total += Number.parseFloat(this.calculeTotalHT(item))
        })
        return Number.parseFloat(total).toFixed(2)
    }

    totalTVA(details) {
        let total = 0
        details.forEach(item => {
            total += Number.parseFloat(this.calculerTVA(item))
        })
        return Number.parseFloat(total).toFixed(2)
    }

    totalTTC(details) {
        let total_tvac = 0;
        total_tvac = Number.parseFloat(this.totalHT(details)) + Number.parseFloat(this.totalTVA(details))
        return total_tvac.toFixed(2)
    }
}