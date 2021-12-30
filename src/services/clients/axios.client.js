import axios from 'axios';

const baseDomain = process.env.VUE_APP_NODE_END === 'development'
    ? 'http://127.0.0.1:8000/api/'
    : 'https://lemka-api.herokuapp.com/api/';

const baseUrl = `${baseDomain}`;

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

export default axios.create({
    baseURL: baseUrl,
    headers: authHeader()
});