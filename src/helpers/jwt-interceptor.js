import axios from 'axios';
import LemkaHelpers from "@/helpers/index";
const user = JSON.parse(localStorage.getItem('user'));

export function jwtInterceptor() {
    axios.interceptors.request.use(request => {
        const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;
        const account = user ? user : null;
        const isLoggedIn = !!user;
        const isApiUrl = request.url.startsWith(DOMAIN)

        console.log(isApiUrl)
        console.log(isLoggedIn)
        console.log(account)

        if (isLoggedIn && isApiUrl) {
            request.headers.common['Authorization'] = `Bearer ${account.access}`
        }
    })
}