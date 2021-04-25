import ApiService from "@/services/api.service";
import LemkaHelpers from "@/helpers";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const CouleurModule = {
    namespaced: true,
    state: {
        couleurs: [],
        loadingStatus: false
    },
    getters: {
        couleurs: state => state.couleurs,
        couleur: state => id => {
            return state.couleurs.find(couleur => couleur.id === id)
        },
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        SET_COULEURS_SUCCESS(state, payload) {
            state.couleurs = payload
        },
        SET_COULEURS_FAILURE(state) {
            state.couleurs = []
        },
        LOADING_STATUS(state, loadingStatus) {
            state.loadingStatus = loadingStatus
        },
        ADD_COULEUR(state, payload) {
            state.couleurs.push(payload)
        },
        UPDATE_COULEUR(state, payload) {
            const index = state.couleurs.findIndex(c => c.id === payload.id)
            if (index !== -1) {
                state.couleurs.splice(index, 1, payload)
            }
        },
        DELETE_COULEUR(state, payload) {
            const index = state.couleurs.findIndex(c => c.id === payload.id)
            if (index !== -1) {
                state.couleurs.splice(index, 1)
            }
        }
    },
    actions: {
        loadCouleurs: async function({commit}) {
            let endpoint = `${DOMAIN}/couleurs/`;
            return await new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_COULEURS_SUCCESS', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_COULEURS_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createCouleur: function ({commit}, payload) {
            let endpoint = `${DOMAIN}/couleurs/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_COULEUR', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateCouleur: function({commit}, payload) {
            let endpoint = `${DOMAIN}/couleurs/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_COULEUR', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteCouleur: function({commit}, couleur) {
            let endpoint = `${DOMAIN}/couleurs/${couleur.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_COULEUR', couleur)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}