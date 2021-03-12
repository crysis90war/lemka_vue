import axios from "axios";
import authHeader from "@/configs/auth-header";
import LemkaHelpers from "@/helpers";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN
const ROUTES = DOMAIN + '/mercerie_options/'
const CHARAC = '/caracteristiques/'

class MercerieOptionChatacteristicService {
    getMercerieOptionCharacteristics(mercerie_option_id) {
        let endpoint = `${ROUTES}${mercerie_option_id}${CHARAC}`
        return axios.get(endpoint, {headers: authHeader()})
    }

    postMercerieOptionCharacteristic(mercerie_option_id, payload) {
        let endpoint = `${ROUTES}${mercerie_option_id}${CHARAC}`
        return axios.post(endpoint, payload, {headers: authHeader()})
    }

    getMercerieOptionCharacteristic(mercerie_option_id, id) {
        let endpoint = `${ROUTES}${mercerie_option_id}${CHARAC}${id}/`
        return axios.get(endpoint, {headers: authHeader()})
    }

    putMercerieOptionCharacteristic(mercerie_option_id, payload) {
        let endpoint = `${ROUTES}${mercerie_option_id}${CHARAC}${payload.id}/`;
        return axios.put(endpoint, payload, {headers: authHeader()})
    }

    deleteMercerieOptionCharacteristic(mercerie_option_id, id) {
        let endpoint = `${ROUTES}${mercerie_option_id}${CHARAC}${id}/`
        return axios.delete(endpoint, {headers: authHeader()})
    }
}

export default new MercerieOptionChatacteristicService();