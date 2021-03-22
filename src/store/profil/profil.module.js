import LemkaHelpers from "@/helpers";
import ApiService from "@/services/api.service";
import ProfilModel from "@/models/profil.model";
import AdresseModel from "@/models/adresse.model";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const ProfilModule = {
    namespaced: true,
    state: {
        profil: new ProfilModel(),
        profilLoadingStatus: false,
        adresse: null,
        adresseLoadingStatus: false
    },
    getters: {
        profil: state => state.profil,
        profilLoadingStatus: state => state.profilLoadingStatus,
        adresse: state => state.adresse,
        adresseLoadingStatus: state => state.adresseLoadingStatus
    },
    mutations: {
        LOAD_PROFIL_SUCCESS(state, profil) {
            state.profil = profil
        },
        LOAD_PROFIL_FAILURE(state) {
            state.profile = null
        },
        PROFIL_LOADING_STATUS(state, profilLoadingStatus) {
            state.profilLoadingStatus = profilLoadingStatus
        },
        UPDATE_PROFIL(state, profil) {
            state.profil = profil
        },
        LOAD_ADRESSE_SUCCESS(state, adresse) {
            state.adresse = adresse
        },
        LOAD_ADRESSE_FAILURE(state) {
            state.adresse = null
        },
        ADRESSE_LOADING_STATUS(state, adresseLoadingStatus) {
            state.adresseLoadingStatus = adresseLoadingStatus
        },
        ADD_ADRESSE(state, adresse) {
            state.adresse = adresse
        },
        DELETE_ADRESSE(state) {
            state.adresse = null
        }
    },
    actions: {
        loadProfil({commit}) {
            let endpoint = `${DOMAIN}/profil/`;
            return new Promise((resolve, reject) => {
                commit('PROFIL_LOADING_STATUS', true)
                ApiService.GETData(endpoint).then(r => {
                    commit('LOAD_PROFIL_SUCCESS', Object.assign(new ProfilModel(), r.data))
                    commit('PROFIL_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('LOAD_PROFIL_FAILURE')
                    commit('PROFIL_LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        updateProfil({commit}, payload) {
            let endpoint = `${DOMAIN}/profil/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_PROFIL', Object.assign(new ProfilModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },

        loadAdresse({commit}) {
            let endpoint = `${DOMAIN}/profil/adresse/`;
            return new Promise((resolve, reject) => {
                commit('ADRESSE_LOADING_STATUS', true)
                ApiService.GETData(endpoint).then(r => {
                    commit('LOAD_ADRESSE_SUCCESS', Object.assign(new AdresseModel(), r.data))
                    commit('ADRESSE_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('LOAD_ADRESSE_FAILURE')
                    commit('ADRESSE_LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createAdresse({commit}, payload) {
            let endpoint = `${DOMAIN}/profil/adresses/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_ADRESSE', Object.assign(new AdresseModel(), r.data))
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
                    commit('UPDATE_PROFIL', Object.assign(new AdresseModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteAdresse({commit}) {
            let endpoint = `${DOMAIN}/profil/adresse/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_ADRESSE')
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}