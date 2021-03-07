import * as R from 'ramda'
import {format, isValid} from "date-fns";
import TypeServiceModel from "@/models/type_service.model";
import CatalogueModel from "@/models/catalogue.model";
import TagModel from "@/models/tag.model";
import ApiService from "@/services";
import {maxLength, minLength, required} from "vuelidate/lib/validators";

export default class ArticleModel {
    constructor(article = {}) {
        this.id = R.is(Number, article.id) ? article.id : null
        this.est_active = R.is(Boolean, article.est_active) ? article.est_active : false
        this.titre = R.is(String, article.titre) ? article.titre : ""
        this.description = R.is(String, article.description) ? article.description : ""
        this.ref_type_service = R.is(Object, article.ref_type_service) ? new TypeServiceModel(article.ref_type_service) : null
        this.ref_catalogue = R.is(Object, article.ref_catalogue) ? new CatalogueModel(article.ref_catalogue) : null
        this.ref_tag = R.is(Array, article.ref_tag) ? [new TagModel(article.ref_tag)] : []

        this.created_at = article.created_at && isValid(article.created_at) ? format(article.created_at, "DD-MM-YYYY") : null
        this.slug = R.is(String, article.slug) ? article.slug : ""
        this.images_count = R.is(Number, article.images_count) ? article.images_count : null
        this.likes_count = R.is(Number, article.likes_count) ? article.likes_count : null
        this.utilisateur_a_like = R.is(Boolean, article.utilisateur_a_like) ? article.utilisateur_a_like : false
    }

    toCreatePayload() {
        return {
            est_active: this.est_active,
            titre: this.titre,
            description: this.description,
            ref_type_service: this.ref_type_service.id,
            ref_catalogue: this.ref_catalogue.id,
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
            {
                key: 'est_active', label: 'Active',
                // eslint-disable-next-line no-unused-vars
                formatter: (value, key, item) => {
                    return value ? 'Oui' : 'Non'
                },
                sortable: true,
                sortByFormatted: true,
                filterByFormatted: true
            },
            {key: 'actions', label: 'Actions'}
        ]
    }

    static async fetch_articles() {
        let articles = []
        await ApiService.ArticleService.getArticleList().then(response => {
            articles = response.data
        })
        return articles
    }

    static async fetch_article_by_slug(articleSlug) {
        let article = null
        let typeService = null
        await ApiService.ArticleService.getArticleDetail(articleSlug).then(response => {
            article = response.data
        }, error => {
            article = error.response.status
        })
        if (article !== null && article !== 404) {
            if (article.ref_type_service !== null && article.ref_type_service !== undefined) {
                typeService = await TypeServiceModel.getTypeService(article.ref_type_service)
                article.ref_type_service = typeService
            }
            if (article.ref_catalogue !== null && article.ref_catalogue !== undefined) {
                article.ref_catalogue = await CatalogueModel.getCatalogueDetail(article.ref_catalogue)
            }
            if (article.ref_tag.length > 0) {
                let tags = []
                for (const item of article.ref_tag) {
                    let tag = {}
                    tag = await TagModel.getTagDetail(item)
                    tags.push(tag)
                }
                article.ref_tag = tags
            }
            return article
        }
    }

    static async create_article(payload) {
        let response = null
        await ApiService.ArticleService.postArticle(payload).then(res => {
            response = res
        })
        return response
    }

    static async update_article(payload) {
        await ApiService.ArticleService.putArticle(payload.slug, payload)
    }

    static async delete_article(articleSlug) {
        await ApiService.ArticleService.deleteArticle(articleSlug)
    }

    static async fetch_article_images(articleSlug) {
        let article_images = []
        await ApiService.ArticleService.getArticleImagesList(articleSlug).then(res => {
            article_images = res.data
        })
        return article_images
    }

    static async create_article_image(article_slug, payload) {
        await ApiService.ArticleService.postArticleImage(article_slug, payload)
    }

    static async update_article_image_by_id(article_slug, image_id, payload) {
        await ApiService.ArticleService.putArticleImage(article_slug, image_id, payload)
    }

    static async patch_article_image(article_slug, image_id, payload) {
        await ApiService.ArticleService.patchArticleImage(article_slug, image_id, payload)
    }

    static async delete_article_image_by_id(article_slug, image_id) {
        await ApiService.ArticleService.deleteArticleImage(article_slug, image_id)
    }
}