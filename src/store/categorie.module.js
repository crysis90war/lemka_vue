import CategorieModel from "@/models/categorie.model";

export const categorieModule = {
    namespaced: true,
    state: {
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
        loadCategories: async function ({commit}) {
            try {
                commit('LOADING_STATUS', true)
                let categories = await CategorieModel.fetchCategories()
                commit('LOAD_CATEGORIES_SUCCESS', categories)
                commit('LOADING_STATUS', false)
                return Promise.resolve(categories)
            } catch (e) {
                commit('LOAD_CATEGORIES_FAILURE')
                commit('LOADING_STATUS', false)
                return Promise.reject(e)
            }
        },

        createCategorie: async function ({commit}, payload) {
            try {
                let categorie = await CategorieModel.createCategorie(payload)
                commit('ADD_CATEGORIE', categorie)
            } catch (e) {
                return Promise.reject(e)
            }
        },

        updateCategorie: async function ({commit}, payload) {
            try {
                let categorie = await CategorieModel.updateCategorie(payload)
                commit('UPDATE_CATEGORIE', Object.assign(new CategorieModel(), categorie))
                return Promise.resolve(categorie)
            } catch (e) {
                return Promise.reject(e)
            }
        },

        deleteCategorie: async function ({commit}, categorie) {
            try {
                await CategorieModel.deleteCategorie(categorie.id)
                commit('DELETE_CATEGORIE', categorie)
            } catch (e) {
                return Promise.reject(e)
            }
        }
    },
}