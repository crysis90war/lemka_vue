import axios from "axios";
import {Endpoints} from "@/helpers/enums.helper";
import authHeader from "@/services/auth-header";

class UserService {

    getUserList() {
        let endpoint = Endpoints.USERS_ENDPOINT;
        return axios
            .get(endpoint, {headers: authHeader()})
    }

    getUserDetail(userSlug) {
        let endpoint = `${Endpoints.USERS_ENDPOINT}${userSlug}/`;
        return axios
            .get(endpoint, {headers: authHeader()})
    }

    postUser(payload) {
        let endpoint = Endpoints.USERS_ENDPOINT;
        return axios
            .post(endpoint, payload, {headers: authHeader()})
    }

    updateUser(userId, payload) {
        let endpoint = `${Endpoints.USERS_ENDPOINT}${userId}/`
        return axios
            .put(endpoint, payload, {headers: authHeader()})
    }

    deleteUser(userId) {
        let endpoint = `${Endpoints.USERS_ENDPOINT}${userId}/`;
        return axios
            .delete(endpoint, {headers: authHeader()})
    }
}

export default new UserService();