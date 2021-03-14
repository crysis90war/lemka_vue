import axios from 'axios';
import LemkaHelpers from "@/helpers";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;
const LOGIN = DOMAIN + '/login/';
const REGISTER = DOMAIN + '/register/';
const REFRESH = DOMAIN + '/token/refresh/'

class AuthService {
    login(user) {
        return axios.post(LOGIN, {
            email: user.email,
            password: user.password
        }).then(response => {
            if (response.data['tokens']) {
                let utilisateur = {
                    email: response.data.email,
                    username: response.data.username,
                    tokens: {
                        refresh: response.data.tokens.refresh,
                        access: response.data.tokens.access
                    },
                    is_staff: response.data.is_staff === 'True'
                }
                sessionStorage.setItem('user', JSON.stringify(utilisateur));
                return utilisateur;
            }
        });
    }

    register(user) {
        return axios.post(REGISTER, {
            username: user.username,
            email: user.email,
            password: user.password,
            password2: user.password2
        });
    }

    refreshToken(user) {
        return axios.post(REFRESH, {
            refresh: user.tokens.refresh
        }).then(response => {
            let utilisateur = user
            utilisateur.tokens.access = response.data.access
            sessionStorage.setItem('user', JSON.stringify(utilisateur))
        })
    }

    logout() {
        sessionStorage.removeItem('user');
    }
}

export default new AuthService();