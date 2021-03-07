import axios from "axios";
import authHeader from "@/configs/auth-header";
import {LemkaEnums} from "@/helpers/enums.helper";

const DOMAIN = LemkaEnums.Endpoints.DOMAIN
const ARTICLES = DOMAIN + '/articles/'
const IMAGES = '/images/';

class ArticleService {

    getArticles() {
        try {
            return axios.get(ARTICLES, {headers: authHeader()})
        } catch (error) {
            return error
        }
    }

    getArticleDetail(articleSlug) {
        let endpoint = `${ARTICLES}${articleSlug}/`;
        return axios.get(endpoint, {headers: authHeader()})

    }

    postArticle(payload) {
        let endpoint = `${ARTICLES}new/`
        return axios.post(endpoint, payload, {headers: authHeader()})
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
        let endpoint = `${ARTICLES}${articleSlug}${IMAGES}`;
        return axios.get(endpoint, {headers: authHeader()})
    }

    postArticleImage(articleSlug, payload) {
        let endpoint = `${ARTICLES}${articleSlug}${IMAGES}`;
        return axios.post(endpoint, payload, {headers: authHeader()})
    }

    putArticleImage(articleSlug, articleImageId, payload) {
        let endpoint = `${ARTICLES}${articleSlug}${IMAGES}${articleImageId}/`;
        return axios.put(endpoint, payload, {headers: authHeader()})
    }

    patchArticleImage(articleSlug, articleImageId, payload) {
        let endpoint = `${ARTICLES}${articleSlug}${IMAGES}${articleImageId}/`;
        return axios.put(endpoint, payload, {headers: authHeader()})
    }

    deleteArticleImage(articleSlug, articleImageId) {
        let endpoint = `${ARTICLES}${articleSlug}${IMAGES}${articleImageId}/`;
        return axios.delete(endpoint, {headers: authHeader()})
    }
}

export default new ArticleService();