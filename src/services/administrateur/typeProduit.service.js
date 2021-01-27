import axios from "axios";
import authHeader from "@/services/auth-header";
import {Endpoints} from "@/helpers/enums.helper";

const ROUTE = Endpoints.TYPE_PRODUIT_ENDPOINT

class TypeProduitService {

    async getTypeProduitList() {
        return await axios
            .get(ROUTE, {headers: authHeader()})
    }

    async getTypeProduitDetail(typeProduitId) {
        let endpoint = `${ROUTE}${typeProduitId}/`;
        return await axios
            .get(endpoint, {headers: authHeader()})
    }

    async postTypeProduit(payload) {
        return await axios
            .post(ROUTE, payload, {headers: authHeader()})
    }

    async putTypeProduit(typeProduitId, payload) {
        let endpoint = `${ROUTE}${typeProduitId}/`;
        return await axios
            .put(endpoint, payload, {headers: authHeader()})
    }

    async patchTypeProduit(typeProduitId, payload) {
      let endpoint = `${ROUTE}${typeProduitId}/`;
      return await axios
          .patch(endpoint, payload, {headers: authHeader()})
    }

    async deleteTypeProduit(typeProduitId) {
        let endpoint = `${ROUTE}${typeProduitId}/`;
        return await axios
            .delete(endpoint, {headers: authHeader()})
    }
}

export default new TypeProduitService();