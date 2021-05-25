import ApiService from '@/services/api.service';

export const RayonModule = {
    namespaced: true,
    state: {
        rayons: [],
        loadingStatus: false
    },
    getters: {
        rayons: state => state.rayons,
        rayon: state => id => {
            return state.rayons.find(item => item.id === id)
        },
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        SET_RAYONS_SUCCES(state, payload) {
            state.rayons = payload
        },
        SET_RAYONS_FAILURE(state) {
            state.rayons = []
        },
        LOADING_STATUS(state, loadingStatus) {
            state.loadingStatus = loadingStatus
        },
        ADD_RAYON(state, payload) {
            state.rayons.push(payload)
        },
        UPDATE_RAYON(state, payload) {
            const index = state.rayons.findIndex(item => item.id === payload.id)
            if (index !== -1) {
                state.rayons.splice(index, 1, payload)
            }
        },
        DELETE_RAYON(state, payload) {
            const index = state.rayons.findIndex(item => item.id === payload.id)
            if (index !== -1) {
                state.rayons.splice(index, 1)
            }
        }
    },
    actions: {
        loadRayons: async function({commit}) {
            let endpoint = `rayons/`;
            return await new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_RAYONS_SUCCES', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_RAYONS_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createRayon: function({commit}, payload) {
            let endpoint = `rayons/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_RAYON', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateRayon: function({commit}, payload) {
            let endpoint = `rayons/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_RAYON', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteRayon: function({commit}, payload) {
            let endpoint = `rayons/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_RAYON', payload)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}