import axios from "axios";
import authHeader from "@/configs/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const ROUTE = LemkaEnums.Endpoints.GENRES_ENDPOINT;

class GenreService {
    getGenres() {
        return axios.get(ROUTE, {headers: authHeader()})
    }

    getGenre(genreId) {
        let endpoint = `${ROUTE}${genreId}/`;
        return axios.get(endpoint, {headers: authHeader()})
    }

    postGenre(payload) {
        return axios.post(ROUTE, payload, {headers: authHeader()})
    }

    putGenre(payload) {
        let endpoint = `${ROUTE}${payload.id}/`;
        return axios.put(endpoint, payload, {headers: authHeader()})
    }

    deleteGenre(genreId) {
        let endpoint = `${ROUTE}${genreId}/`;
        return axios.delete(endpoint, {headers: authHeader()})
    }
}

export default new GenreService();