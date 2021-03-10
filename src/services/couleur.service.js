import axios from "axios";
import LemkaHelpers from "@/helpers";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN

class CouleurService {
    getCouleurs() {
        let endpoint = `${DOMAIN}/couleurs/`;
        return axios.get(endpoint)
    }

    getCouleurById(couleur_id) {
        let endpoint = `${DOMAIN}/couleurs/${couleur_id}/`;
        return axios.get(endpoint)
    }

    postCouleur(payload) {
        let endpoint = `${DOMAIN}/couleurs/`;
        return axios.post(endpoint, payload)
    }

    putCouleur(payload) {
        let endpoint = `${DOMAIN}/couleurs/${payload.id}/`
        return axios.put(endpoint, payload)
    }

    deleteCouleur(couleur_id) {
        let endpoint = `${DOMAIN}/couleurs/${couleur_id}/`;
        return axios.delete(endpoint)
    }
}

export default new CouleurService();