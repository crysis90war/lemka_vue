import axios from "axios";
import {Endpoints} from "@/helpers/enums.helper";
import authHeader from "@/services/auth-header";

const ROUTE = Endpoints.ARTICLES_ENDPOINT;
const ROUTE_IMAGES = '/images/';

class ArticleService {

    async getArticleList() {
        try {
            return await axios
                .get(ROUTE, {headers: authHeader()})
        } catch (error) {
            return error
        }
    }

    async getArticleDetail(articleSlug) {
        try {
            let endpoint = `${ROUTE}${articleSlug}/`;
            return await axios
                .get(endpoint, {headers: authHeader()})
        } catch (error) {
            return error
        }
    }

    async postArticle(payload) {
        return await axios
            .post(ROUTE, payload, {headers: authHeader()})
    }

    async putArticle(articleSlug, payload) {
        let endpoint = `${ROUTE}${articleSlug}/`;
        return await axios
            .put(endpoint, payload, {headers: authHeader()})
    }

    async patchArticle(articleSlug, payload) {
        let endpoint = `${ROUTE}${articleSlug}/`;
        return await axios
            .patch(endpoint, payload, {headers: authHeader()})
    }

    async deleteArticle(articleSlug) {
        let endpoint = `${ROUTE}${articleSlug}/`;
        return await axios
            .delete(endpoint, {headers: authHeader()})
    }

    async getArticleImagesList(articleSlug) {
        let endpoint = `${ROUTE}${articleSlug}${ROUTE_IMAGES}`;
        return await axios
            .get(endpoint, {headers: authHeader()})
    }
    
    async postArticleImage(articleSlug, payload) {
        let endpoint = `${ROUTE}${articleSlug}${ROUTE_IMAGES}`;
        return await axios
            .post(endpoint, payload, {headers: authHeader()})
    }
}

export default new ArticleService();