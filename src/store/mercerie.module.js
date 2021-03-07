import MercerieModel from "@/models/mercerie.model";

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
            const index = state.merceries.findIndex(item => item.id === mercerie.id)
            if (index !== -1) {
                state.merceries.splice(index, 1)
            }
        }
    },
    actions: {
        loadMerceries: async function({commit}){
            try {
                commit('LOADING_STATUS', true)
                let merceries = await MercerieModel.fetchMerceries()
                commit('LOAD_MERCERIES_SUCCESS', merceries)
                commit('LOADING_STATUS', false)
                return Promise.resolve()
            } catch (e) {
                commit('LOAD_MERCERIES_FAILURE')
                commit('LOADING_STATUS', false)
                return Promise.reject(e)
            }
        }
    }
}