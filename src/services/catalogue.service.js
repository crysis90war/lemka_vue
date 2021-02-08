import axios from "axios";
import authHeader from "@/configs/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const ROUTE = LemkaEnums.Endpoints.CATALOGUES_ENDPOINT

class CatalogueService {

    getCatalogueList() {
        return axios.get(ROUTE, {headers: authHeader()})
    }

    getCatalogueDetail(catalogueId) {
        let endpoint = `${ROUTE}${catalogueId}/`;
        return axios.get(endpoint, {headers: authHeader()})
    }

    postCatalogue(data) {
        return axios
            .post(ROUTE, data, {headers: authHeader()})
    }

    putCatalogue(catalogueId, data) {
        let endpoint = `${ROUTE}${catalogueId}/`;
        return axios
            .put(endpoint, data, {headers: authHeader()})
    }

    deleteCatalogue(catalogueId) {
        let endpoint = `${ROUTE}${catalogueId}`;
        return axios
            .delete(endpoint, {headers: authHeader()})
    }

}

export default new CatalogueService();