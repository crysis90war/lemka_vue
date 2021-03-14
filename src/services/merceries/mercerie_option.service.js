import axios from "axios";
import {LemkaEnums} from "@/helpers/enums.helper";
import authHeader from "@/configs/auth-header";

const DOMAIN = LemkaEnums.Endpoints.DOMAIN

class MercerieOptionService {
    getMercerieOptions(mercerie_id) {
        let endpoint = `${DOMAIN}/merceries/${mercerie_id}/options/`;
        return axios.get(endpoint, {headers: authHeader()})
    }

    postMercerieOption(mercerie_id, payload) {
        let endpoint = `${DOMAIN}/merceries/${mercerie_id}/options/`;
        return axios.post(endpoint, payload, {headers: authHeader()})
    }

    getMercerieOption(mercerie_id, option_id) {
        let endpoint = `${DOMAIN}/merceries/${mercerie_id}/options/${option_id}/`;
        return axios.get(endpoint, {headers: authHeader()})
    }

    putMercerieOption(mercerie_id, payload) {
        let endpoint = `${DOMAIN}/merceries/${mercerie_id}/options/${payload.id}/`;
        return axios.put(endpoint, payload, {headers: authHeader()})
    }

    deleteMercerieOption(mercerie_id, option_id) {
        let endpoint = `${DOMAIN}/merceries/${mercerie_id}/options/${option_id}/`;
        return axios.delete(endpoint, {headers: authHeader()})
    }
}

export default new MercerieOptionService()