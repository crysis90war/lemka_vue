import LemkaHelpers from "@/helpers";
import ApiService from "@/services/api.service";
import ProfilModel from "@/models/profil.model";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const ProfilModule = {
    namespaced: true,
    state: {
        profil: new ProfilModel(),
        loadingStatus: false,
    },
    getters: {
        profil: state => state.profil,
        loadingStatus: state => state.loadingStatus,
    },
    mutations: {
        SET_PROFIL_SUCCESS(state, payload) {
            Object.assign(state.profil, payload)
        },
        SET_PROFIL_FAILURE(state) {
            state.profile = new ProfilModel()
        },
        LOADING_STATUS(state, loadingStatus) {
            state.loadingStatus = loadingStatus
        },
        UPDATE_PROFIL(state, profil) {
            state.profil = profil
        }
    },
    actions: {
        loadProfil: function({commit}) {
            let endpoint = `${DOMAIN}/profil/`;
            return new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETData(endpoint).then(r => {
                    commit('SET_PROFIL_SUCCESS', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_PROFIL_FAILURE')
                    commit('LOADING_STATUS', false)
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

        updateProfilImage({commit}, payload) {
            let endpoint = `${DOMAIN}/profil/`;
            return new Promise((resolve, reject) => {
                ApiService.PATCHDate(endpoint, payload).then(r => {
                    commit('UPDATE_PROFIL', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}