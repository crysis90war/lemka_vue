import * as R from 'ramda'
import CategorieModel from "@/models/categorie.model";
import {maxLength, minLength, required} from "vuelidate/lib/validators";

export default class MercerieModel {
    constructor(mercerie = {}) {
        this.id = R.is(Number, mercerie.id) ? mercerie.id : null
        this.nom = R.is(String, mercerie.nom) ? mercerie.nom : ""
        this.est_publie = R.is(Boolean, mercerie.est_publie) ? mercerie.est_publie : false
        this.categorie = R.is(String, mercerie.categorie) ? mercerie.categorie : ""
        this.options_count = R.is(Number, mercerie.options_count) ? mercerie.options_count : 0
        this.ref_categorie = R.is(Object, mercerie.ref_categorie) ? new CategorieModel(mercerie.ref_categorie) : new CategorieModel()
    }

    toCreatePayload() {
        return {
            nom: this.nom,
            est_publie: this.est_publie,
            ref_categorie: this.ref_categorie.id
        }
    }

    toUpdatePayload() {
        return {
            ...this.toCreatePayload(),
            id: this.id
        }
    }

    static get validations(){
        return {
            nom: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(255)
            },
            ref_categorie: {
                required
            }
        }
    }

    static get tableFields() {
        return [
            {key: 'categorie', label: 'Catégorie', sortable: true},
            {key: 'nom', label: 'Nom', sortable: true},
            {key: 'options_count', label: 'Options', sortable: true},
            {key: 'est_publie', label: 'Publication', sortable: true},
            {key: 'actions', label: 'Actions'},
        ]
    }
}