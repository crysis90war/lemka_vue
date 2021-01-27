import axios from "axios";
import {Endpoints} from "@/helpers/enums.helper";
import authHeader from "@/services/auth-header";

const ROUTE = Endpoints.MERCERIE_ENDPOINT;

class MercerieService {

    getMercerieList() {
        return axios
            .get(ROUTE, {headers: authHeader()})
    }

    getMercerieDetail(mercerieId) {
        let endpoint = `${ROUTE}${mercerieId}/`;
        return axios
            .get(endpoint, {headers: authHeader()})
    }

    postMercerie(payload) {
        return axios
            .post(ROUTE, payload, {headers: authHeader()})
    }

    updateMercerie(mercerieId, payload) {
        let endpoint = `${ROUTE}${mercerieId}/`;
        return axios
            .put(endpoint, payload, {headers: authHeader()})
    }

    deleteMercerie(mercerieId) {
        let endpoint = `${ROUTE}${mercerieId}/`;
        return axios
            .delete(endpoint, {headers: authHeader()})
    }
}

export default new MercerieService();