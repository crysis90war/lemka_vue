import CategorieModel from "@/models/categorie.model";
import ApiService from "@/services";

export const categorieModule = {
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
            return new Promise(((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.Categories.getCategories().then(res => {
                    commit('LOAD_CATEGORIES_SUCCESS', res.data)
                    commit('LOADING_STATUS', false)
                    resolve(res)
                }, error => {
                    commit('LOAD_CATEGORIES_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            }))
        },

        createCategorie: function ({commit}, payload) {
            return new Promise(((resolve, reject) => {
                ApiService.Categories.postCategorie(payload).then(res => {
                    commit('ADD_CATEGORIE', Object.assign(new CategorieModel(), res.data))
                    resolve(res)
                }, error => {
                    reject(error)
                })
            }))
        },

        fetchCategorie: function ({commit}, categorie_id) {
          return new Promise(((resolve, reject) => {
              ApiService.Categories.getCategorieDetail(categorie_id).then(res => {
                  commit('LOAD_CATEGORIE_SUCCESS', Object.assign(new CategorieModel(), res.data))
                  resolve(res)
              }, error => {
                  commit('LOAD_CATEGORIE_FAILURE')
                  reject(error)
              })
          }))
        },

        updateCategorie: function ({commit}, payload) {
            return new Promise(((resolve, reject) => {
                ApiService.Categories.putCategorie(payload).then(res => {
                    commit('UPDATE_CATEGORIE', Object.assign(new CategorieModel(), res.data))
                    resolve(res)
                }, error => {
                    reject(error)
                })
            }))
        },

        deleteCategorie: function ({commit}, categorie) {
            return new Promise(((resolve, reject) => {
                ApiService.Categories.deleteCategorie(categorie.id).then(res => {
                    commit('DELETE_CATEGORIE', categorie)
                    resolve(res)
                }, error => {
                    reject(error)
                })
            }))
        }
    },
}