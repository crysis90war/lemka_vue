import * as R from 'ramda'

export default class ArticleImageModel {
    constructor(articleImage = {}) {
        this.id = R.is(Number, articleImage.id) ? articleImage.id : null
        this.is_main = R.is(Boolean, articleImage.is_main) ? articleImage.is_main : false
        this.image = R.is(String, articleImage.image) ? articleImage.image : ""
    }

    toCreatePayload() {
        return {
            is_main: this.is_main,
            image: this.image
        }
    }

    toUpdatePayload() {
        return {
            ...this.toCreatePayload(),
            id: this.id
        }
    }

    static get validation() {
        return {

        }
    }

    static get tableFields() {
        return [
            {key: 'image', label: 'Image'},
            {key: 'is_main', label: 'Priorité'},
            {key: 'define', label: 'Action'},
            {key: 'actions', label: 'Actions'},
        ]
    }
}