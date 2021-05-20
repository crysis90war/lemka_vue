import ApiService from "@/services/api.service";

export const MercerieModule = {
    namespaced: true,
    state: {
        merceries: [],
        loadingStatus: false,

        globalMerceries: [],
        globalMerceriesLoadingStatus: false,
    },
    getters: {
        merceries: state => state.merceries,
        mercerie: state => id => {
            return state.merceries.find(item => item.id === id)
        },
        loadingStatus: state => state.loadingStatus,

        globalMerceries: state => state.globalMerceries,
        globalMercerie: state => id => {
            return state.globalMerceries.find(item => item.id === id)
        },
        globalMerceriesLoadingStatus: state => state.globalMerceriesLoadingStatus,
    },
    mutations: {
        SET_MERCERIES_SUCCESS(state, merceries) {
            state.merceries = merceries
        },
        SET_MERCERIES_FAILURE(state) {
            state.merceries = []
        },
        LOADING_STATUS(state, merceriesLoadingStatus) {
            state.loadingStatus = merceriesLoadingStatus
        },
        ADD_MERCERIE(state, mercerie) {
            state.merceries.unshift(mercerie)
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
        },
        ADD_CATACTERISTIQUE(state, [mercerie_id, payload]) {
            const index = state.merceries.findIndex(item => item.id === mercerie_id)
            if (index !== -1) {
                state.merceries[index].caracteristiques.push(payload)
            }
        },
        UPDATE_CARACTERISTIQUE(state, [mercerie_id, payload]) {
            const mercerieIndex = state.merceries.findIndex(item => item.id === mercerie_id)
            if (mercerieIndex !== -1) {
                const catacteristiqueIndex = state.merceries[mercerieIndex].caracteristiques.findIndex(item => item.id === payload.id)
                if (catacteristiqueIndex !== -1) {
                    state.merceries[mercerieIndex].caracteristiques.splice(catacteristiqueIndex, 1, payload)
                }
            }
        },
        DELETE_CARACTERISTIQUE(state, [mercerie_id, payload]) {
            const mercerieIndex = state.merceries.findIndex(item => item.id === mercerie_id)
            if (mercerieIndex !== -1) {
                const catacteristiqueIndex = state.merceries[mercerieIndex].caracteristiques.findIndex(item => item.id === payload.id)
                if (catacteristiqueIndex !== -1) {
                    state.merceries[mercerieIndex].caracteristiques.splice(catacteristiqueIndex, 1)
                }
            }
        },
        ADD_IMAGE(state, [mercerie_id, payload]) {
            const index = state.merceries.map(item => item.id).indexOf(mercerie_id)
            if (index !== -1) {
                state.merceries[index].images.push(payload)
                state.merceries[index].images_count++
            }
        },
        DELETE_IMAGE(state, [mercerie_id, payload]) {
            const mercerieIndex = state.merceries.findIndex(item => item.id === mercerie_id)
            if (mercerieIndex !== -1) {
                const imageIndex = state.merceries[mercerieIndex].images.findIndex(item => item.id === payload.id)
                if (imageIndex !== -1) {
                    state.merceries[mercerieIndex].images.splice(imageIndex, 1)
                    state.merceries[mercerieIndex].images_count--
                }
            }
        },

        SET_GLOBAL_MERCERIES_SUCCESS(state, payload) {
            state.globalMerceries = payload
        },
        SET_GLOBAL_MERCERIES_FAILURE(state) {
            state.globalMerceries = []
        },
        SET_GLOBAL_MERCERIES_LOADING_STATUS(state, loadingStatus) {
            state.globalMerceriesLoadingStatus = loadingStatus
        }
    },
    actions: {
        loadGlobalMerceries: function ({commit}, params = "") {
            let endpoint = `public/merceries/${params}`;
            return new Promise((resolve, reject) => {
                commit('SET_GLOBAL_MERCERIES_LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_GLOBAL_MERCERIES_SUCCESS', r.data)
                    commit('SET_GLOBAL_MERCERIES_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_GLOBAL_MERCERIES_FAILURE')
                    commit('SET_GLOBAL_MERCERIES_LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        loadMerceries: async function ({commit}) {
            let endpoint = `merceries/`;
            return await new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_MERCERIES_SUCCESS', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_MERCERIES_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createMercerie: function ({commit}, payload) {
            let endpoint = `merceries/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_MERCERIE', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateMercerie: function ({commit}, payload) {
            let endpoint = `merceries/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_MERCERIE', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteMercerie: function ({commit}, mercerie) {
            let endpoint = `merceries/${mercerie.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_MERCERIE', mercerie)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        },
        createCharacteristique: function ({commit}, [mercerie_id, payload]) {
            let endpoint = `merceries/${mercerie_id}/characteristiques/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_CATACTERISTIQUE', [mercerie_id, r.data])
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateCharacteristique: function ({commit}, [mercerie_id, payload]) {
            let endpoint = `merceries/${mercerie_id}/characteristiques/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_CARACTERISTIQUE', [mercerie_id, r.data])
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteCharacteristique: function ({commit}, [mercerie_id, payload]) {
            let endpoint = `merceries/${mercerie_id}/characteristiques/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_CARACTERISTIQUE', [mercerie_id, payload])
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        },
        createImage: function ({commit}, [mercerie_id, payload]) {
            let endpoint = `merceries/${mercerie_id}/images/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_IMAGE', [mercerie_id, r.data])
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteImage: function({commit}, [mercerie_id, payload]) {
            let endpoint = `merceries/${mercerie_id}/images/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_IMAGE', [mercerie_id, payload])
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}