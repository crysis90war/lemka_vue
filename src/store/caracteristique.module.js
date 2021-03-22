import ApiService from "@/services/api.service";
import CaracteristiqueModel from "@/models/characteristic.model";
import LemkaHelpers from "@/helpers";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const CaracteristiqueModule = {
    namespaced: true,
    state: {
        caracteristiques: [],
        caracteristiqueLoadingStatus: false
    },
    getters: {
        caracteristique: state => id => {
            return state.caracteristiques.find(item => item.id === id)
        },
        caracteristiques: state => state.caracteristiques,
        caracteristiqueLoadingStatus: state => state.caracteristiqueLoadingStatus
    },
    mutations: {
        LOAD_CARACTERISTIQUES_SUCCESS(state, characteristics) {
            state.caracteristiques = characteristics
        },
        LOAD_CARACTERISTIQUES_FAILURE(state) {
            state.caracteristiques = []
        },
        CARACTERISTIQUES_LOADING_STATUS(state, caracteristiqueLoadingStatus) {
            state.caracteristiqueLoadingStatus = caracteristiqueLoadingStatus
        },
        ADD_CARACTERISTIQUE(state, caracteristique) {
            state.caracteristiques.push(caracteristique)
        },
        UPDATE_CARACTERISTIQUE(state, caracteristique) {
            const index = state.caracteristiques.findIndex(item => item.id === caracteristique.id)
            if (index !== -1) {
                state.caracteristiques.splice(index, 1, caracteristique)
            }
        },
        DELETE_CARACTERISTIQUE(state, caracteristique) {
            const index = state.caracteristiques.map(item => item.id).indexOf(caracteristique.id)
            if (index !== -1) {
                state.caracteristiques.splice(index, 1)
            }
        }
    },
    actions: {
        loadCaracteristiques: function({commit}) {
            let endpoint = `${DOMAIN}/caracteristiques/`;
            return new Promise((resolve, reject) => {
                commit('CARACTERISTIQUES_LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('LOAD_CARACTERISTIQUES_SUCCESS', r.data)
                    commit('CARACTERISTIQUES_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('LOAD_CARACTERISTIQUES_FAILURE')
                    commit('CARACTERISTIQUES_LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createCaracteristique: function({commit}, payload) {
            let endpoint = `${DOMAIN}/caracteristiques/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_CARACTERISTIQUE', Object.assign(new CaracteristiqueModel(), r.data))
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
                    commit('UPDATE_CARACTERISTIQUE', Object.assign(new CaracteristiqueModel(), r.data))
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
                    commit('DELETE_CARACTERISTIQUE', caracteristique)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}