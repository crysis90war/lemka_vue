import axios from "axios";
import authHeader from "@/services/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const ROUTE = LemkaEnums.UserEndpoints.VILLE_ENDPOINT;

class VilleService {
    getVillesList() {
        return axios.get(ROUTE, {headers: authHeader()})
    }

    getVillesDetail(villeId) {
        let endpoint = `${ROUTE}${villeId}/`;
        return axios.get(endpoint, {headers: authHeader()})
    }
}

export default new VilleService()