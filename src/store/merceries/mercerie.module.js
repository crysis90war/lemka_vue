import MercerieModel from "@/models/mercerie.model";
import ApiService from "@/services";

export const mercerieModule = {
    namespaced: true,
    state: {
        merceries: [],
        loadingStatus: false
    },
    getters: {
        mercerie: state => id => {
            return state.merceries.find(mercerie => mercerie.id === id)
        },
        merceries: state => state.merceries,
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        LOAD_MERCERIES_SUCCESS(state, merceries) {
            state.merceries = merceries
        },
        LOAD_MERCERIES_FAILURE(state) {
            state.merceries = []
        },
        LOADING_STATUS(state, newLoadingStatus) {
            state.loadingStatus = newLoadingStatus
        },
        ADD_MERCERIE(state, mercerie) {
            state.merceries.push(mercerie)
        },
        UPDATE_MERCERIE(state, mercerie) {
            const index = state.merceries.findIndex(item => item.id === mercerie.id)
            if (index !== -1) {
                state.merceries.splice(index, 1, mercerie)
            }
        },
        DELETE_MERCERIE(state, mercerie) {
            const index = state.merceries.map(item => item.id).indexOf(mercerie.id)
            if (index !== -1) {
                state.merceries.splice(index, 1)
            }
        }
    },
    actions: {
        loadMerceries: async function({commit}){
            return new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.Merceries.getMerceries().then(res => {
                    commit('LOAD_MERCERIES_SUCCESS', res.data)
                    commit('LOADING_STATUS', false)
                }, error => {
                    commit('LOAD_MERCERIES_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createMercerie: function({commit}, payload) {
            return new Promise((resolve, reject) => {
                ApiService.Merceries.postMercerie(payload).then(res => {
                    commit('ADD_MERCERIE', Object.assign(new MercerieModel(), res.data))
                    resolve(res)
                }, error => {
                    reject(error)
                })
            })
        },
        updateMercerie: function({commit}, payload) {
            return new Promise((resolve, reject) => {
                ApiService.Merceries.putMercerie(payload).then(res => {
                    commit('UPDATE_MERCERIE', Object.assign(new MercerieModel(), res.data))
                    resolve(res)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteMercerie: function ({commit}, mercerie) {
            return new Promise((resolve, reject) => {
                ApiService.Merceries.deleteMercerie(mercerie.id).then(res => {
                    commit('DELETE_MERCERIE', mercerie)
                    resolve(res)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}