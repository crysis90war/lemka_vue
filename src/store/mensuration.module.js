import MensurationModel from "@/models/user/mensuration.model";
import ApiService from "@/services/api.service";

export const MensurationModule = {
    namespaced: true,
    state: {
        mensurations: [],
        mensurationLoadingStatus: false
    },
    getters: {
        mensurations: state => state.mensurations,
        mensuration: state => id => {
            return state.mensurations.find(mensuration => mensuration.id === id)
        },
        mensurationLoadingStatus: state => state.mensurationLoadingStatus,
    },
    mutations: {
        LOAD_MENSURATIONS_SUCCESS(state, mensurations) {
            state.mensurations = mensurations
        },
        LOAD_MENSURATIONS_FAILURE(state) {
            state.mensurations = []
        },
        MENSURATIONS_LOADING_STATUS(state, mensurationLoadingStatus) {
            state.mensurationLoadingStatus = mensurationLoadingStatus
        },
        ADD_MENSURATION(state, newMensuration) {
            state.mensurations.push(newMensuration)
        },
        UPDATE_MENSURATION(state, mensuration) {
            const index = state.mensurations.findIndex(c => c.id === mensuration.id)
            if (index !== -1) {
                state.mensurations.splice(index, 1, mensuration)
            }
        },
        DELETE_MENSURATION(state, mensuration) {
            const index = state.mensurations.map(item => item.id).indexOf(mensuration.id)
            if (index !== -1) {
                state.mensurations.splice(index, 1)
            }
        }
    },
    actions: {
        loadMensurations: function ({commit}) {
            let endpoint = `mensurations/`;
            return new Promise((resolve, reject) => {
                commit('MENSURATIONS_LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('LOAD_MENSURATIONS_SUCCESS', r.data)
                    commit('MENSURATIONS_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('LOAD_MENSURATIONS_FAILURE')
                    commit('MENSURATIONS_LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createMensuration: function ({commit}, payload) {
            let endpoint = `mensurations/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_MENSURATION', Object.assign(new MensurationModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateMensuration: function({commit}, payload) {
            let endpoint = `mensurations/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_MENSURATION', Object.assign(new MensurationModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteMensuration: function({commit}, mensuration) {
            let endpoint = `mensurations/${mensuration.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_MENSURATION', mensuration)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}