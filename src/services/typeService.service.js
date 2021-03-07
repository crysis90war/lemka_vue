import axios from "axios";
import authHeader from "@/configs/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const ROUTE = LemkaEnums.Endpoints.TYPES_SERVICES_ENDPOINT;

class TypeServiceService {
    getTypeServices() {
        return axios.get(ROUTE, {headers: authHeader()})
    }

    postTypeService(payload) {
        return axios.post(ROUTE, payload, {headers: authHeader()})
    }

    getTypeService(type_service_id) {
        let endpoint = `${ROUTE}${type_service_id}/`;
        return axios.get(endpoint, {headers: authHeader()})
    }

    putTypeService(payload) {
        let endpoint = `${ROUTE}${payload.id}/`;
        return axios.put(endpoint, payload, {headers: authHeader()})
    }

    deleteTypeService(type_service_id) {
        let endpoint = `${ROUTE}${type_service_id}/`;
        return axios.delete(endpoint, {headers: authHeader()})
    }
}

export default new TypeServiceService();