import axios from 'axios';
const user = JSON.parse(localStorage.getItem('user'));

export function jwtInterceptor() {
    axios.interceptors.request.use(request => {
        let DOMAIN;
        if (process.env.VUE_APP_NODE_END === 'development') {
            DOMAIN = 'http://127.0.0.1:8000';
        } else {
            DOMAIN = 'https://lemka-api.herokuapp.com';
        }
        const account = user ? user : null;
        const isLoggedIn = !!user;
        const isApiUrl = request.url.startsWith(DOMAIN)

        if (isLoggedIn && isApiUrl) {
            request.headers.common['Authorization'] = `Bearer ${account.access}`
        }
    })
}