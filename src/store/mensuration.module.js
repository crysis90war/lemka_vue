import MensurationModel from "@/models/mensuration.model";
import ApiService from "@/services";

export const mensurationModule = {
    namespaced: true,
    state: {
        mensurations: [],
        loadingStatus: false
    },
    getters: {
        mensuration: state => id => {
            return state.mensurations.find(mensuration => mensuration.id === id)
        },
        mensurations: state => state.mensurations,
        loadingStatus: state => state.loadingStatus,
    },
    mutations: {
        LOAD_MENSURATIONS_SUCCESS(state, mensurations) {
            state.mensurations = mensurations
        },
        LOAD_MENSURATIONS_FAILURE(state) {
            state.mensurations = []
        },
        LOADING_STATUS(state, newLoadingStatus) {
            state.loadingStatus = newLoadingStatus
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
            return new Promise(((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.Mensurations.getMensurations().then(res => {
                    commit('LOAD_MENSURATIONS_SUCCESS', res.data)
                    commit('LOADING_STATUS', false)
                    resolve(res)
                }, error => {
                    commit('LOAD_MENSURATIONS_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            }))
        },
        createMensuration: function ({commit}, payload) {
            return new Promise(((resolve, reject) => {
                ApiService.Mensurations.postMensuration(payload).then(res => {
                    commit('ADD_MENSURATION', Object.assign(new MensurationModel(), res.data))
                    resolve(res)
                }, error => {
                    reject(error)
                })
            }))
        },
        updateMensuration: function({commit}, payload) {
            return new Promise(((resolve, reject) => {
                ApiService.Mensurations.putMensuration(payload).then(res => {
                    commit('UPDATE_MENSURATION', Object.assign(new MensurationModel(), res.data))
                    resolve(res)
                }, error => {
                    reject(error)
                })
            }))
        },
        deleteMensuration: function({commit}, mensuration) {
            return new Promise(((resolve, reject) => {
                ApiService.Mensurations.deleteMensuration(mensuration.id).then(res => {
                    commit('DELETE_MENSURATION', mensuration)
                    resolve(res)
                }, error => {
                    reject(error)
                })
            }))
        }
    }
}