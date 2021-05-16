import ApiService from "@/services/api.service";
import LemkaHelpers from "@/helpers";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const RendezVousModule = {
    namespaced: true,
    state: {
        rendezvouss: [],
        loadingStatus: false,
        available_hours: {
            message: "",
            available_hours: []
        },
        adminRendezVouss: [],
    },
    getters: {
        rendezvouss: state => state.rendezvouss,
        rendezvous: state => id => {
            return state.rendezvouss.find(item => item.id === id)
        },
        loadingStatus: state => state.loadingStatus,
        available_hours: state => state.available_hours,
        adminRendezVouss: state => state.adminRendezVouss
    },
    mutations: {
        SET_RENDEZ_VOUS_SUCCESS(state, payload) {
          state.rendezvouss = payload
        },
        SET_RENDEZ_VOUS_FAILURE(state) {
          state.rendezvouss = []
        },
        LOADING_STATUS(state, loadingStatus) {
          state.loadingStatus = loadingStatus
        },
        ADD_RENDEZ_VOUS(state, payload) {
          state.rendezvouss.unshift(payload)
        },
        UPDATE_RENDEZ_VOUS(state, payload) {
            const index = state.rendezvouss.findIndex(item => item.id === payload.id)
            if (index !== -1) {
                state.rendezvouss.splice(index, 1, payload)
            }
        },
        SET_AVAILABLE_HOURS_SUCCESS(state, payload) {
            state.available_hours = payload
        },
        SET_AVAILABLE_HOURS_FAILURE(state) {
            state.available_hours = {
                message: "",
                available_hours: []
            }
        },
        SET_ADMIN_RDV_SUCCESS(state, payload) {
            state.adminRendezVouss = payload
        },
        SET_ADMIN_RDV_FAILURE(state) {
            state.adminRendezVouss = []
        }
    },
    actions: {
        loadRendezVous: async function({commit}) {
            let endpoint = `${DOMAIN}/profil/rendez-vous/`;
            return await new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_RENDEZ_VOUS_SUCCESS', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_RENDEZ_VOUS_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createRendezVous: function({commit}, payload) {
            let endpoint = `${DOMAIN}/profil/rendez-vous/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_RENDEZ_VOUS', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        annulerRendezVous: function({commit}, payload) {
            let endpoint = `${DOMAIN}/profil/rendez-vous/${payload.id}/`;
            return new Promise((resolve, reject) => {
                let item = {
                    'est_annule': !payload.est_annule
                }
                ApiService.PUTData(endpoint, item).then(r => {
                    commit('UPDATE_RENDEZ_VOUS', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error
                    )
                })
            })
        },
        loadHeuresDispo: async function({commit}, date) {
            let endpoint = `${DOMAIN}/profil/available-hours/${date}/`;
            return await new Promise((resolve, reject) => {
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_AVAILABLE_HOURS_SUCCESS', r.data)
                    resolve(r.data)
                }, error => {
                    commit('SET_AVAILABLE_HOURS_FAILURE')
                    reject(error)
                })
            })
        },
        loadAdminRDV: async function({commit}) {
            let endpoint = `${DOMAIN}/rendezvous/`;
            return await new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_ADMIN_RDV_SUCCESS', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_ADMIN_RDV_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        }
    }
}