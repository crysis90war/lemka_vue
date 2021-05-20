import CategorieModel from "@/models/categorie.model";
import ApiService from "@/services/api.service";

export const CategorieModule = {
    namespaced: true,
    state: {
        fetchCategorie: null,
        categories: [],
        loadingStatus: false
    },
    getters: {
        categorie: state => id => {
            return state.categories.find(item => item.id === id)
        },
        categories: state => state.categories,
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        LOAD_CATEGORIES_SUCCESS(state, categories) {
            state.categories = categories
        },
        LOAD_CATEGORIES_FAILURE(state) {
            state.categories = []
        },
        LOAD_CATEGORIE_SUCCESS(state, categorie) {
            state.fetchCategorie = categorie
        },
        LOAD_CATEGORIE_FAILURE(state) {
            state.fetchCategorie = null
        },
        LOADING_STATUS(state, newLoadingStatus) {
            state.loadingStatus = newLoadingStatus
        },
        ADD_CATEGORIE(state, categorie) {
            state.categories.push(categorie)
        },
        UPDATE_CATEGORIE(state, categorie) {
            const index = state.categories.findIndex(item => item.id === categorie.id)
            if (index !== -1) {
                state.categories.splice(index, 1, categorie)
            }
        },
        DELETE_CATEGORIE(state, categorie) {
            const index = state.categories.map(item => item.id).indexOf(categorie.id);
            if (index !== -1) {
                state.categories.splice(index, 1);
            }
        },
    },
    actions: {
        loadCategories: function ({commit}) {
            let endpoint = `categories/`;
            return new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('LOAD_CATEGORIES_SUCCESS', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('LOAD_CATEGORIES_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createCategorie: function ({commit}, payload) {
            let endpoint = `categories/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_CATEGORIE', Object.assign(new CategorieModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        loadCategorie: function ({commit}, categorie_id) {
            let endpoint = `categories/${categorie_id}/`;
            return new Promise((resolve, reject) => {
                ApiService.GETData(endpoint).then(r => {
                    commit('LOAD_CATEGORIE_SUCCESS', Object.assign(new CategorieModel(), r.data))
                    resolve(r.data)
                }, error => {
                    commit('LOAD_CATEGORIE_FAILURE')
                    reject(error)
                })
            })
        },
        updateCategorie: function ({commit}, payload) {
            let endpoint = `categories/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint).then(r => {
                    commit('UPDATE_CATEGORIE', Object.assign(new CategorieModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteCategorie: function ({commit}, categorie) {
            let endpoint = `categories/${categorie.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_CATEGORIE', categorie)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        }
    },
}