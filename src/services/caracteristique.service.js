import axios from "axios";
import authHeader from "@/configs/auth-header";

class CaracteristiqueService {
    getCaracteristiques() {
        let endpoint = ``
        return axios.get(endpoint, {headers: authHeader()})
    }

    postCaracteristique(payload) {
        let endpoint = ``
        return axios.post(endpoint, payload, {headers: authHeader()})
    }

    getCaracteristique(caracteristique_id) {
        let endpoint = `${caracteristique_id}`
        return axios.get(endpoint, {headers: authHeader()})
    }

    putCaracteristique(payload) {
        let endpoint = `${payload.id}`
        return axios.put(endpoint, payload, {headers: authHeader()})
    }

    deleteCaracteristique(caracteristique_id) {
        let endpoint = `${caracteristique_id}`;
        return axios.delete(endpoint, {headers: authHeader()})
    }
}

export default new CaracteristiqueService();