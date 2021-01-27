import axios from "axios";
import {Endpoints} from "@/helpers/enums.helper";
import authHeader from "@/services/auth-header";

class RayonService {

    getRayonList() {
        let endpoint = Endpoints.RAYON_ENDPOINT;
        return axios
            .get(endpoint, {headers: authHeader()})
    }

    getRayonDetail(rayonId) {
        let endpoint = `${Endpoints.RAYON_ENDPOINT}${rayonId}/`
        return axios
            .get(endpoint, {headers: authHeader()})
    }

    postRayon(payload) {
        let endpoint = Endpoints.RAYON_ENDPOINT;
        return axios
            .post(endpoint, payload, {headers: authHeader()})
    }

    updateRaon(rayonId, payload) {
        let endpoint = `${Endpoints.RAYON_ENDPOINT}${rayonId}/`;
        return axios
            .put(endpoint, payload, {headers: authHeader()})
    }

    deleteRayon(rayonId) {
        let endpoint = `${Endpoints.RAYON_ENDPOINT}${rayonId}/`;
        return axios
            .delete(endpoint)
    }
}

export default new RayonService();