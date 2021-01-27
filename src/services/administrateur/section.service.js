import axios from "axios";
import {Endpoints} from "@/helpers/enums.helper";
import authHeader from "@/services/auth-header";

const ROUTE = Endpoints.SECTION_ENDPOINT;

class SectionService {

    getSecteurList() {
        return axios
            .get(ROUTE, {headers: authHeader()})
    }

    getSectionDetail(sectionId) {
        let endpoint = `${ROUTE}${sectionId}/`;
        return axios
            .get(endpoint, {headers: authHeader()})
    }

    postSection(payload) {
        return axios
            .post(ROUTE, payload, {headers: authHeader()})
    }

    updateSection(sectionId, payload) {
        let endpoint = `${ROUTE}${sectionId}/`;
        return axios
            .put(endpoint, payload, {headers: authHeader()})
    }

    deleteSection(sectionId) {
        let endpoint = `${ROUTE}${sectionId}/`;
        return axios
            .delete(endpoint, {headers: authHeader()})
    }
}

export default new SectionService();