import axios from "axios";
import authHeader from "@/configs/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const ROUTE = LemkaEnums.Endpoints.MERCERIE_ENDPOINT;

class MercerieService {

    getMerceries() {
        return axios.get(ROUTE, {headers: authHeader()})
    }

    postMercerie(payload) {
        return axios.post(ROUTE, payload, {headers: authHeader()})
    }

    getMercerie(mercerieId) {
        let endpoint = `${ROUTE}${mercerieId}/`;
        return axios.get(endpoint, {headers: authHeader()})
    }

    putMercerie(payload) {
        let endpoint = `${ROUTE}${payload.id}/`;
        return axios.put(endpoint, payload, {headers: authHeader()})
    }

    deleteMercerie(mercerieId) {
        let endpoint = `${ROUTE}${mercerieId}/`;
        return axios.delete(endpoint, {headers: authHeader()})
    }
}

export default new MercerieService();