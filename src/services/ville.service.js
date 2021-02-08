import axios from "axios";
import authHeader from "@/configs/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const ROUTE = LemkaEnums.Endpoints.VILLE_ENDPOINT;

class VilleService {
    getVillesList(searchField = '') {
        let searchParam = `?search=${searchField}`
        return axios.get(ROUTE + searchField === '' ? searchField : searchParam, {headers: authHeader()})
    }

    getVillesDetail(villeId) {
        let endpoint = `${ROUTE}${villeId}/`;
        return axios.get(endpoint, {headers: authHeader()})
    }
}

export default new VilleService()