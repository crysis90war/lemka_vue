import axios from "axios";
import authHeader from "@/configs/auth-header";
import LemkaHelpers from "@/helpers";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN
const CHARACTERISTIC = '/caracteristiques/'

class CharacteristicService {
    getCharacteristics() {
        let endpoint = `${DOMAIN}${CHARACTERISTIC}`
        return axios.get(endpoint, {headers: authHeader()})
    }

    postCharacteristic(payload) {
        let endpoint = `${DOMAIN}${CHARACTERISTIC}`
        return axios.post(endpoint, payload, {headers: authHeader()})
    }

    getCharacteristic(characteristic_id) {
        let endpoint = `${DOMAIN}${CHARACTERISTIC}${characteristic_id}/`
        return axios.get(endpoint, {headers: authHeader()})
    }

    putCharacteristic(payload) {
        let endpoint = `${DOMAIN}${CHARACTERISTIC}${payload.id}/`
        return axios.put(endpoint, payload, {headers: authHeader()})
    }

    deleteCharacteristic(characteristic_id) {
        let endpoint = `${DOMAIN}${CHARACTERISTIC}${characteristic_id}/`;
        return axios.delete(endpoint, {headers: authHeader()})
    }
}

export default new CharacteristicService();