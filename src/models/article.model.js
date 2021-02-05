import TypeServiceModel from '@/models/typeService.model'
import CatalogueModel from '@/models/catalogue.model'
import TagModel from "@/models/tag.model";

export default class ArticleModel {
    constructor(id, created_at, slug, likes_count) {
        this.id = Number
        this.created_at = Date
        this.slug = String
        this.likes_count = Number
        this.utilisateur_a_like = Boolean
        this.titre = String
        this.description = String
        this.est_active = Boolean
        this.ref_type_service = new TypeServiceModel()
        this.ref_catalogue = new CatalogueModel()
        this.ref_tag = [new TagModel()]
    }
}