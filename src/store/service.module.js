import ApiService from "@/services/api.service";

export const ServiceModule = {
    namespaced: true,
    state: {
        services: [],
        loadingStatus: false
    },
    getters: {
        services: state => state.services,
        service: state => id => {
            return state.services.find(item => item.id === id)
        },
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        SET_SERVICES_SUCCESS(state, payload) {
            state.services = payload
        },
        SET_SERVICES_FAILURE(state) {
            state.services = []
        },
        LOADING_STATUS(state, loadingStatus) {
            state.loadingStatus = loadingStatus
        },
        ADD_SERVICE(state, payload) {
            state.services.push(payload)
        },
        UPDATE_SERVICE(state, payload) {
            const index = state.services.findIndex(item => item.id === payload.id)
            if (index !== -1) {
                state.services.splice(index, 1, payload)
            }
        },
        DELETE_SERVICE(state, payload) {
            const index = state.services.findIndex(item => item.id === payload.id)
            if (index !== -1) {
                state.services.splice(index, 1)
            }
        }
    },
    actions: {
        loadServices: async function ({commit}) {
            let endpoint = `services/`;
            return await new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_SERVICES_SUCCESS', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_SERVICES_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createService: function ({commit}, payload) {
            let endpoint = `services/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_SERVICE', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateService: function ({commit}, payload) {
            let endpoint = `services/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_SERVICE', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteService: function ({commit}, payload) {
            let endpoint = `services/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_SERVICE', payload)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}