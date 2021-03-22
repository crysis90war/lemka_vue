import axios from "axios";
import authHeader from "@/services/auth-header";

class ApiService {
    GETDatas(endpoint) {
        return axios.get(endpoint, {headers: authHeader()});
    }

    POSTData(endpoint, payload) {
        return axios.post(endpoint, payload, {headers: authHeader()});
    }

    GETData(endpoint) {
        return axios.get(endpoint, {headers: authHeader()});
    }

    PUTData(endpoint, payload) {
        return axios.put(endpoint, payload, {headers: authHeader()});
    }

    DELETEData(endpoint) {
        return axios.delete(endpoint, {headers: authHeader()})
    }

    DESTROYSession() {
        sessionStorage.removeItem('user');
    }
}

export default new ApiService();