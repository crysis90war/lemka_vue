import * as R from 'ramda'
import {maxLength, minLength, required, alpha} from "vuelidate/lib/validators";
import ApiService from "@/services";

export default class SectionModel {
    constructor(section = {}) {
        this.id = R.is(Number, section.id) ? section.id : null
        this.section = R.is(String, section.section) ? section.id : ""
        this.section_slug = R.is(String, section.section_slug) ? section.slug : ""
    }

    toCreatePayload() {
        return {
            section: this.section
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
            section: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(255),
                alpha
            }
        }
    }

    static async getSectionList() {
        let sections = []
        await ApiService.SectionService.getSecteurList().then(response => {
            sections = response.data
        })
        return sections
    }

    static async getSectionDetail(sectionId) {
        let section = {}
        await ApiService.SectionService.getSectionDetail(sectionId).then(response => {
            section = response.data
        })
        return section
    }

    static async createSection(payload) {
        await ApiService.SectionService.postSection(payload)
    }

    static async updateSection(sectionId, payload) {
        await ApiService.SectionService.updateSection(sectionId, payload)
    }

    static async deleteSection(sectionId) {
        await ApiService.SectionService.deleteSection(sectionId)
    }
}