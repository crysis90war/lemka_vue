import ApiService from "@/services/api.service";
import LemkaHelpers from "@/helpers";
import EntrepriseModel from "@/models/entreprise.model";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const EntrepriseModule = {
    namespaced: true,
    state: {
        entreprises: [],
        entrepriseLoadingStatus: false,
    },
    getters: {
        entreprises: state => state.entreprises,
        entreprise: state => {
            return state.entreprises[0]
        },
        entrepriseLoadingStatus: state => state.entrepriseLoadingStatus
    },
    mutations: {
        LOAD_ENTREPRISES_SUCCES(state, entreprises) {
            state.entreprises = entreprises
        },
        LOAD_ENTREPRISES_FAILURE(state) {
            state.entreprises = []
        },
        ENTREPRISES_LOADING_STATUS(state, entrepriseLoadingStatus) {
            state.entrepriseLoadingStatus = entrepriseLoadingStatus
        },
        ADD_ENTREPRISE(state, entreprise) {
            state.entreprises.push(entreprise)
        },
        UPDATE_ENTREPRISE(state, entreprise) {
            const index = state.entreprises.findIndex(item => item.id === entreprise.id)
            if (index !== -1) {
                state.entreprises.splice(index, 1, entreprise)
            }
        },
        DELETE_ENTREPRISE(state, entreprise) {
            const index = state.entreprises.map(item => item.id).indexOf(entreprise.id)
            if (index !== -1) {
                state.entreprises.splice(index, 1)
            }
        }
    },
    actions: {
        loadEntreprises({commit}) {
            let endpoint = `${DOMAIN}/entreprises/`;
            return new Promise((resolve, reject) => {
                commit('ENTREPRISES_LOADING_STATUS', true)
                ApiService.GETData(endpoint).then(r => {
                    commit('LOAD_ENTREPRISES_SUCCES', r.data)
                    commit('ENTREPRISES_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('LOAD_ENTREPRISES_FAILURE')
                    commit('ENTREPRISES_LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createEntreprise({commit}, payload) {
            let endpoint = `${DOMAIN}/entreprises/`;
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
            let endpoint = `${DOMAIN}/entreprises/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_ENTREPRISE', Object.assign(new EntrepriseModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteEntreprise({commit}, entreprise) {
            let endpoint = `${DOMAIN}/entreprises/${entreprise.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_ENTREPRISE', entreprise)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}