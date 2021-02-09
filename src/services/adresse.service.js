import axios from "axios";
import authHeader from "@/configs/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const ADD_ADRESSE = LemkaEnums.Endpoints.ADRESSE_CREATE_ENDPOINT;
const ROUTE = LemkaEnums.Endpoints.ADRESSE_GUD_ENPOINT;

class AdresseService {
    getAdresse() {
        return axios.get(ROUTE, {headers: authHeader()})
    }

    getAdressesDetail(adresseId) {
        let endpoint = `${ROUTE}${adresseId}/`;
        return axios.get(endpoint, {headers: authHeader()})
    }

    postAdresse(payload) {
        return axios.post(ADD_ADRESSE, payload, {headers: authHeader()})
    }
}

export default new AdresseService();