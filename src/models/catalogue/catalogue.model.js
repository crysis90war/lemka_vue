import * as R from 'ramda'
import RayonModel from "@/models/catalogue/rayon.model";
import SectionModel from "@/models/catalogue/section.model";
import TypeProduitModel from "@/models/catalogue/type_produit.model";

export default class CatalogueModel {
    constructor(json = {}) {
        this.id = R.is(Number, json.id) ? json.id : null
        this.rayon = R.is(Object, json.rayon) ? new RayonModel(json.rayon) : new RayonModel()
        this.section = R.is(Object, json.section) ? new SectionModel(json.section) : new SectionModel()
        this.type_produit = R.is(Object, json.type_produit) ? new TypeProduitModel(json.type_produit) : new TypeProduitModel()
    }

    fullCatalogue() {
        let rayon = this.rayon.rayon;
        let section = this.section.section;
        let type_produit = this.type_produit.type_produit
        return `${rayon} / ${section} / ${type_produit}`
    }

    toCreatePayload() {
        return {
            ref_rayon: this.rayon.id,
            ref_section: this.section.id,
            ref_type_produit: this.type_produit.id
        }
    }

    toUpdatePayload() {
        return {
            ...this.toCreatePayload(),
            id: this.id
        }
    }

    static get tableFields() {
        return [
            {key: 'id', label: '#'},
            {key: 'rayon', label: 'Rayon', sortable: true},
            {key: 'section', label: 'Section', sortable: true},
            {key: 'type_produit', label: 'Type Produit', sortable: true},
            {key: 'actions', label: 'Actions'}
        ]
    }
}