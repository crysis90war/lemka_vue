import ApiService from "@/services/api.service";
import UserMensurationModel from "@/models/user_mensuration/user_mensuration.model";
import LemkaHelpers from "@/helpers";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const UserMensurationModule = {
    namespaced: true,
    state: {
        userMensurations: [],
        loadingStatus: false,

        mesures: [],
        mesuresLoadingStatus: false
    },
    getters: {
        userMensurations: state => state.userMensurations,
        userMensuration: state => id => {
            return state.userMensurations.find(item => item.id === id)
        },
        loadingStatus: state => state.loadingStatus,
    },
    mutations: {
        SET_USER_MENSURATIONS_SUCCESS(state, userMensurations) {
            state.userMensurations = userMensurations
        },
        SET_USER_MENSURATIONS_FAILURE(state) {
            state.userMensurations = []
        },
        LOADING_STATUS(state, loadingStatus) {
            state.loadingStatus = loadingStatus
        },
        ADD_USER_MENSURATION(state, userMensuration) {
            state.userMensurations.push(userMensuration)
        },
        UPDATE_USER_MENSURATION(state, userMensuration) {
            const index = state.userMensurations.findIndex(item => item.id === userMensuration.id)
            if (index !== -1) {
                state.userMensurations.splice(index, 1, userMensuration)
            }
        },
        DELETE_USER_MENSURATION(state, userMensuration) {
            const index = state.userMensurations.map(item => item.id).indexOf(userMensuration.id)
            if (index !== -1) {
                state.userMensurations.splice(index, 1)
            }
        },
        UPDATE_MESURE(state, [user_mensuration_id, payload]) {
            const userMensurationIndex = state.userMensurations.findIndex(item => item.id === user_mensuration_id)
            if (userMensurationIndex !== -1) {
                const mesureIndex = state.userMensurations[userMensurationIndex].mesures.findIndex(item => item.id === payload.id)
                if (mesureIndex !== -1) {
                    state.userMensurations[userMensurationIndex].mesures.splice(mesureIndex, 1, payload)
                }
            }
        }
    },
    actions: {
        loadUserMensurations: function ({commit}) {
            let endpoint = `${DOMAIN}/profil/mensurations/`;
            return new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_USER_MENSURATIONS_SUCCESS', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_USER_MENSURATIONS_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createUserMensuration: function ({commit}, payload) {
            let endpoint = `${DOMAIN}/profil/mensurations/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_USER_MENSURATION', Object.assign(new UserMensurationModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateUserMensuration: function ({commit}, payload) {
            let endpoint = `${DOMAIN}/profil/mensurations/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_USER_MENSURATION', Object.assign(new UserMensurationModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteUserMensuration: function ({commit}, payload) {
            let endpoint = `${DOMAIN}/profil/mensurations/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_USER_MENSURATION', payload)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        },
        updateMesure: function({commit}, [userMensurationId, payload]) {
            let endpoint = `${DOMAIN}/profil/mensurations/${userMensurationId}/mesures/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_MESURE', [userMensurationId, r.data])
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}