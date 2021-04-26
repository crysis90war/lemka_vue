import * as R from 'ramda'
import CategorieModel from "@/models/categorie.model";
import {decimal, maxLength, minLength, minValue, required} from "vuelidate/lib/validators";
import TVAModel from "@/models/tva.model";
import CouleurModel from "@/models/couleur.model";

export default class MercerieModel {
    constructor(json = {}) {
        this.id = R.is(Number, json.id) ? json.id : null
        this.reference = R.is(String, json.reference) ? json.reference : ""
        this.est_publie = R.is(Boolean, json.est_publie) ? json.est_publie : false
        this.nom = R.is(String, json.nom) ? json.nom : ""
        this.description = R.is(String, json.description) ? json.description : ""
        this.prix_u_ht = R.is(Number, parseFloat(json.prix_u_ht)) ? parseFloat(json.prix_u_ht) : 0

        this.tva = R.is(Object, json.tva) ? new TVAModel(json.tva) : new TVAModel()
        this.couleur = R.is(Object, json.couleur) ? new CouleurModel(json.couleur) : new CouleurModel()
        this.categorie = R.is(Object, json.categorie) ? new CategorieModel(json.categorie) : new CategorieModel()

        this.caracteristiques = R.is(Array, json.caracteristiques) ? json.caracteristiques : []
        this.images = R.is(Array, json.images) ? json.images : []
    }

    toCreatePayload() {
        return {
            est_publie: this.est_publie,
            nom: this.nom,
            description: this.description,
            prix_u_ht: this.prix_u_ht,
            ref_tva: this.tva.id,
            ref_couleur: this.couleur.id,
            ref_categorie: this.categorie.id
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
                maxLength: maxLength((255-1)/2)
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
            }
        }
    }

    static get tableFields() {
        return [
            {key: 'categorie', label: 'Catégorie', sortable: true},
            {key: 'reference', label: 'Reference', sortable: true},
            {key: 'nom', label: 'Nom', sortable: true},
            {key: 'prix_u_ht', label: 'Prix HT', sortable: true},
            {key: 'images_count', label: 'Images', sortable: true},
            {key: 'est_publie', label: 'Publication', sortable: true},
            {key: 'actions', label: 'Actions'},
        ]
    }

    static get caracteristiquesTableFields() {
        return [
            {key: 'caracteristique', label: 'Caracteristique', sortable: true},
            {key: 'valeur', label: 'Valeur', sortable: true},
            {key: 'actions', label: 'Actions'}
        ]
    }

    static get imagesTableFields() {
        return [
            {key: 'image', label: 'Image'},
            {key: 'is_main', label: 'Priorité', sortable: true},
            {key: 'actions', label: 'Actions'}
        ]
    }
}