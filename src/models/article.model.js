import * as R from 'ramda'

export default class ArticleModel {
    constructor(article = {}) {
        this.id = R.is(Number, article.id) ? article.id : null
        this.slug = R.is(String, article.slug) ? article.slug : ""
        this.created_at = R.is()
    }
}