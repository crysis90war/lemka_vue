import * as R from 'ramda'
import {maxLength, minLength, required} from "vuelidate/lib/validators";

export default class TagModel {
    constructor(tag = {}) {
        this.id = R.is(Number, tag.id) ? tag.id : null
        this.tag = R.is(String, tag.slug) ? tag.slug : ""
        this.tag_slug = R.is(String, tag.tag_slug) ? tag.tag_slug : ""
    }

    toCreatePayload() {
        return {
            tag: this.tag,
        }
    }

    toUpdatePayload() {
        return {
            ...this.toCreatePayload(),
            id: this.id
        }
    }

    static get validations() {
        return {
            tag: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(50)
            }
        }
    }
}