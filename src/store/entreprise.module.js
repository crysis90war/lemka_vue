import ApiService from "@/services/api.service";
import EntrepriseModel from "@/models/entreprise.model";

export const EntrepriseModule = {
    namespaced: true,
    state: {
        entreprises: [],
        loadingStatus: false,
    },
    getters: {
        entreprises: state => state.entreprises,
        entreprise: state => {
            return state.entreprises[0]
        },
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        SET_ENTREPRISES_SUCCES(state, payload) {
            state.entreprises = payload
        },
        SET_ENTREPRISES_FAILURE(state) {
            state.entreprises = []
        },
        LOADING_STATUS(state, loadingStatus) {
            state.loadingStatus = loadingStatus
        },
        ADD_ENTREPRISE(state, payload) {
            state.entreprises.push(payload)
        },
        UPDATE_ENTREPRISE(state, payload) {
            const index = state.entreprises.findIndex(item => item.id === payload.id)
            if (index !== -1) {
                state.entreprises.splice(index, 1, payload)
            }
        },
        DELETE_ENTREPRISE(state, payload) {
            const index = state.entreprises.map(item => item.id).indexOf(payload.id)
            if (index !== -1) {
                state.entreprises.splice(index, 1)
            }
        }
    },
    actions: {
        loadEntreprises({commit}) {
            let endpoint = `entreprises/`;
            return new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETData(endpoint).then(r => {
                    commit('SET_ENTREPRISES_SUCCES', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_ENTREPRISES_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createEntreprise({commit}, payload) {
            let endpoint = `entreprises/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_ENTREPRISE', Object.assign(new EntrepriseModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateEntreprise({commit}, payload) {
            let endpoint = `entreprises/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_ENTREPRISE', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteEntreprise({commit}, payload) {
            let endpoint = `entreprises/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_ENTREPRISE', payload)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}