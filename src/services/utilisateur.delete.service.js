import axios from 'axios';
import authHeader from './auth-header';
import Outils from '@/mixins/outils.mixin'
import {Endpoints} from "@/helpers/enums.helper";

class UtilisateurDeleteService {

    deleteUserMensuration(item_id) {
        let endpoint = `${Endpoints.USER_MENSURATION_ENDPOINT}${item_id}/` ;
        return axios
            .delete(endpoint, { headers: authHeader() })
            .then((response) => { Outils.handleResponse(response)})
            .catch(error => { console.log(error) })
    }

    deleteUserAdresse(item_id) {
        let endpoint = `${Endpoints.ADRESSE_ENDPOINT}${item_id}/`
        return axios
            .delete(endpoint, { headers: authHeader() })
            .then((response) => { Outils.handleResponse(response) })
            .catch(error => { console.log(error) })
    }
}

export default new UtilisateurDeleteService();