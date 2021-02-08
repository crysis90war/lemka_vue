import axios from "axios";
import authHeader from "@/configs/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const ROUTE = LemkaEnums.Endpoints.PROFILE_ENDPOINT;

class ProfilService {
    getProfilDetail() {
        return axios.get(ROUTE, {headers: authHeader()})
    }

    putProfil(payload) {
        return axios.put(ROUTE, payload, {headers: authHeader()})
    }

    patchProfilImage(payload) {
        let data = {
            image: payload.image
        }
        return axios.patch(ROUTE, data, {headers: authHeader()})
    }
}

export default new ProfilService();