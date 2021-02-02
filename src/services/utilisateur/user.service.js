import axios from "axios";
import authHeader from "@/services/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const ROUTE = LemkaEnums.UserEndpoints.PROFILE_ENDPOINT;

class UserService {
    getUserDetail() {
        return axios.get(ROUTE, {headers: authHeader()})
    }

    putUser() {

    }
}

export default new UserService();