import axios from "axios";
import {Endpoints} from "@/helpers/enums.helper";
import authHeader from "@/services/auth-header";

const ROUTE = Endpoints.GENRES_ENDPOINT;

class GenreService {

    getGenreList() {
        return axios
            .get(ROUTE, {headers: authHeader()})
    }

    getGenreDetail(genreId) {
        let endpoint = `${ROUTE}${genreId}/`;
        return axios
            .get(endpoint, {headers: authHeader()})
    }

    postGenre(payload) {
        return axios
            .post(ROUTE, payload, {headers: authHeader()})
    }

    updateGenre(genreId, payload) {
        let endpoint = `${ROUTE}${genreId}/`;
        return axios
            .put(endpoint, payload, {headers: authHeader()})
    }

    deleteGenre(genreId) {
        let endpoint = `${ROUTE}${genreId}/`;
        return axios
            .delete(endpoint, {headers: authHeader()})
    }
}

export default new GenreService();