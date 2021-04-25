import ApiService from "@/services/api.service";
import CaracteristiqueModel from "@/models/characteristic.model";
import LemkaHelpers from "@/helpers";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const CaracteristiqueModule = {
    namespaced: true,
    state: {
        characteristiques: [],
        loadingStatus: false
    },
    getters: {
        characteristique: state => id => {
            return state.characteristiques.find(item => item.id === id)
        },
        characteristiques: state => state.characteristiques,
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        SET_CHARACTERISTIQUES_SUCCESS(state, payload) {
            state.characteristiques = payload
        },
        SET_CHARACTERISTIQUES_FAILURE(state) {
            state.characteristiques = []
        },
        LOADING_STATUS(state, loadingStatus) {
            state.loadingStatus = loadingStatus
        },
        ADD_CHARACTERISTIQUE(state, caracteristique) {
            state.characteristiques.push(caracteristique)
        },
        UPDATE_CHARACTERISTIQUE(state, caracteristique) {
            const index = state.characteristiques.findIndex(item => item.id === caracteristique.id)
            if (index !== -1) {
                state.characteristiques.splice(index, 1, caracteristique)
            }
        },
        DELETE_CHARACTERISTIQUE(state, caracteristique) {
            const index = state.characteristiques.map(item => item.id).indexOf(caracteristique.id)
            if (index !== -1) {
                state.characteristiques.splice(index, 1)
            }
        }
    },
    actions: {
        loadCaracteristiques: function({commit}) {
            let endpoint = `${DOMAIN}/caracteristiques/`;
            return new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_CHARACTERISTIQUES_SUCCESS', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_CHARACTERISTIQUES_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createCaracteristique: function({commit}, payload) {
            let endpoint = `${DOMAIN}/caracteristiques/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_CHARACTERISTIQUE', Object.assign(new CaracteristiqueModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateCaracteristique: function({commit}, payload) {
            let endpoint = `${DOMAIN}/caracteristiques/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_CHARACTERISTIQUE', Object.assign(new CaracteristiqueModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteCaracteristique: function({commit}, caracteristique) {
            let endpoint = `${DOMAIN}/caracteristiques/${caracteristique.id}`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_CHARACTERISTIQUE', caracteristique)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}