import AdresseModel from "@/models/adresse/adresse.model";
import ApiService from '@/services/api.service'

export const AdresseModule = {
    namespaced: true,
    state: {
        adresse: new AdresseModel(),
        loadingStatus: false
    },
    getters: {
        adresse: state => state.adresse,
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        SET_ADRESSE_SUCCESS(state, payload) {
            Object.assign(state.adresse, payload)
        },
        SET_ADRESSE_FAILURE(state) {
            state.adresse = new AdresseModel()
        },
        LOADING_STATUS(state, loadingStatus) {
            state.loadingStatus = loadingStatus
        }
    },
    actions: {
        loadAdresse: async function({commit}) {
            let endpoint = `profil/adresse/`;
            return await new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETData(endpoint).then(r => {
                    commit('SET_ADRESSE_SUCCESS', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_ADRESSE_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createAdresse({commit}, payload) {
            let endpoint = `profil/adresse/create/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('SET_ADRESSE_SUCCESS', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateAdresse({commit}, payload) {
            let endpoint = `profil/adresse/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('SET_ADRESSE_SUCCESS', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        loadAdresseByUsername: function ({commit}, username) {
            let endpoint = `utilisateurs/${username}/adresse/`;
            return new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETData(endpoint).then(r => {
                    commit('SET_ADRESSE_SUCCESS', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_ADRESSE_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        }
    }
}