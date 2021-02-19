import axios from "axios";
import authHeader from "@/configs/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const DOMAIN = LemkaEnums.Endpoints.DOMAIN
const ARTICLES = DOMAIN + '/articles/'
const ROUTE_IMAGES = '/images/';

class ArticleService {

    getArticleList() {
        try {
            return axios.get(ARTICLES, {headers: authHeader()})
        } catch (error) {
            return error
        }
    }

    getArticleDetail(articleSlug) {
        try {
            let endpoint = `${ARTICLES}${articleSlug}/`;
            return axios
                .get(endpoint, {headers: authHeader()})
        } catch (error) {
            return error
        }
    }

    postArticle(payload) {
        return axios.post(ARTICLES, payload, {headers: authHeader()})
    }

    putArticle(articleSlug, payload) {
        let endpoint = `${ARTICLES}${articleSlug}/`;
        return axios.put(endpoint, payload, {headers: authHeader()})
    }

    patchArticle(articleSlug, payload) {
        let endpoint = `${ARTICLES}${articleSlug}/`;
        return axios.patch(endpoint, payload, {headers: authHeader()})
    }

    deleteArticle(articleSlug) {
        let endpoint = `${ARTICLES}${articleSlug}/`;
        return axios.delete(endpoint, {headers: authHeader()})
    }

    getArticleImagesList(articleSlug) {
        let endpoint = `${ARTICLES}${articleSlug}${ROUTE_IMAGES}`;
        return axios.get(endpoint, {headers: authHeader()})
    }
    
    postArticleImage(articleSlug, payload) {
        let endpoint = `${ARTICLES}${articleSlug}${ROUTE_IMAGES}`;
        return axios.post(endpoint, payload, {headers: authHeader()})
    }
}

export default new ArticleService();