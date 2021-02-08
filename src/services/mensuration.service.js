import axios from "axios";
import authHeader from "@/configs/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const ROUTE = LemkaEnums.Endpoints.MENSURATION_ENDPOINT;

class MensurationService {

    getMensurationList() {
        return axios
            .get(ROUTE, {headers: authHeader()})
    }

    getMensurationDetail(mensurationId) {
        let endpoint = `${ROUTE}${mensurationId}/`;
        return axios
            .get(endpoint, {headers: authHeader()})
    }

    postMensuration(payload) {
        return axios
            .post(ROUTE, payload, {headers: authHeader()})
    }

    putMensuration(mensurationId, payload) {
        let endpoint = `${ROUTE}${mensurationId}/`;
        return axios
            .put(endpoint, payload, {headers: authHeader()})
    }

    patchMensuration(mensurationId, payload) {
        let endpoint = `${ROUTE}${mensurationId}/`;
        return axios
            .patch(endpoint, payload, {headers: authHeader()})
    }

    deleteMensuration(mensurationId) {
        let endpoint = `${ROUTE}${mensurationId}/`;
        return axios
            .delete(endpoint, {headers: authHeader()})
    }
}

export default new MensurationService();