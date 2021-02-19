import axios from "axios";
import authHeader from "@/configs/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const PROFIL = LemkaEnums.Endpoints.PROFIL + '/';

class ProfilService {
    getProfilDetail() {
        return axios.get(PROFIL, {headers: authHeader()})
    }

    putProfil(payload) {
        return axios.put(PROFIL, payload, {headers: authHeader()})
    }

    updateProfilImage(payload) {
        return axios.patch(PROFIL, payload, {headers: authHeader()})
    }
}

export default new ProfilService();