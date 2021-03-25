import ApiService from "@/services/api.service";
import LemkaHelpers from "@/helpers";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const DemandeDevisModule = {
    namespaced: true,
    state: {
        demandesDevis: [],
        demandesDevisLoadingStatus: false,

        adminDD: [],
        adminDDLoadingStatus: false
    },
    getters: {
        demandeDevis: state => id => {
            return state.demandesDevis.find(item => item.id === id)
        },
        demandesDevis: state => state.demandesDevis,
        demandesDevisEnRedaction: state => {
            return state.demandesDevis.filter(item => item.est_soumis === false && item.est_traite === false)
        },
        demandeDevisSoumis: state => {
            return state.demandesDevis.filter(item => item.est_soumis === true && item.est_traite === false)
        },
        demandeDevisTraite: state => {
            return state.demandesDevis.filter(item => item.est_traite === true)
        },

        demandesDevisLoadingStatus: state => state.demandesDevisLoadingStatus,

        adminDD: state => state.adminDD,
        adminDDLoadingStatus: state => state.adminDDLoadingStatus
    },
    mutations: {
        LOAD_DEMANDES_DEVIS_SUCCESS(state, demandesDevis) {
            state.demandesDevis = demandesDevis
        },
        LOAD_DEMANDES_DEVIS_FAILURE(state) {
            state.demandesDevis = []
        },
        DEMANDE_DEVIS_LOADING_STATUS(state, demandesDevisLoadingStatus) {
            state.demandesDevisLoadingStatus = demandesDevisLoadingStatus
        },
        ADD_DEMANDE_DEVIS(state, demandeDevis) {
            state.demandesDevis.push(demandeDevis)
        },
        UPDATE_DEMANDE_DEVIS(state, demandeDevis) {
            const index = state.demandesDevis.findIndex(item => item.id === demandeDevis.id)
            if (index !== -1) {
                state.demandesDevis.splice(index, 1, demandeDevis)
            }
        },
        DELETE_DEMANDE_DEVIs(state, demandeDevis) {
            const index = state.demandesDevis.map(item => item.id).indexOf(demandeDevis.id)
            if (index !== -1) {
                state.demandesDevis.splice(index, 1)
            }
        },

        SET_ADMINDD_SUCCESS(state, payload) {
            state.adminDD = payload
        },
        SET_ADMINDD_FAILURE(state) {
            state.adminDD = []
        },
        ADMINDD_LOADING_STATUS(state, loadingStatus) {
            state.adminDDLoadingStatus = loadingStatus
        },
        ADD_ADMINDD(state, payload) {
            state.adminDD.push(payload)
        }
    },
    actions: {
        loadDemandeDevis({commit}) {
            let endpoint = `${DOMAIN}/profil/demandes_devis/`;
            return new Promise((resolve, reject) => {
                commit('DEMANDE_DEVIS_LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('LOAD_DEMANDES_DEVIS_SUCCESS', r.data)
                    commit('DEMANDE_DEVIS_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('LOAD_DEMANDES_DEVIS_FAILURE')
                    commit('DEMANDE_DEVIS_LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createDemandeDevis({commit}, payload) {
            let endpoint = `${DOMAIN}/profil/demandes_devis/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_DEMANDE_DEVIS', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateDemandeDevis({commit}, payload) {
            let endpoint = `${DOMAIN}/profil/demandes_devis/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_DEMANDE_DEVIS', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },

        loadAdminDD: async function({commit}) {
            let endpoint = `${DOMAIN}/demandedevisadmin/`;
            return new Promise((resolve, reject) => {
                commit('ADMINDD_LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_ADMINDD_SUCCESS', r.data)
                    commit('ADMINDD_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_ADMINDD_FAILURE')
                    commit('ADMINDD_LOADING_STATUS', false)
                    reject(error)
                })
            })
        }
    }
}