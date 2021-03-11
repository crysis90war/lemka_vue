import axios from "axios";
import authHeader from "@/configs/auth-header";
import LemkaHelpers from "@/helpers";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN
const CHARAC = '/caracteristiques/'

class MercerieOptionChatacteristicService {
    getMercerieOptionCharacteristics(mercerie_id) {
        let endpoint = `${DOMAIN}/${mercerie_id}${CHARAC}`
        return axios.get(endpoint, {headers: authHeader()})
    }

    postMercerieOptionCharacteristic(mercerie_id, payload) {
        let endpoint = `${DOMAIN}/${mercerie_id}${CHARAC}`
        return axios.post(endpoint, payload, {headers: authHeader()})
    }

    getMercerieOptionCharacteristic(mercerie_id, id) {
        let endpoint = `${DOMAIN}/${mercerie_id}${CHARAC}${id}/`
        return axios.get(endpoint, {headers: authHeader()})
    }

    putMercerieOptionCharacteristic(mercerie_id, payload) {
        let endpoint = `${DOMAIN}/${mercerie_id}${CHARAC}${payload.id}/`;
        return axios.put(endpoint, payload, {headers: authHeader()})
    }

    deleteMercerieOptionCharacteristic(mercerie_id, id) {
        let endpoint = `${DOMAIN}/${mercerie_id}${CHARAC}${id}/`
        return axios.delete(endpoint, {headers: authHeader()})
    }
}

export default new MercerieOptionChatacteristicService();