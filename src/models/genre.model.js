import * as R from "ramda";
import ApiService from "@/services";
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

    static async getGenreList() {
        let genres = []
        await ApiService.GenreService.getGenreList().then(response => {
            genres = response.data
        })
        return genres
    }

    static async getGenreDetail(genreId) {
        let genre = {}
        await ApiService.GenreService.getGenreDetail(genreId).then(response => {
            genre = response.data
        })
        return genre
    }

    static async createGenre(payload) {
        let message = null
        await ApiService.GenreService.postGenre(payload).then(response => {
            message = response
        })
        return message
    }

    static async deleteGenre(genreId) {
        let message = null
        await ApiService.GenreService.deleteGenre(genreId).then(response => {
            message = response
        })
        return message
    }
}