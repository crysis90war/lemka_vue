import * as R from 'ramda'
import CouleurModel from "@/models/couleur.model";
import {maxLength, minLength, required, decimal, minValue} from "vuelidate/lib/validators";
import TVAModel from "@/models/tva.model";

export default class MercerieOptionModel {
    constructor(json = {}) {
        this.id = R.is(Number, json.id) ? json.id : null
        this.name = R.is(String, json.name) ? json.name : ""
        this.images_count = R.is(Number, json.images_count) ? json.images_count : 0
        this.est_publie = R.is(Boolean, json.est_publie) ? json.est_publie : false
        this.reference = R.is(String, json.reference) ? json.reference : ""
        this.description = R.is(String, json.description) ? json.description : ""
        this.prix_u_ht = R.is(Number, parseFloat(json.prix_u_ht)) ? parseFloat(json.prix_u_ht) : 0
        this.stock = R.is(Number, json.stock) ? json.stock : 0
        this.tva = R.is(Object, json.tva) ? new TVAModel(json.tva) : new TVAModel()
        this.couleur = R.is(Object, json.couleur) ? new CouleurModel(json.couleur) : new CouleurModel()
        this.caracteristiques = R.is(Array, json.caracteristiques) ? json.caracteristiques : []
    }

    toCreatePayload() {
        return {
            reference: this.reference,
            est_publie: this.est_publie,
            description: this.description,
            prix_u_ht: this.prix_u_ht,
            stock: this.stock,
            ref_tva: this.tva.id,
            ref_couleur: this.couleur.id
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
            reference: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(255)
            },
            description: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(512)
            },
            prix_u_ht: {
                required,
                decimal,
                minValue: minValue(0.00),
            },
            stock: {
                required,
                decimal,
                minValue: minValue(0.0),
            }
        }
    }

    static get tableFields() {
        return [
            {key: 'reference', label: 'Référence', sortable: true},
            {key: 'name', label: 'Nom', sortable: true},
            {key: 'prix_u_ht', label: 'Prix U HT', sortable: true},
            {key: 'images_count', label: 'Images', sortable: true},
            {key: 'stock', label: 'Stock', sortable: true},
            {
                key: 'est_publie', label: 'Publication',
                // // eslint-disable-next-line no-unused-vars
                // formatter: (value, key, item) => {
                //   return value ? 'Oui' : 'Non'
                // },
                sortable: true,
                // sortByFormatted: true,
                // filterByFormatted: true
            },
            {key: 'actions', label: 'Actions'}
        ]
    }
}