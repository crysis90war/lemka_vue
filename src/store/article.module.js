import ArticleModel from "@/models/article/article.model";
import ApiService from "@/services/api.service";
import LemkaHelpers from "@/helpers";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const ArticleModule = {
    namespaced: true,
    state: {
        articles: [],
        articlesLoadingStatus: false,

        images: [],
        imagesLoadingStatus: false
    },
    getters: {
        articles: state => state.articles,
        articleBySlug: state => slug => {
            return state.articles.find(item => item.slug === slug)
        },
        articleById: state => id => {
          return state.articles.find(item => item.id === id)
        },
        articlesLoadingStatus: state => state.articlesLoadingStatus,
        articlesPublies: state => {
            return state.articles.filter(item => item.est_active === true)
        },

        images: state => state.images,
        image: state => id => {
            return state.images.find(item => item.id === id)
        },
        imagesLoadingStatus: state => state.imagesLoadingStatus
    },
    mutations: {
        // region Articles

        SET_ARTICLES_SUCCESS(state, payload) {
            state.articles = payload
        },
        SET_ARTICLES_FAILURE(state) {
            state.articles = []
        },
        ARTICLES_LOADING_STATUS(state, articlesLoadingStatus) {
            state.articlesLoadingStatus = articlesLoadingStatus
        },
        ADD_ARTICLE(state, article) {
            state.articles.push(article)
        },
        UPDATE_ARTICLE(state, article) {
            const index = state.articles.findIndex(item => item.id === article.id)
            if (index !== -1) {
                state.articles.splice(index, 1, article)
            }
        },
        DELETE_ARTICLE(state, article) {
            const index = state.articles.map(item => item.id).indexOf(article.id);
            if (index !== -1) {
                state.articles.splice(index, 1);
            }
        },

        // endregion
        // region Images

        LOAD_IMAGES_SUCCES(state, articleImages) {
            state.images = articleImages
        },
        LOAD_IMAGES_FAILURE(state) {
            state.images = []
        },
        IMAGES_LOADING_STATUS(state, imagesLoadingStatus) {
            state.imagesLoadingStatus = imagesLoadingStatus
        },
        ADD_IMAGE(state, image) {
            state.images.push(image)
        },
        UPDATE_IMAGE(state, image) {
            const index = state.images.findIndex(item => item.id === image.id)
            if (index !== -1) {
                state.images.splice(index, 1, image)
            }
        },
        DELETE_IMAGE(state, image) {
            const index = state.images.map(item => item.id).indexOf(image.id);
            if (index !== -1) {
                state.images.splice(index, 1)
            }
        }

        // endregion
    },
    actions: {
        // region Articles

        loadArticles: async function ({commit}) {
            let endpoint = `${DOMAIN}/articles/`;
            return await new Promise((resolve, reject) => {
                commit('ARTICLES_LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_ARTICLES_SUCCESS', r.data)
                    commit('ARTICLES_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_ARTICLES_FAILURE')
                    commit('ARTICLES_LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createArticle: async function ({commit}, payload) {
            let endpoint = `${DOMAIN}/articles/`;
            return await new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_ARTICLE', Object.assign(new ArticleModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateArticle: async function ({commit}, payload) {
            let endpoint = `${DOMAIN}/articles/${payload.slug}/`;

            return await new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_ARTICLE', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteArticle: async function ({commit}, article) {
            let endpoint = `${DOMAIN}/articles/${article.slug}/`;

            return await new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_ARTICLE', article)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        },

        // endregion
        // region Images

        loadImages: function ({commit}, article_slug) {
            let endpoint = `${DOMAIN}/articles/${article_slug}/images/`;
            return new Promise((resolve, reject) => {
                commit('IMAGES_LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('LOAD_IMAGES_SUCCES', r.data)
                    commit('IMAGES_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('LOAD_IMAGES_FAILURE')
                    commit('IMAGES_LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createImage: function({commit}, [article_slug, payload]) {
            let endpoint = `${DOMAIN}/articles/${article_slug}/images/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_IMAGE', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateImage: function({commit}, [article_slug, payload]){
            let endpoint = `${DOMAIN}/articles/${article_slug}/images/${payload.id}`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_IMAGE', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteImage: function ({commit}, [article_slug, article]) {
            let endpoint = `${DOMAIN}/articles/${article_slug}/images/${article.id}`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_IMAGE', article)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        }

        // endregion
    }
}