import ApiService from '@/services/api.service';
import LemkaHelpers from "@/helpers";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const SectionModule = {
    namespaced: true,
    state: {
        sections: [],
        loadingStatus: false
    },
    getters: {
        sections: state => state.sections,
        section: state => id => {
            return state.sections.find(item => item.id === id)
        },
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        SET_SECTIONS_SUCCESS(state, payload) {
            state.sections = payload
        },
        SET_SECTIONS_FAILURE(state) {
            state.sections = []
        },
        LOADING_STATUS(state, loadingStatus) {
            state.loadingStatus = loadingStatus
        },
        ADD_SECTION(state, payload) {
            state.sections.push(payload)
        },
        UPDATE_SECTION(state, payload) {
            const index = state.sections.findIndex(item => item.id === payload.id)
            if (index !== -1) {
                state.sections.splice(index, 1, payload)
            }
        },
        DELETE_SECTION(state, payload) {
            const index = state.sections.map(item => item.id).findIndex(payload.id)
            if (index !== -1) {
                state.sections.splice(index, 1)
            }
        }
    },
    actions: {
        loadSections: async function({commit}) {
            let endpoint = `${DOMAIN}/sections/`;
            return await new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_SECTIONS_SUCCESS', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_SECTIONS_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createSection: function({commit}, payload) {
            let endpoint = `${DOMAIN}/rayons/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_SECTION', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateSection: function({commit}, payload) {
            let endpoint = `${DOMAIN}/rayons/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_SECTION', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteSection: function({commit}, payload) {
            let endpoint = `${DOMAIN}/rayons/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_SECTION', payload)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}