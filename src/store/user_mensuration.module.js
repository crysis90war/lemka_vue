import ApiService from "@/services";
import UserMensurationModel from "@/models/user_mensuration.model";

export const UserMensurationModule = {
    namespaced: true,
    state: {
        user_mensurations: [],
        loadingStatus: false
    },
    getters: {
        user_mensuration: state => id => {
            return state.user_mensurations.find(item => item.id === id)
        },
        user_mensurations: state => state.user_mensurations,
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        LOAD_USER_MENSURATIONS_SUCCESS(state, user_mensurations) {
            state.user_mensurations = user_mensurations
        },
        LOAD_USER_MENSURATIONS_FAILURE(state) {
            state.user_mensurations = []
        },
        LOADING_STATUS(state, newLoadingStatus) {
            state.loadingStatus = newLoadingStatus
        },
        ADD_USER_MENSURATION(state, user_mensuration) {
            state.user_mensurations.push(user_mensuration)
        },
        UPDATE_USER_MENSURATION(state, user_mensuration) {
            const index = state.user_mensurations.findIndex(item => item.id === user_mensuration.id)
            if (index !== -1) {
                state.user_mensurations.splice(index, 1, user_mensuration)
            }
        },
        DELETE_USER_MENSURATION(state, user_mensuration) {
            const index = state.user_mensurations.map(item => item.id).indexOf(user_mensuration.id)
            if (index !== -1) {
                state.user_mensurations.splice(index, 1)
            }
        }
    },
    actions: {
        loadUserMensurations: function({commit}) {
            return new Promise(((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.UserMensurations.getUserMensurationsList().then(res => {
                    commit('LOAD_USER_MENSURATIONS_SUCCESS', res.data)
                    commit('LOADING_STATUS', false)
                    resolve(res)
                }, error => {
                    commit('LOAD_USER_MENSURATIONS_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            }))
        },
        createUserMensuration: function({commit}, payload) {
            return new Promise(((resolve, reject) => {
                ApiService.UserMensurations.postUserMensuration(payload).then(res => {
                    commit('ADD_USER_MENSURATION', Object.assign(new UserMensurationModel(), res.data))
                    resolve(res)
                }, error => {
                    reject(error)
                })
            }))
        },
        updateUserMensuration: function({commit}, payload) {
            return new Promise(((resolve, reject) => {
                ApiService.UserMensurations.putUserMensuration(payload).then(res => {
                    commit('UPDATE_USER_MENSURATION', Object.assign(new UserMensurationModel(), res.data))
                    resolve(res)
                }, error => {
                    reject(error)
                })
            }))
        },
        deleteUserMensuration: function({commit}, user_mensuration) {
            return new Promise(((resolve, reject) => {
                ApiService.UserMensurations.deleteUserMensurations(user_mensuration.id).then(res => {
                    commit('DELETE_USER_MENSURATION', user_mensuration)
                    resolve(res)
                }, error => {
                    reject(error)
                })
            }))
        }
    }
}