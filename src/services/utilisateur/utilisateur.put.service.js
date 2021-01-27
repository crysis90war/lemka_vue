import axios from 'axios';
import authHeader from '../auth-header';
import {Endpoints} from "@/helpers/enums.helper";

class UtilisateurPutService {

    updateUserInformations(data) {
        return axios.put(Endpoints.PROFILE_ENDPOINT, data, {headers: authHeader()})
    }

    updateMensuration(data, user_mensuration_id) {
        let endpoint = `${Endpoints.MENSURATION_ENDPOINT}${user_mensuration_id}/`;
        return axios.put(endpoint, data, {headers: authHeader()})
    }

    updateMensurationUserMensuration(data, user_mensuration_id, mensuration_user_mensuration_id) {
        let endpoint = `${Endpoints.MENSURATION_ENDPOINT}${user_mensuration_id}/mensurations/${mensuration_user_mensuration_id}/`
        return axios.put(endpoint, data, {headers: authHeader()})
    }

    updateUserAdresse(data, userAdresseId) {
        let endpoint = `${Endpoints.ADRESSE_ENDPOINT}${userAdresseId}/`
        return axios.put(endpoint, data, {headers: authHeader()})
    }
}

export default new UtilisateurPutService();