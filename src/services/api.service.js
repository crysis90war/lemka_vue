import axios from "axios";
import authHeader from "@/services/auth-header";

const DOMAIN = process.env.VUE_APP_NODE_END === 'development' ? 'http://127.0.0.1:8000' : 'https://lemka-api.herokuapp.com'

axios.defaults.baseURL = DOMAIN;

class ApiService {
    GETDatas(endpoint) {
        return axios({
            method: 'get',
            url: '/api/' + endpoint,
            headers: authHeader()
        })
    }

    POSTData(endpoint, payload) {
        return axios({
            method: 'post',
            url: '/api/' + endpoint,
            data: payload,
            headers: authHeader()
        })
    }

    GETData(endpoint) {
        return axios({
            method: 'get',
            url: '/api/' + endpoint,
            headers: authHeader()
        })
    }

    PUTData(endpoint, payload) {
        return axios({
            method: 'put',
            url: '/api/' + endpoint,
            data: payload,
            headers: authHeader()
        })
    }

    PATCHData(endpoint, payload) {
        return axios({
            method: 'patch',
            url: '/api/' + endpoint,
            data: payload,
            headers: authHeader()
        })
    }

    DELETEData(endpoint) {
        return axios({
            method: 'DELETE',
            url: '/api/' + endpoint,
            headers: authHeader()
        })
    }

    DESTROYSession() {
        // sessionStorage.removeItem('user');
        localStorage.removeItem('user');
    }
}

export default new ApiService();