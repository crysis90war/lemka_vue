import axios from 'axios';
import {LemkaEnums} from "@/helpers/enums.helper";

class AuthService {
    login(user) {
        return axios.post(LemkaEnums.GlobalEndpoints.LOGIN_ENDPOINT, {
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

    refreshToken(user) {
        return axios.post(LemkaEnums.GlobalRoutes.REFRESH_ENDPOINT, {
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

    register(user) {
        return axios.post(LemkaEnums.GlobalRoutes.REGISTER_ENDPOINT, {
            username: user.username,
            email: user.email,
            password: user.password,
            password2: user.password2
        });
    }
}

export default new AuthService();