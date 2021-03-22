import * as R from 'ramda'
import {maxLength, minLength, required, alpha} from "vuelidate/lib/validators";

export default class SectionModel {
    constructor(section = {}) {
        this.id = R.is(Number, section.id) ? section.id : null
        this.section = R.is(String, section.section) ? section.id : ""
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
}