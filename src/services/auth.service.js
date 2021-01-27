import axios from 'axios';
import User from "@/models/user.model";
import {Endpoints} from "@/helpers/enums.helper";

class AuthService {
    login(user) {
        return axios.post(Endpoints.LOGIN_ENDPOINT, {email: user.email, password: user.password}).then(response => {
            if (response.data['tokens']) {
                let email = response.data.email;
                let username = response.data.username;
                let tokens = response.data.tokens;
                let is_staff;
                response.data.is_staff === 'True' ? is_staff = true : is_staff = false
                let utilisateur = new User.UtilisateurConnecte(email, is_staff, tokens, username)
                sessionStorage.setItem('user', JSON.stringify(utilisateur));
                return utilisateur;
            }
        });
    }

    refreshToken(user) {
        return axios.post(Endpoints.REFRESH_ENDPOINT, {refresh: user.tokens.refresh}).then(response => {
            let utilisateur = user
            utilisateur.tokens.access = response.data.access
            sessionStorage.setItem('user', JSON.stringify(utilisateur))
        })
    }

    logout() {
        sessionStorage.removeItem('user');
    }

    register(user) {
        return axios.post(Endpoints.REGISTER_ENDPOINT, {
            username: user.username,
            email: user.email,
            password: user.password,
            password2: user.password2
        });
    }
}

export default new AuthService();