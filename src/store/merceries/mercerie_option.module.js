import ApiService from "@/services";
import MercerieOptionModel from "@/models/mercerie_option.model";

export const mercerieOptionModule = {
    namespaced: true,
    state: {
        mercerie_options: [],
        loadingStatus: false
    },
    getters: {
        mercerie_option: (state) => (id) => {
            return state.mercerie_options.find(item => item.id === id)
        },
        mercerie_options: state => state.mercerie_options,
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        LOAD_MERCERIE_OPTIONS_SUCCESS(state, mercerie_options) {
            state.mercerie_options = mercerie_options
        },
        LOAD_MERCERIE_OPTIONS_FAILURE(state) {
            state.mercerie_options = []
        },
        LOADING_STATUS(state, newLoadingStatus) {
            state.loadingStatus = newLoadingStatus
        },
        ADD_MERCERIE_OPTION(state, mercerie_option) {
            state.mercerie_options.push(mercerie_option)
        },
        UPDATE_MERCERIE_OPTION(state, mercerie_option) {
            const index = state.mercerie_options.findIndex(item => item.id === mercerie_option.id)
            if (index !== -1) {
                state.mercerie_options.splice(index, 1, mercerie_option)
            }
        },
        DELETE_MERCERIE_OPTION(state, mercerie_option) {
            const index = state.mercerie_options.map(item => item.id).indexOf(mercerie_option.id)
            if (index !== -1) {
                state.mercerie_options.splice(index, 1)
            }
        }
    },
    actions: {
        loadMercerieOptions: function ({commit}, mercerie_id) {
            return new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.Options.getMercerieOptions(mercerie_id).then(res => {
                    commit('LOAD_MERCERIE_OPTIONS_SUCCESS', res.data)
                    commit('LOADING_STATUS', false)
                    resolve(res)
                }, error => {
                    commit('LOAD_MERCERIE_OPTIONS_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createMercerieOption: function ({commit}, [merceried_id, payload]) {
            return new Promise((resolve, reject) => {
                ApiService.Options.postMercerieOption(merceried_id, payload).then(res => {
                    commit('ADD_MERCERIE_OPTION', Object.assign(new MercerieOptionModel(), res.data))
                    resolve(res)
                }, error => {
                    reject(error)
                })
            })
        },
        updateMercerieOption: function({commit}, [mercerie_id, payload]) {
            return new Promise((resolve, reject) => {
                ApiService.Options.putMercerieOption(mercerie_id, payload).then(res => {
                    commit('UPDATE_MERCERIE_OPTION', Object.assign(new MercerieOptionModel(), res.data))
                    resolve(res)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteMercerieOption: function({commit}, [mercerie_id, mercerie_option]) {
            return new Promise((resolve, reject) => {
                ApiService.Options.deleteMercerieOption(mercerie_id, mercerie_option.id).then(res => {
                    commit('DELETE_MERCERIE_OPTION', mercerie_option)
                    resolve(res)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}