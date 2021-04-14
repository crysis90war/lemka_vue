import * as R from 'ramda'
import {format, isValid} from "date-fns";
import TypeServiceModel from "@/models/type_service.model";
import CatalogueModel from "@/models/catalogue/catalogue.model";
import TagModel from "@/models/tag.model";
import {maxLength, minLength, required} from "vuelidate/lib/validators";

export default class ArticleModel {
    constructor(article = {}) {
        this.id = R.is(Number, article.id) ? article.id : null
        this.slug = R.is(String, article.slug) ? article.slug : ""
        this.created_at = article.created_at && isValid(article.created_at) ? format(article.created_at, "DD-MM-YYYY") : null
        this.updated_at = article.updated_at && isValid(article.updated_at) ? format(article.updated_at, "DD-MM-YYYY") : null
        this.est_active = R.is(Boolean, article.est_active) ? article.est_active : false
        this.titre = R.is(String, article.titre) ? article.titre : ""
        this.description = R.is(String, article.description) ? article.description : ""
        this.images_count = R.is(Number, article.images_count) ? article.images_count : null
        this.likes_count = R.is(Number, article.likes_count) ? article.likes_count : null
        this.catalogue = R.is(Object, article.catalogue) ? new CatalogueModel(article.catalogue) : null
        this.type_service = R.is(Object, article.type_service) ? new TypeServiceModel(article.type_service) : new TypeServiceModel()

        this.ref_tag = R.is(Array, article.ref_tag) ? [new TagModel(article.ref_tag)] : []
        this.images = R.is(Array, article.images) ? [article.images] : []
    }

    toCreatePayload() {
        return {
            est_active: this.est_active,
            titre: this.titre,
            description: this.description,
            ref_type_service: this.type_service.id,
            ref_catalogue: this.catalogue.id,
            ref_tag: []
        }
    }

    toUpdatePayload() {
        return {
            ...this.toCreatePayload(),
            slug: this.slug
        }
    }

    static get validations() {
        return {
            titre: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(255),
            },
            description: {
                required,
                minLength: minLength(3)
            },
            // ref_service: {
            //     required
            // },
            // ref_catalogue: {
            //     required
            // },
        }
    }

    static get tableFields() {
        return [
            {key: 'created_at', label: 'Date de création', sortable: true},
            {key: 'type_service', label: 'Service', sortable: true},
            {key: 'titre', label: 'Titre', sortable: true},
            {key: 'images_count', label: 'Images', sortable: true},
            {key: 'likes_count', label: 'Likes', sortable: true},
            {key: 'rayon', label: 'Rayon', sortable: true},
            {key: 'section', label: 'Section', sortable: true},
            {key: 'type_produit', label: 'Type de produit', sortable: true},
            {key: 'est_active', label: 'Publication', sortable: true}
        ]
    }
}