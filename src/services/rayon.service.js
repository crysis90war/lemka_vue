import axios from "axios";
import authHeader from "@/configs/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const ROUTE = LemkaEnums.Endpoints.RAYON_ENDPOINT

class RayonService {

    getRayonList() {
        return axios
            .get(ROUTE, {headers: authHeader()})
    }

    getRayonDetail(rayonId) {
        let endpoint = `${ROUTE}${rayonId}/`
        return axios
            .get(endpoint, {headers: authHeader()})
    }

    postRayon(payload) {
        return axios
            .post(ROUTE, payload, {headers: authHeader()})
    }

    updateRaon(rayonId, payload) {
        let endpoint = `${ROUTE}${rayonId}/`;
        return axios
            .put(endpoint, payload, {headers: authHeader()})
    }

    deleteRayon(rayonId) {
        let endpoint = `${ROUTE}${rayonId}/`;
        return axios
            .delete(endpoint)
    }
}

export default new RayonService();