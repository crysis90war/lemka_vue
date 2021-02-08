import axios from "axios";
import authHeader from "@/configs/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const ROUTE = LemkaEnums.Endpoints.MERCERIE_ENDPOINT;

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