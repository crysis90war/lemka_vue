import RayonModel from '@/models/rayon.model'
import SectionModel from '@/models/section.model'
import TypeProduitModel from '@/models/typeProduit.model'

export default class CatalogueModel {
    constructor() {
        this.ref_rayon = new RayonModel()
        this.ref_section = new SectionModel()
        this.ref_type_produit = new TypeProduitModel()
    }
}