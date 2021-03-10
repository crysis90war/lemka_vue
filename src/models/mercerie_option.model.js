import * as R from 'ramda'
import CouleurModel from "@/models/couleur.model";
import {maxLength, minLength, required, decimal, minValue} from "vuelidate/lib/validators";

export default class MercerieOptionModel {
    constructor(mercerie_option = {}) {
        this.id = R.is(Number, mercerie_option.id) ? mercerie_option.id : null
        this.name = R.is(String, mercerie_option.name) ? mercerie_option.name : ""
        this.est_publie = R.is(Boolean, mercerie_option.est_publie) ? mercerie_option.est_publie : false
        this.reference = R.is(String, mercerie_option.reference) ? mercerie_option.reference : ""
        this.description = R.is(String, mercerie_option.description) ? mercerie_option.description : ""
        this.prix_u_ht = R.is(Number, mercerie_option.prix_u_ht) ? mercerie_option.prix_u_ht : null
        this.stock = R.is(Number, mercerie_option.stock) ? mercerie_option.stock : null
        this.ref_couleur = R.is(Object, mercerie_option.ref_couleur) ? new CouleurModel(mercerie_option.ref_couleur) : new CouleurModel()
    }

    toCreatePayload() {
        return {
            reference: this.reference,
            est_publie: this.est_publie,
            description: this.description,
            prix_u_ht: this.prix_u_ht,
            stock: this.stock,
            ref_couleur: this.ref_couleur.id
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