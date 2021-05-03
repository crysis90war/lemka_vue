import ApiService from "@/services/api.service";
import LemkaHelpers from "@/helpers";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const TypeServiceModule = {
    namespaced: true,
    state: {
        typeServices: [],
        loadingStatus: false
    },
    getters: {
        typeServices: state => state.typeServices,
        typeService: state => id => {
            return state.typeServices.find(item => item.id === id)
        },
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        SET_TYPE_SERVICES_SUCCESS(state, payload) {
            state.typeServices = payload
        },
        SET_TYPE_SERVICES_FAILURE(state) {
            state.typeServices = []
        },
        LOADING_STATUS(state, loadingStatus) {
            state.loadingStatus = loadingStatus
        },
        ADD_TYPE_SERVICE(state, payload) {
            state.typeServices.push(payload)
        },
        UPDATE_TYPE_SERVICE(state, payload) {
            const index = state.typeServices.findIndex(item => item.id === payload.id)
            if (index !== -1) {
                state.typeServices.splice(index, 1, payload)
            }
        },
        DELETE_TYPE_SERVICE(state, payload) {
            const index = state.typeServices.findIndex(item => item.id === payload.id)
            if (index !== -1) {
                state.typeServices.splice(index, 1)
            }
        }
    },
    actions: {
        loadTypeServices: async function ({commit}) {
            let endpoint = `${DOMAIN}/types_services/`;
            return await new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_TYPE_SERVICES_SUCCESS', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_TYPE_SERVICES_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createTypeService: function ({commit}, payload) {
            let endpoint = `${DOMAIN}/types_services/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_TYPE_SERVICE', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateTypeService: function ({commit}, payload) {
            let endpoint = `${DOMAIN}/types_services/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_TYPE_SERVICE', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteTypeService: function ({commit}, payload) {
            let endpoint = `${DOMAIN}/types_services/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_TYPE_SERVICE', payload)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}