import ApiService from "@/services/api.service";
import LemkaHelpers from "@/helpers";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const DevisModule = {
    namespaced: true,
    state: {
        deviss: [],
        devissLoadingStatus: false,
    },
    getters: {
        deviss: state => state.deviss,
        devis: state => numero_devis => {
            return state.deviss.find(item => item.numero_devis === numero_devis)
        },
        devissLoadingStatus: state => state.devissLoadingStatus
    },
    mutations: {
        SET_DEVISS_SUCCESS(state, payload) {
            state.deviss = payload
        },
        SET_DEVISS_FAILURE(state) {
            state.deviss = []
        },
        LOADING_STATUS(state, payload) {
            state.devissLoadingStatus = payload
        },
        ADD_DEVIS(state, payload) {
            state.deviss.push(payload)
        },
        UPDATE_DEVIS(state, payload) {
            const index = state.deviss.findIndex(item => item.id === payload.id)
            if (index !== -1) {
                state.deviss.splice(index, 1, payload)
            }
        },
        DELETE_DEVIS(state, payload) {
            const index = state.deviss.map(item => item.id).indexOf(payload.id)
            if (index !== -1) {
                state.deviss.splice(index, 1)
            }
        }
    },
    actions: {
        loadDevis: function({commit}) {
            let endpoint = `${DOMAIN}/devis/`;
            return new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_DEVISS_SUCCESS', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_DEVISS_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        }
    }
}