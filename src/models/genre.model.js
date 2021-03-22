import * as R from "ramda";
import {maxLength, minLength, required} from "vuelidate/lib/validators";

export default class GenreModel {
    constructor(genre = {}) {
        this.id = R.is(Number, genre.id) ? genre.id : null
        this.genre = R.is(String, genre.genre) ? genre.genre : ""
    }

    toCreatePayload() {
        return {
            genre: this.genre
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
            genre: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(20)
            }
        }
    }
}