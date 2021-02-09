import axios from "axios";
import authHeader from "@/configs/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const ROUTE = LemkaEnums.Endpoints.VILLE_ENDPOINT;

class VilleService {
    getVillesList(searchField = '') {
        let searchParam = `?search=${searchField}`
        let endpoint = `${ROUTE}${searchField === '' ? searchField : searchParam}`;
        return axios.get(endpoint, {headers: authHeader()})
    }

    getVillesDetail(villeId) {
        let endpoint = `${ROUTE}${villeId}/`;
        return axios.get(endpoint, {headers: authHeader()})
    }
}

export default new VilleService()