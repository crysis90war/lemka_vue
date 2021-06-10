import ApiService from "@/services/api.service";

export const CaracteristiqueModule = {
    namespaced: true,
    state: {
        caracteristiques: [],
        loadingStatus: false
    },
    getters: {
        caracteristiques: state => state.caracteristiques,
        caracteristique: state => id => {
            return state.caracteristiques.find(item => item.id === id)
        },
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        LOAD_ITEMS_SUCCESS(state, payload) {
            state.caracteristiques = payload
        },
        LOAD_ITEMS_FAILURE(state) {
            state.caracteristiques = []
        },
        LOADING_STATUS(state, loadingStatus) {
            state.loadingStatus = loadingStatus
        },
        ADD_ITEM(state, payload) {
            state.caracteristiques.push(payload)
        },
        UPDATE_ITEM(state, payload) {
            const index = state.caracteristiques.findIndex(item => item.id === payload.id)
            if (index !== -1) {
                state.caracteristiques.splice(index, 1, payload)
            }
        },
        DELETE_ITEM(state, payload) {
            const index = state.caracteristiques.map(item => item.id).indexOf(payload.id)
            if (index !== -1) {
                state.caracteristiques.splice(index, 1)
            }
        }
    },
    actions: {
        loadCaracteristiques: function({commit}) {
            let endpoint = `caracteristiques/`;
            return new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('LOAD_ITEMS_SUCCESS', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('LOAD_ITEMS_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createCaracteristique: function({commit}, payload) {
            let endpoint = `caracteristiques/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_ITEM', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateCaracteristique: function({commit}, payload) {
            let endpoint = `caracteristiques/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_ITEM', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteCaracteristique: function({commit}, payload) {
            let endpoint = `caracteristiques/${payload.id}`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_ITEM', payload)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}