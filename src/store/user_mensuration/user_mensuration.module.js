import ApiService from "@/services/api.service";
import UserMensurationModel from "@/models/user_mensuration/user_mensuration.model";
import LemkaHelpers from "@/helpers";
import MesureModel from "@/models/user_mensuration/mesure.model";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const UserMensurationModule = {
    namespaced: true,
    state: {
        userMensurations: [],
        userMensurationsLoadingStatus: false,

        mesures: [],
        mesuresLoadingStatus: false
    },
    getters: {
        userMensurations: state => state.userMensurations,
        userMensuration: state => id => {
            return state.userMensurations.find(item => item.id === id)
        },
        userMensurationsLoadingStatus: state => state.userMensurationsLoadingStatus,

        mesures: state => state.mesures,
        mesure: state => id => {
            return state.mesures.find(item => item.id === id)
        },
        mesuresLoadingStatus: state => state.mesuresLoadingStatus
    },
    mutations: {
        // region Mensurations
        LOAD_USER_MENSURATIONS_SUCCESS(state, userMensurations) {
            state.userMensurations = userMensurations
        },
        LOAD_USER_MENSURATIONS_FAILURE(state) {
            state.userMensurations = []
        },
        USER_MENSURATIONS_LOADING_STATUS(state, userMensurationsLoadingStatus) {
            state.userMensurationsLoadingStatus = userMensurationsLoadingStatus
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
        // endregion

        // region Mesures
        LOAD_MESURES_SUCCESS(state, mesures) {
            state.mesures = mesures
        },
        LOAD_MESURES_FAILURE(state) {
            state.mesures = []
        },
        MESURES_LOADING_STATUS(state, mesuresLoadingStatus) {
            state.mesuresLoadingStatus = mesuresLoadingStatus
        },
        UPDATE_MESURE(state, mesure) {
            const index = state.mesures.findIndex(item => item.id === mesure.id)
            if (index !== -1) {
                state.mesures.splice(index, 1, mesure)
            }
        }
        // endregion
    },
    actions: {
        // region Mensurations

        loadUserMensurations: function ({commit}) {
            let endpoint = `${DOMAIN}/profil/mensurations/`;
            return new Promise((resolve, reject) => {
                commit('USER_MENSURATIONS_LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('LOAD_USER_MENSURATIONS_SUCCESS', r.data)
                    commit('USER_MENSURATIONS_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('LOAD_USER_MENSURATIONS_FAILURE')
                    commit('USER_MENSURATIONS_LOADING_STATUS', false)
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
        deleteUserMensuration: function ({commit}, userMensuration) {
            let endpoint = `${DOMAIN}/profil/mensurations/${userMensuration.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_USER_MENSURATION', userMensuration)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        },

        // endregion

        // region Mesures
        loadMesures: function ({commit}, userMensurationId) {
            let endpoint = `${DOMAIN}/profil/mensurations/${userMensurationId}/mesures/`;
            return new Promise((resolve, reject) => {
                commit('MESURES_LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('LOAD_MESURES_SUCCESS', r.data)
                    commit('MESURES_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('LOAD_MESURES_FAILURE')
                    commit('MESURES_LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        updateMesure: function({commit}, [userMensurationId, payload]) {
            let endpoint = `${DOMAIN}/profil/mensurations/${userMensurationId}/mesures/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_MESURE', Object.assign(new MesureModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },

        // endregion
    }
}