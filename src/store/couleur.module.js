import ApiService from "@/services/api.service";
import LemkaHelpers from "@/helpers";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const CouleurModule = {
    namespaced: true,
    state: {
        couleurs: [],
        couleursLoadingStatus: false
    },
    getters: {
        couleurs: state => state.couleurs,
        couleur: state => id => {
            return state.couleurs.find(couleur => couleur.id === id)
        },
        couleursLoadingStatus: state => state.couleursLoadingStatus
    },
    mutations: {
        LOAD_COULEURS_SUCCESS(state, couleurs) {
            state.couleurs = couleurs
        },
        LOAD_COULEURS_FAILURE(state) {
            state.couleurs = []
        },
        COULEURS_LOADING_STATUS(state, newLoadingStatus) {
            state.couleursLoadingStatus = newLoadingStatus
        },
        ADD_COULEUR(state, couleur) {
            state.couleurs.push(couleur)
        },
        UPDATE_COULEUR(state, couleur) {
            const index = state.couleurs.findIndex(c => c.id === couleur.id)
            if (index !== -1) {
                state.couleurs.splice(index, 1, couleur)
            }
        },
        DELETE_COULEUR(state, couleur) {
            const index = state.couleurs.findIndex(c => c.id === couleur.id)
            if (index !== -1) {
                state.couleurs.splice(index, 1)
            }
        }
    },
    actions: {
        loadCouleurs: function({commit}) {
            let endpoint = `${DOMAIN}/couleurs/`;
            return new Promise((resolve, reject) => {
                commit('COULEURS_LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('LOAD_COULEURS_SUCCESS', r.data)
                    commit('COULEURS_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('LOAD_COULEURS_FAILURE')
                    commit('COULEURS_LOADING_STATUS', false)
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