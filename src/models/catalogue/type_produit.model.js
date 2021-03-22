import * as R from 'ramda'
import {maxLength, minLength, required, alpha} from "vuelidate/lib/validators";

export default class TypeProduitModel {
    constructor(typeProduit = {}) {
        this.id = R.is(Number, typeProduit.id) ? typeProduit.id : null
        this.type_produit = R.is(String, typeProduit.type_produit) ? typeProduit.type_produit : ""
    }

    toCreatePayload() {
        return {
            type_produit: this.type_produit
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
}