import axios from "axios";
import authHeader from "@/configs/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const DOMAIN = LemkaEnums.Endpoints.DOMAIN
const PROFIL = DOMAIN + '/profil/'
const UTILISATEURS = DOMAIN + '/utilisateurs/'

class AdresseService {
    getAdresse() {
        let endpoint = `${PROFIL}adresse/`
        return axios.get(endpoint, {headers: authHeader()})
    }

    getAdresseByUsername(username) {
        let endpoint = `${UTILISATEURS}${username}/adresses/`;
        return axios.get(endpoint, {headers: authHeader()})
    }

    postAdresse(payload) {
        let endpoint = `${PROFIL}adresses/`
        return axios.post(endpoint, payload, {headers: authHeader()})
    }

    putAdresse(payload) {
        let endpoint = `${PROFIL}adresse/`
        return axios.put(endpoint, payload, {headers: authHeader()})
    }
}

export default new AdresseService();