import axios from "axios";
import authHeader from "@/configs/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const ROUTE = LemkaEnums.Endpoints.CATEGORIES_ENDPOINT;

class CategorieService {

    getCategorieList() {
        return axios.get(ROUTE, {headers: authHeader()})
    }

    getCategorieDetail(categorieId) {
        let endpoint = `${ROUTE}${categorieId}/`;
        return axios
            .get(endpoint, {headers: authHeader()})
    }

    postCategorie(payload) {
        return axios
            .post(ROUTE, payload, {headers: authHeader()})
    }

    putCategorie(categorieId, payload) {
        let endpoint = `${ROUTE}${categorieId}/`;
        return axios
            .put(endpoint, payload, {headers: authHeader()})
    }

    patchCategorie(categorieId, payload) {
        let endpoint = `${ROUTE}${categorieId}/`;
        return axios
            .patch(endpoint, payload, {headers: authHeader()})
    }

    deleteCategorie(categorieId) {
        let endpoint = `${ROUTE}${categorieId}/`;
        return axios
            .delete(endpoint, {headers: authHeader()})
    }
}

export default new CategorieService();