import * as R from 'ramda'
import TVAModel from "@/models/tva.model";
import DevisModel from "@/models/devis.model";

export default class DetailModel {
    constructor(detail = {}) {
        this.id = R.is(Number, detail.id) ? detail.id : 0
        this.designation = R.is(String, detail.designation) ? detail.designation : ""
        this.prix_u_ht = R.is(Number, detail.prix_u_ht) ? detail.prix_u_ht : 0
        this.quantite = R.is(Number, detail.quantite) ? detail.quantite : 0
        this.ref_tva = R.is(Object, detail.ref_tva) ? new TVAModel(detail.ref_tva) : new TVAModel()
        this.ref_devis = R.is(Object, detail.ref_devis) ? new DevisModel(detail.ref_devis) : new DevisModel()
    }

    toCreatePayload() {
        return {
            designation: this.designation,
            prix_u_ht: this.prix_u_ht,
            quantite: this.quantite,
            ref_tva: this.ref_tva.id,
            ref_devis: this.ref_devis.id
        }
    }

    toUpdatePayload() {
        return {
            ...this.toCreatePayload(),
            id: this.id
        }
    }

    static get validations() {
        return {}
    }

    static get tableFields() {
        return [
            {key: "designation", label: "Description"},
            {key: "prix_u_ht", label: "Prix HT"},
            {key: "quantite", label: "Quantité"},
            {key: "ref_tva", label: "% TVA"},
            {key: "total_ht", label: "Total HT"},
            {key: "total_tva", label: "Total TVA"},
            {key: "total_ttc", label: "Total TTC"},
            {key: "actions", label: "Actions"},
        ]
    }

    calculerTVA(item) {
        let totalTVA
        let tva = item.ref_tva.taux

        totalTVA = this.calculeTotalHT(item) * tva
        return Number.parseFloat(totalTVA).toFixed(2)
    }

    calculeTotalHT(item) {
        let total_ht
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