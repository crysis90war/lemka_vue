import axios from "axios";
import authHeader from "@/services/auth-header";

let DOMAIN;
if (process.env.VUE_APP_NODE_END === 'development') {
    DOMAIN = 'http://127.0.0.1:8000';
} else {
    DOMAIN = 'https://lemka-api.herokuapp.com';
}

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

    PATCHDate(endpoint, payload) {
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