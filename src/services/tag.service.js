import axios from "axios";
import authHeader from "@/configs/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const DOMAIN = LemkaEnums.Endpoints.DOMAIN;

class TagService {
    getTagList(searchField = '') {
        let searchParam = `?search=${searchField}`
        let endpoint = `${DOMAIN}/tags/${searchField === '' ? searchField : searchParam}`
        return axios.get(endpoint, {headers: authHeader()})
    }

    getTagDetail(tagId) {
        let endpoint = `${DOMAIN}/tags/${tagId}/`;
        return axios.get(endpoint, {headers: authHeader()})
    }

    postTag(payload) {
        let endpoint = `${DOMAIN}/tags/`
        return axios.post(endpoint, payload, {headers: authHeader()})
    }

    updateTag(tagId, payload) {
        let endpoint = `${DOMAIN}/tags/${tagId}/`;
        return axios.put(endpoint, payload, {headers: authHeader()})
    }

    deleteTag(tagId) {
        let endpoint = `${DOMAIN}/tags/${tagId}/`;
        return axios.delete(endpoint, {headers: authHeader()})
    }

}

export default new TagService()