import axios from "axios";
import authHeader from "@/services/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const ROUTE = LemkaEnums.UserEndpoints.PROFIL_GENRE_ENDPOINT;

class GenreService {
    getGenres() {
        return axios.get(ROUTE, {headers: authHeader()})
    }

    getGenreDetail(genreId) {
        let endpoint = `${ROUTE}${genreId}/`
        return axios.get(endpoint, {headers: authHeader()})
    }
}

export default new GenreService();