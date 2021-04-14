import ApiService from '@/services/api.service'
import LemkaHelpers from "@/helpers";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const DetailModule = {
    namespaced: true,
    state: {
        details: [],
        loadingStatus: false
    },
    getters: {
        details: state => state.details,
        detail: state => id => {
            return state.details.find(item => item.id === id)
        },
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        SET_DETAILS_SUCCESS(state, payload) {
            state.details = payload
        },
        SET_DETAILS_FAILURE(state) {
            state.details = []
        },
        LOADING_STATUS(state, loadingStatus) {
            state.loadingStatus = loadingStatus
        },
        ADD_DETAIL(state, payload) {
            state.details.push(payload)
        },
        UPDATE_DETAIL(state, payload) {
            const index = state.details.findIndex(item => item.id === payload.id)
            if (index !== -1) {
                state.details.splice(index, 1, payload)
            }
        },
        DELETE_DETAIL(state, detail) {
            const index = state.details.map(item => item.id).indexOf(detail.id)
            if (index !== -1) {
                state.details.splice(index, 1)
            }
        }
    },
    actions: {
        loadDetails: async function({commit}, devis_id) {
            let endpoint = `${DOMAIN}/details/${devis_id}/`;
            return await new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_DETAILS_SUCCESS', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_DETAILS_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createDetail: function({commit}, [numero_devis, payload]) {
            let endpoint = `${DOMAIN}/devis/${numero_devis}/details/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_DETAIL', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateDetail: function({commit}, [numero_devis, payload]) {
            let endpoint = `${DOMAIN}/devis/${numero_devis}/details/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_DETAIL', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteDetail: function({commit}, [numero_devis, payload]) {
            let endpoint = `${DOMAIN}/devis/${numero_devis}/details/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_DETAIL', payload)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}