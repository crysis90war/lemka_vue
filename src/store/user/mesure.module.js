import ApiService from "@/services/api.service";

export const MesureModule = {
    namespaced: true,
    state: {
        mesures: [],
        loadingStatus: false
    },
    getters: {
        mesures: state => state.mesures,
        mesure: state => id => {
            return state.mesures.find(item => item.id === id)
        },
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        SET_MESURES_SUCCESS(state, mesures) {
            state.mesures = mesures
        },
        SET_MESURES_FAILURE(state) {
            state.mesures = []
        },
        LOADING_STATUS(state, loadingStatus) {
            state.loadingStatus = loadingStatus
        },
        ADD_MESURE(state, payload) {
            state.mesures.push(payload)
        },
        UPDATE_MESURE(state, mesure) {
            const index = state.mesures.findIndex(item => item.id === mesure.id)
            if (index !== -1) {
                state.mesures.splice(index, 1, mesure)
            }
        }
    },
    actions: {
        loadMesures: function ({commit}, userMensurationId) {
            let endpoint = `profil/mensurations/${userMensurationId}/mesures/`;
            return new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_MESURES_SUCCESS', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('LOAD_MESURES_FAILURE')
                    commit('SET_MESURES_FAILURE', false)
                    reject(error)
                })
            })
        },
        updateMesure: function({commit}, [userMensurationId, payload]) {
            let endpoint = `profil/mensurations/${userMensurationId}/mesures/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_MESURE', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
    }
}