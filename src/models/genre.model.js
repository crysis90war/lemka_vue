import * as R from "ramda";
import ApiService from "@/services";

export default class GenreModel {
    constructor(genre = {}) {
        this.id = R.is(Number, genre.id) ? genre.id : null
        this.genre = R.is(String, genre.genre) ? genre.genre : ""
    }

    static async fetchGenres() {
        let genres = []
        await ApiService.GenreService.getGenreList().then(response => {
            genres = response.data
        })
        return genres
    }

    static async fetchGenre(genreId) {
        let genre = {}
        await ApiService.GenreService.getGenreDetail(genreId).then(response => {
            genre = response.data
        })
        return genre
    }
}