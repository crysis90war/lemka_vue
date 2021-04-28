import * as R from 'ramda'
import {format, isValid} from "date-fns";
import TypeServiceModel from "@/models/type_service.model";
import CatalogueModel from "@/models/catalogue/catalogue.model";
import {maxLength, minLength, required} from "vuelidate/lib/validators";

export default class ArticleModel {
    constructor(json = {}) {
        this.id = R.is(Number, json.id) ? json.id : null
        this.slug = R.is(String, json.slug) ? json.slug : ""
        this.created_at = json.created_at && isValid(json.created_at) ? format(json.created_at, "DD-MM-YYYY") : null
        this.updated_at = json.updated_at && isValid(json.updated_at) ? format(json.updated_at, "DD-MM-YYYY") : null
        this.est_active = R.is(Boolean, json.est_active) ? json.est_active : false
        this.titre = R.is(String, json.titre) ? json.titre : ""
        this.description = R.is(String, json.description) ? json.description : ""
        this.images_count = R.is(Number, json.images_count) ? json.images_count : 0
        this.likes_count = R.is(Number, json.likes_count) ? json.likes_count : null
        this.catalogue = R.is(Object, json.catalogue) ? new CatalogueModel(json.catalogue) : new CatalogueModel()
        this.type_service = R.is(Object, json.type_service) ? new TypeServiceModel(json.type_service) : new TypeServiceModel()

        this.tags = R.is(Array, json.tags) ? json.tags : []
        this.images = R.is(Array, json.images) ? json.images : []
    }

    toCreatePayload() {
        return {
            est_active: this.est_active,
            titre: this.titre,
            description: this.description,
            ref_type_service: this.type_service.id,
            ref_catalogue: this.catalogue.id,
            ref_tags: this.tags.map(item => item.id)
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

    static get imagesFields() {
        return [
            {key: 'image', label: 'Image'},
            {key: 'is_main', label: 'Priorité'},
            {key: 'actions', label: 'Actions'}
        ]
    }
}