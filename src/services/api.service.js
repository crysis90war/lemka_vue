import axios from "axios";

const DOMAIN = process.env.VUE_APP_NODE_END === 'development'
    ? 'http://127.0.0.1:8000'
    : 'https://lemka-api.herokuapp.com'

axios.defaults.baseURL = DOMAIN;

function authHeader() {
    // let user = JSON.parse(sessionStorage.getItem('user'));
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.access) {
        return { Authorization: 'Bearer ' + user.access }; // for Spring Boot back-end
        // return { 'x-access-token': user.accessToken }; // for Node.js Express back-end
    }
    else {
        return {};
    }
}

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