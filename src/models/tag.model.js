import * as R from 'ramda'
import {maxLength, minLength, required} from "vuelidate/lib/validators";
import ApiService from "@/services";

export default class TagModel {
    constructor(tag = {}) {
        this.id = R.is(Number, tag.id) ? tag.id : null
        this.tag = R.is(String, tag.slug) ? tag.slug : ""
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

    static async getTagList(searchParam = '') {
        let tags = []
        await ApiService.TagService.getTagList(searchParam).then(response => {
            tags = response.data.results
        })
        return tags
    }

    static async getTagDetail(tagId) {
        let tag = {}
        await ApiService.TagService.getTagDetail(tagId).then(response => {
            tag = response.data
        })
        return tag
    }

    static async createTag(payload) {
        let response = null
        await ApiService.TagService.postTag(payload).then(res => {
            response = res
        })
        return response
    }
}