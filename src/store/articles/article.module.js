import ApiService from "@/services/api.service";

export const ArticleModule = {
    namespaced: true,
    state: {
        articles: [],
        loadingStatus: false,

        gloabalArticles: [],
    },
    getters: {
        articles: state => state.articles,
        articleBySlug: state => slug => {
            return state.articles.find(item => item.slug === slug)
        },
        loadingStatus: state => state.loadingStatus,
        articlesPublies: state => {
            return state.articles.filter(item => item.est_active === true)
        },
        gloabalArticles: state => state.gloabalArticles
    },
    mutations: {
        SET_ARTICLES_SUCCESS(state, payload) {
            state.articles = payload
        },
        SET_ARTICLES_FAILURE(state) {
            state.articles = []
        },
        LOADING_STATUS(state, articlesLoadingStatus) {
            state.loadingStatus = articlesLoadingStatus
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

        ADD_IMAGE(state, [article_slug, payload]) {
            const index = state.articles.findIndex(item => item.slug === article_slug)
            console.log(index)
            if (index !== -1) {
                state.articles[index].images_count += 1
                state.articles[index].images.push(payload)
                console.log(state.articles[index].images)
            }
        },
        UPDATE_IMAGE(state, [article_slug, payload]) {
            const articleIndex = state.articles.findIndex(item => item.slug === article_slug)
            if (articleIndex !== -1) {
                const imageIndex = state.articles[articleIndex].images.findIndex(item => item.id === payload.id)
                if (imageIndex !== -1) {
                    state.article[articleIndex].images.splice(imageIndex, 1, payload)
                }
            }
        },
        DELETE_IMAGE(state, [article_slug, image]) {
            const articleIndex = state.articles.findIndex(item => item.slug === article_slug)
            if (articleIndex !== -1) {
                state.articles[articleIndex].images_count -= 1
                const imageIndex = state.articles[articleIndex].images.findIndex(item => item.id === image.id)
                if (imageIndex !== -1) {
                    state.articles[articleIndex].images.splice(imageIndex, 1)
                }
            }
        },


        SET_GLOBAL_ARTICLESS_SUCCESS(state, payload) {
            state.gloabalArticles = payload
        },
        SET_GLOBAL_ARTICLESS_FAILURE(state) {
            state.gloabalArticles = []
        },
    },
    actions: {
        loadGlobalArticles: async function({commit}, params = "") {
            let endpoint = `public/articles/${params}`;
            return await new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_GLOBAL_ARTICLESS_SUCCESS', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_GLOBAL_ARTICLESS_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })

        },
        loadArticles: async function ({commit}) {
            let endpoint = `articles/`;
            return await new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_ARTICLES_SUCCESS', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_ARTICLES_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createArticle: function ({commit}, payload) {
            let endpoint = `articles/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_ARTICLE', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateArticle: function ({commit}, payload) {
            let endpoint = `articles/${payload.slug}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_ARTICLE', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteArticle: function ({commit}, payload) {
            let endpoint = `articles/${payload.slug}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_ARTICLE', payload)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        },
        createLike: function({commit}, slug) {
            let endpoint = `profil/articles/${slug}/like/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, "").then(r => {
                    commit('UPDATE_ARTICLE', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteLike: function({commit}, slug) {
            let endpoint = `profil/articles/${slug}/like/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('UPDATE_ARTICLE', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },

        createImage: function({commit}, [article_slug, payload]) {
            let endpoint = `articles/${article_slug}/images/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    console.log(r.data)
                    commit('ADD_IMAGE', [article_slug, r.data])
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateImage: function({commit}, [article_slug, payload]){
            let endpoint = `articles/${article_slug}/images/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_IMAGE', [article_slug, r.data])
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteImage: function ({commit}, [article_slug, image]) {
            let endpoint = `articles/${article_slug}/images/${image.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_IMAGE', [article_slug, image])
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        },
        // endregion
    }
}