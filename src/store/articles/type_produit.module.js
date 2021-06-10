import ApiService from '@/services/api.service';

export const TypeProduitModule = {
    namespaced: true,
    state: {
        typeProduits: [],
        loadingStatus: false
    },
    getters: {
        typeProduits: state => state.typeProduits,
        typeProduit: state => id => {
            return state.typeProduits.find(item => item.id === id)
        },
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        SET_TYPE_PRODUITS_SUCCESS(state, payload) {
            state.typeProduits = payload
        },
        SET_TYPE_PRODUITS_FAILURE(state) {
            state.typeProduits = []
        },
        LOADING_STATUS(state, loadingStatus) {
            state.loadingStatus = loadingStatus
        },
        ADD_TYPE_PRODUIT(state, payload) {
            state.typeProduits.push(payload)
        },
        UPDATE_TYPE_PRODUIT(state, payload) {
            const index = state.typeProduits.findIndex(item => item.id === payload.id)
            if (index !== -1) {
                state.typeProduits.splice(index, 1, payload)
            }
        },
        DELETE_TYPE_PRODUIT(state, payload) {
            const index = state.typeProduits.map(item => item.id).indexOf(payload.id)
            if (index !== -1) {
                state.typeProduits.splice(index, 1)
            }
        }
    },
    actions: {
        loadTypeProduits: async function({commit}) {
            let endpoint = `type-produits/`;
            return await new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_TYPE_PRODUITS_SUCCESS', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_TYPE_PRODUITS_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createTypeProduit: function({commit}, payload) {
            let endpoint = `type-produits/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_TYPE_PRODUIT', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateTypeProduit: function({commit}, payload) {
            let endpoint = `type-produits/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_TYPE_PRODUIT', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteTypeProduit: function({commit}, payload) {
            let endpoint = `type-produits/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_TYPE_PRODUIT', payload)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}