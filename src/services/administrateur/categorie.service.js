import axios from "axios";
import {Endpoints} from "@/helpers/enums.helper";
import authHeader from "@/services/auth-header";

const ROUTE = Endpoints.CATEGORIES_ENDPOINT;

class CategorieService {

    async getCategorieList() {
        try {
            return await axios
                .get(ROUTE, {headers: authHeader()})
        } catch (error) {
            return error
        }
    }

    async getCategorieDetail(categorieId) {
        let endpoint = `${ROUTE}${categorieId}/`;
        return await axios
            .get(endpoint, {headers: authHeader()})
    }

    async postCategorie(payload) {
        return await axios
            .post(ROUTE, payload, {headers: authHeader()})
    }

    async putCategorie(categorieId, payload) {
        let endpoint = `${ROUTE}${categorieId}/`;
        return await axios
            .put(endpoint, payload, {headers: authHeader()})
    }

    async patchCategorie(categorieId, payload) {
        let endpoint = `${ROUTE}${categorieId}/`;
        return await axios
            .patch(endpoint, payload, {headers: authHeader()})
    }

    async deleteCategorie(categorieId) {
        let endpoint = `${ROUTE}${categorieId}/`;
        return await axios
            .delete(endpoint, {headers: authHeader()})
    }
}

export default new CategorieService();