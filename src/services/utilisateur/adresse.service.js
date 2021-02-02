import axios from "axios";
import authHeader from "@/services/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const ADD_ADRESSE = LemkaEnums.UserEndpoints.ADRESSE_CREATE_ENDPOINT;
const ROUTE = LemkaEnums.UserEndpoints.ADRESSE_GUD_ENPOINT;

class AdresseService {
    getAdresse() {
        return axios.get(ROUTE, {headers: authHeader()})
    }

    postAdresse(payload) {
        return axios.post(ADD_ADRESSE, payload, {headers: authHeader()})
    }

    getAdressesDetail(adresseId) {
        let endpoint = `${ROUTE}${adresseId}/`;
        return axios.get(endpoint, {headers: authHeader()})
    }
}

export default new AdresseService();