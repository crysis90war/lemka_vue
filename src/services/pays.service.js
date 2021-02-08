import axios from "axios";
import authHeader from "@/configs/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const PAYS_ROUTE = LemkaEnums.Endpoints.PAYS_ENDPOINT;

class PaysService {
    getPaysList() {
        return axios.get(PAYS_ROUTE)
    }

    getPaysDetail(paysId) {
        let endpoint = `${PAYS_ROUTE}${paysId}/`
        return axios.get(endpoint, {headers: authHeader()})
    }
}

export default new PaysService();