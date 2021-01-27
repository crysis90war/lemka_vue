import axios from 'axios';
import authHeader from '../auth-header';
import Outils from '@/mixins/outils.mixin';
import {Endpoints} from "@/helpers/enums.helper";

class UtilisateurPostService {

    postUserMensuration(data) {
        return axios
            .post(Endpoints.MENSURATION_ENDPOINT, data, { headers: authHeader() })
            .then((response) => { Outils.handleResponse(response) })
            .catch(error => console.log(error));
    }

    postUserAdresse(data) {
        return axios
            .post(Endpoints.ADRESSE_ENDPOINT, data, { headers: authHeader() })
            .then((response) => { Outils.handleResponse(response)})
            .catch(error => console.log(error))
    }
}

export default new UtilisateurPostService();