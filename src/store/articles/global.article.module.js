import ApiService from "@/services/api.service";

export const GlobalArticleModule = {
    namespaced: true,
    state: {
        articles: [],
        loadingStatus: false
    },
    getters: {
        articles: state => state.articles,
        article: state => id => {
            return state.articles.find(item => item.id === id)
        },
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        SET_ARTICLES_SUCCESS(state, payload) {
            state.articles = payload
        },
        SET_ARTICLES_FAILURE(state) {
            state.articles = []
        },
        SET_LOADING_STATUS(state, loadingStatus) {
            state.loadingStatus = loadingStatus
        },
        UPDATE_ARTICLE(state, payload) {
            const index = state.articles.findIndex(item => item.id === payload.id)
            if (index !== - 1) {
                state.articles.splice(index, 1, payload)
            }
        }
    },
    actions: {
        loadGlobalArticles: async function({commit}) {
            let endpoint = ``;
            return await new Promise((resolve, reject) => {
                commit('SET_LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_ARTICLES_SUCCESS', r.data)
                    commit('SET_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_ARTICLES_FAILURE')
                    commit('SET_LOADING_STATUS', false)
                    reject(error)
                })
            })
        }
    }
}