import AdresseModel from "@/models/adresse.model";
import LemkaHelpers from "@/helpers";
import ApiService from '@/services/api.service'

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

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
            state.adresse = null
        },
        LOADING_STATUS(state, loadingStatus) {
            state.loadingStatus = loadingStatus
        }
    },
    actions: {
        loadAdresse: async function({commit}) {
            let endpoint = `${DOMAIN}/profil/adresse/`;
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
            let endpoint = `${DOMAIN}/profil/adresse/create/`;
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
            let endpoint = `${DOMAIN}/profil/adresse/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('SET_ADRESSE_SUCCESS', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}