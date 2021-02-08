import axios from "axios";
import authHeader from "@/configs/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const ROUTE = LemkaEnums.Endpoints.TAGS_ENDPOINT;

class TagService {
    getTagList() {
        return axios
            .get(ROUTE, {headers: authHeader()})
    }

    getTagDetail(tagId) {
        let endpoint = `${ROUTE}${tagId}/`;
        return axios
            .get(endpoint, {headers: authHeader()})
    }

    postTag(payload) {
        return axios
            .post(ROUTE, payload, {headers: authHeader()})
    }

    updateTag(tagId, payload) {
        let endpoint = `${ROUTE}${tagId}/`;
        return axios
            .put(endpoint, payload, {headers: authHeader()})
    }

    deleteTag(tagId) {
        let endpoint = `${ROUTE}${tagId}/`
        return axios
            .delete(endpoint, {headers: authHeader()})
    }

}

export default new TagService()