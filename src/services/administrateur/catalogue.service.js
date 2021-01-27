import axios from "axios";
import {Endpoints} from "@/helpers/enums.helper";
import authHeader from "@/services/auth-header";

class CatalogueService {

    async getCatalogueList() {
        let endpoint = Endpoints.CATALOGUES_ENDPOINT;
        return await axios
            .get(endpoint, {headers: authHeader()})
    }

    async getCatalogueDetail(catalogueId) {
        let endpoint = `${Endpoints.CATALOGUES_ENDPOINT}${catalogueId}/`;
        return await axios
            .get(endpoint, {headers: authHeader()})
    }

    postCatalogue(data) {
        let endpoint = Endpoints.CATALOGUES_ENDPOINT;
        return axios
            .post(endpoint, data, {headers: authHeader()})
    }

    putCatalogue(catalogueId, data) {
        let endpoint = `${Endpoints.CATALOGUES_ENDPOINT}${catalogueId}/`;
        return axios
            .put(endpoint, data, {headers: authHeader()})
    }

    deleteCatalogue(catalogueId) {
        let endpoint = `${Endpoints.CATALOGUES_ENDPOINT}${catalogueId}`;
        return axios
            .delete(endpoint, {headers: authHeader()})
    }

}

export default new CatalogueService();