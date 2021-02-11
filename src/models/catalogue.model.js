import * as R from 'ramda'
import RayonModel from "@/models/rayon.model";
import SectionModel from "@/models/section.model";
import TypeProduitModel from "@/models/typeProduit.model";
import ApiService from "@/services";

export default class CatalogueModel {
    constructor(catalogue = {}) {
        this.id = R.is(Number, catalogue.id) ? catalogue.id : null
        this.ref_rayon = R.is(Object, catalogue.ref_rayon) ? new RayonModel(catalogue.ref_rayon) : new RayonModel()
        this.ref_section = R.is(Object, catalogue.ref_section) ? new SectionModel(catalogue.ref_section) : new SectionModel()
        this.ref_type_produit = R.is(Object, catalogue.ref_type_produit) ? new TypeProduitModel(catalogue.ref_type_produit) : new TypeProduitModel()
    }

    toCreatePayload() {
        return {
            ref_rayon: this.ref_rayon.id,
            ref_section: this.ref_section.id,
            ref_type_produit: this.ref_type_produit.id
        }
    }

    toUpdatePayload() {
        return {
            ...this.toCreatePayload(),
            id: this.id
        }
    }

    static async getCatalogueList() {
        let catalogues = []
        await ApiService.CatalogueService.getCatalogueList().then(response => {
            catalogues = response.data
        })
        return catalogues
    }

    static async getCatalogueDetail(catalogueId) {
        let catalogue = {}
        await ApiService.CatalogueService.getCatalogueDetail(catalogueId).then(response => {
            catalogue = response.data
        })
        return catalogue
    }

    static async createCatalogue(payload) {
        await ApiService.CatalogueService.postCatalogue(payload)
    }

    static async updateDatalogue(catalogueId, payload) {
        await ApiService.CatalogueService.putCatalogue(catalogueId, payload)
    }

    static async deleteCatalogue(catalogueId) {
        await ApiService.CatalogueService.deleteCatalogue(catalogueId)
    }
}