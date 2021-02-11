import axios from "axios";
import authHeader from "@/configs/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const ROUTE = LemkaEnums.Endpoints.USER_MENSURATION_ENDPOINT;
const MENSURATION = '/mensurations/';

class MensurationUserMensurationService {
    getMensurationUserMensurationsList(userMensurationId) {
        let endpoint = `${ROUTE}${userMensurationId}${MENSURATION}`;
        return axios.get(endpoint, {headers: authHeader()})
    }

    getMensurationUserMensurationsDetail(userMensurationId, mensurationUserMensurationId) {
        let endpoint = `${ROUTE}${userMensurationId}${MENSURATION}${mensurationUserMensurationId}/`;
        return axios.get(endpoint, {headers: authHeader()})
    }

    putMensurationUserMensurations(userMensurationId, mensurationUserMensurationId, payload) {
        let endpoint = `${ROUTE}${userMensurationId}${MENSURATION}${mensurationUserMensurationId}/`;
        let data = {
            mesure: payload.mesure
        }
        return axios.put(endpoint, data, {headers: authHeader()})
    }
}

export default new MensurationUserMensurationService();