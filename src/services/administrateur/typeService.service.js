import axios from "axios";
import {Endpoints} from "@/helpers/enums.helper";
import authHeader from "@/services/auth-header";

const ROUTE = Endpoints.TYPES_SERVICES_ENDPOINT;

class TypeServiceService {

    getTypeServiceList() {
        return axios
            .get(ROUTE, {headers: authHeader()})
    }

    async getTypeServiceDetail(typeServiceId) {
        try {
            let endpoint = `${ROUTE}${typeServiceId}/`;
            return await axios
                .get(endpoint, {headers: authHeader()})
        } catch (error) {
            return error
        }
    }

    postTypeService(payload) {
        return axios
            .post(ROUTE, payload, {headers: authHeader()})
    }

    updateTypeService(typeServiceId, payload) {
        let endpoint = `${ROUTE}${typeServiceId}/`;
        return axios
            .put(endpoint, payload, {headers: authHeader()})
    }

    deleteTypeService(typeServiceId) {
        let endpoint = `${ROUTE}${typeServiceId}/`;
        return axios
            .delete(endpoint, {headers: authHeader()})
    }

}

export default new TypeServiceService();