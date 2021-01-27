import axios from "axios";
import {Endpoints} from "@/helpers/enums.helper";
import authHeader from "@/services/auth-header";

const ROUTE = Endpoints.ENTREPRISE_ENDPOINT;

class EntrepriseService {

    getEntrepriseList() {
        return axios
            .get(ROUTE, {headers: authHeader()})
    }

    getEntrepriseDetail(entrepriseId) {
        let endpoint = `${ROUTE}${entrepriseId}/`;
        return axios
            .get(endpoint, {headers: authHeader()})
    }

    postEntreprise(payload) {
        return axios
            .post(ROUTE, payload, {headers: authHeader()})
    }

    updateEntreprise(entrepriseId, payload) {
        let endpoint = `${ROUTE}${entrepriseId}/`;
        return axios
            .put(endpoint, payload, {headers: authHeader()})
    }

    deleteEntreprise(entrepriseId) {
        let endpoint = `${ROUTE}${entrepriseId}/`;
        return axios
            .delete(endpoint, {headers: authHeader()})
    }
}

export default new EntrepriseService();