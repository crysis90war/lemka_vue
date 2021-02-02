import axios from "axios";
import authHeader from "@/services/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const PAYS_ROUTE = LemkaEnums.UserEndpoints.PAYS_ENDPOINT;

class PaysService {
    getPaysDetail(paysId) {
        let endpoint = `${PAYS_ROUTE}${paysId}/`
        return axios.get(endpoint, {headers: authHeader()})
    }
}

export default new PaysService();