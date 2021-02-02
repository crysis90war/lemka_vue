import axios from 'axios';
import authHeader from './auth-header';
import {Endpoints} from '@/helpers/enums.helper';

class UtilisateurGetService {

    getUserProfil() {
        return axios.get(Endpoints.PROFILE_ENDPOINT, { headers: authHeader() });
    }

    getUserGenres() {
        return axios.get(Endpoints.PROFIL_GENRE_ENDPOINT, { headers: authHeader() })
    }

    getUserListMensurations() {
        return axios.get(Endpoints.USER_MENSURATION_ENDPOINT, { headers: authHeader() })
    }

    getUserMensuration(id) {
        return axios.get(Endpoints.USER_MENSURATION_ENDPOINT + id, { headers: authHeader()})
    }

    getMensurationUserMensuration(id) {
        return axios.get(Endpoints.USER_MENSURATION_ENDPOINT + id + '/mensurations/', { headers: authHeader() })
    }

    getUserVilles() {
        return axios.get(Endpoints.VILLES_ENDPOINT, { headers: authHeader() })
    }

    getUserListAdresses() {
        return axios.get(Endpoints.ADRESSE_ENDPOINT, { headers: authHeader() })
    }

    getUserAdresse(id) {
        return axios.get(Endpoints.ADRESSE_ENDPOINT + id, { headers: authHeader() })
    }
}

export default new UtilisateurGetService();