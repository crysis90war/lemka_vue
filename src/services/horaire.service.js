import axios from "axios";
import {LemkaEnums} from "@/helpers/enums.helper";
import authHeader from "@/configs/auth-header";

const DOMAIN = LemkaEnums.Endpoints.DOMAIN;

class HoraireService {
    getHoraires() {
        let endpoint = DOMAIN + "/public/horaire/"
        return axios.get(endpoint, {headers: authHeader()})
    }
}

export default new HoraireService();