import ApiService from "@/services/api.service";

export const TVAModule = {
    namespaced: true,
    state: {
        tvas: [],
        loadingStatus: false
    },
    getters: {
        tvas: state => state.tvas,
        tva: state => id => {
            return state.tvas.find(item => item.id === id)
        },
        loadingStatus: state => state.loadingStatus,
    },
    mutations: {
        SET_TVAS_SUCCESS(state, payload) {
            state.tvas = payload
        },
        SET_TVAS_FAILURE(state) {
            state.tvas = []
        },
        LOADING_STATUS(state, loadingStatus) {
            state.loadingStatus = loadingStatus
        },
        ADD_TVA(state, payload) {
            state.tvas.push(payload)
        },
        UPDATE_TVA(state, payload) {
            const index = state.tvas.findIndex(item => item.id === payload.id)
            if (index !== -1) {
                state.tvas.splice(index, 1, payload)
            }
        },
        DELETE_TVA(state, payload) {
            const index = state.tvas.map(item => item.id).indexOf(payload.id)
            if (index !== -1) {
                state.tvas.splice(index, 1)
            }
        }
    },
    actions: {
        loadTvas({commit}) {
            let endpoint = `tva/`;
            return new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_TVAS_SUCCESS', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_TVAS_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        }
    }
}