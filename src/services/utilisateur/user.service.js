import axios from "axios";
import authHeader from "@/services/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const ROUTE = LemkaEnums.UserEndpoints.PROFILE_ENDPOINT;

class UserService {
    getUserDetail() {
        return axios.get(ROUTE, {headers: authHeader()})
    }

    putUser(payload) {
        return axios.put(ROUTE, payload, {headers: authHeader()})
    }

    patchUserImage(payload) {
        let data = {
            image: payload.image
        }
        return axios.patch(ROUTE, data, {headers: authHeader()})
    }
}

export default new UserService();