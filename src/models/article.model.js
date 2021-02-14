import * as R from 'ramda'
import {format, isValid} from "date-fns";
import TypeServiceModel from "@/models/typeService.model";
import CatalogueModel from "@/models/catalogue.model";
import TagModel from "@/models/tag.model";
import ApiService from "@/services";

export default class ArticleModel {
    constructor(article = {}) {
        this.id = R.is(Number, article.id) ? article.id : null
        this.titre = R.is(String, article.titre) ? article.titre : ""
        this.description = R.is(String, article.description) ? article.description : ""
        this.est_active = R.is(Boolean, article.est_active) ? article.est_active : false
        this.ref_type_service = R.is(Object, article.ref_type_service) ? new TypeServiceModel(article.ref_type_service) : null
        this.ref_catalogue = R.is(Object, article.ref_catalogue) ? new CatalogueModel(article.ref_catalogue) : null
        this.ref_tag = R.is(Array, article.ref_tag) ? new Array(new TagModel(article.ref_tag)) : new Array(null)

        this.created_at = article.created_at && isValid(article.created_at) ? format(article.created_at, "DD-MM-YYYY") : null
        this.slug = R.is(String, article.slug) ? article.slug : ""
        this.images_count = R.is(Number, article.images_count) ? article.images_count : null
        this.likes_count = R.is(Number, article.likes_count) ? article.likes_count : null
        this.utilisateur_a_like = R.is(Boolean, article.utilisateur_a_like) ? article.utilisateur_a_like : false
    }

    toCreatePayload() {
        return {
            titre: this.titre,
            description: this.description,
            est_active: this.est_active,
            ref_type_service: this.ref_type_service.id,
            ref_catalogue: this.ref_catalogue.id,
            ref_tag: [this.ref_tag.id]
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

        }
    }

    static async getArticleList() {
        let articles = []
        await ApiService.ArticleService.getArticleList().then(response => {
            articles = response.data
        })
        return articles
    }

    static async getArticleDetail(articlesSlug) {
        let article = null
        let typeService = null
        await ApiService.ArticleService.getArticleDetail(articlesSlug).then(response => {
            article = response.data
        })
        if (article.ref_type_service !== null && article.ref_type_service !== undefined) {
            typeService = await TypeServiceModel.getTypeServiceDetail(article.ref_type_service)
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

    static async createArticle(payload) {
        await ApiService.ArticleService.postArticle(payload)
    }

    static async updateArticle(payload) {
        await ApiService.ArticleService.putArticle(payload.slug, payload)
    }

    static async deleteArticle(articleSlug) {
        await ApiService.ArticleService.deleteArticle(articleSlug)
    }
}