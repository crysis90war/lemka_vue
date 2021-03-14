import * as R from 'ramda'
import RayonModel from "@/models/rayon.model";
import SectionModel from "@/models/section.model";
import TypeProduitModel from "@/models/type_produit.model";
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
        let newCatalogues = []

        await ApiService.CatalogueService.getCatalogueList().then(response => {
            catalogues = response.data
        })

        if (catalogues.length > 0) {
            for (let i = 0; i < catalogues.length; i++) {
                let catalogue = new CatalogueModel()
                catalogue.id = catalogues[i].id
                if (catalogues[i].ref_rayon !== null && catalogues[i].ref_rayon !== undefined) {
                    catalogue.ref_rayon = await RayonModel.getRayonDetail(catalogues[i].ref_rayon)
                }
                if (catalogues[i].ref_section !== null && catalogues[i].ref_section !== undefined) {
                    catalogue.ref_section = await SectionModel.getSectionDetail(catalogues[i].ref_section)
                }
                if (catalogues[i].ref_type_produit !== null && catalogues[i].ref_type_produit !== undefined) {
                    catalogue.ref_type_produit = await TypeProduitModel.getTypeProduitDetail(catalogues[i].ref_type_produit)
                }
                newCatalogues.push(catalogue)
            }
        }

        return newCatalogues
    }

    static async getCatalogueDetail(catalogueId) {
        let catalogue = {}
        await ApiService.CatalogueService.getCatalogueDetail(catalogueId).then(response => {
            catalogue = response.data
        })
        if (catalogue.ref_rayon !== null && catalogue.ref_rayon !== undefined) {
            catalogue.ref_rayon = await RayonModel.getRayonDetail(catalogue.ref_rayon)
        }
        if (catalogue.ref_section !== null && catalogue.ref_section !== undefined) {
            catalogue.ref_section = await SectionModel.getSectionDetail(catalogue.ref_section)
        }
        if (catalogue.ref_type_produit !== null && catalogue.ref_type_produit !== undefined) {
            catalogue.ref_type_produit = await TypeProduitModel.getTypeProduitDetail(catalogue.ref_type_produit)
        }
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