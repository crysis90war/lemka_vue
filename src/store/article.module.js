import ApiService from "@/services";
import ArticleModel from "@/models/article.model";

export const articleModule = {
    namespaced: true,
    state: {
        articles: [],
        loadingStatus: false
    },
    getters: {
        article: state => id => {
            return state.articles.find(article => article.id === id)
        },
        articles: state => state.articles,
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        LOAD_ARTICLE_SUCCESS(state, articles) {
            state.articles = articles
        },
        LOAD_ARTICLE_FAILURE(state) {
            state.articles = []
        },
        LOADING_STATUS(state, newLoadingStatus) {
            state.loadingStatus = newLoadingStatus
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
        }
    },
    actions: {
        loadArticles: function ({commit}) {
            return new Promise(((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.Articles.getArticles().then(res => {
                    commit('LOAD_ARTICLE_SUCCESS', res.data)
                    commit('LOADING_STATUS', false)
                    resolve(res)
                }, error => {
                    commit('LOAD_ARTICLE_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            }))
        },
        createArticle: function ({commit}, payload) {
            return new Promise(((resolve, reject) => {
                ApiService.Articles.postArticle(payload).then(res => {
                    commit('ADD_ARTICLE', Object.assign(new ArticleModel(), res.data))
                    resolve(res)
                }, error => {
                    reject(error)
                })
            }))
        },
        // activerDesactiverArticle: function ({commit}, payload) {
        //     return new Promise(((resolve, reject) => {
        //         let data = {est_active: !payload.est_active}
        //         ApiService.Articles.patchArticle(payload.slug, data).then(res => {
        //
        //         })
        //     }))
        // }
    }
}