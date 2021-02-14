import axios from "axios";
import {LemkaEnums} from "@/helpers/enums.helper";
import authHeader from "@/configs/auth-header";

const ROUTE = LemkaEnums.Endpoints.USERS_ENDPOINT;

class UtilisateurService {

    getUtilisateurList() {
        return axios.get(ROUTE, {headers: authHeader()})
    }

    getUtilisateurDetail(username) {
        let endpoint = `${ROUTE}${username}/`;
        return axios.get(endpoint, {headers: authHeader()})
    }

    postUser(payload) {
        return axios
            .post(ROUTE, payload, {headers: authHeader()})
    }

    updateUser(userId, payload) {
        let endpoint = `${ROUTE}${userId}/`
        return axios
            .put(endpoint, payload, {headers: authHeader()})
    }

    deleteUser(userId) {
        let endpoint = `${ROUTE}${userId}/`;
        return axios.delete(endpoint, {headers: authHeader()})
    }

    async checkUser(username) {
        let endpoint = `${LemkaEnums.Endpoints.CHECK_USER_EXISTS_ENDPOINT}${username}/`
        let message = false
        await axios.get(endpoint, {headers: authHeader()}).then(response => {
            message = response.data.message
        })
        return message
    }
}

export default new UtilisateurService();