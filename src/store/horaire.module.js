import ApiService from "@/services/api.service";

export const HoraireModule = {
    namespaced: true,
    state: {
        horaires: [],
        horaireLoadingStatus: false
    },
    getters: {
        horaire: state => id => {
            return state.horaires.find(item => item.id === id)
        },
        horaires: state => state.horaires,
        horaireLoadingStatus: state => state.horaireLoadingStatus
    },
    mutations: {
        LOAD_HORAIRES_SUCCESS(state, horaires) {
            state.horaires = horaires
        },
        LOAD_HORAIRES_FAILURE(state) {
            state.horaires = []
        },
        HORAIRE_LOADING_STATUS(state, horaireLoadingStatus){
            state.horaireLoadingStatus = horaireLoadingStatus
        },
        ADD_HORAIRE(state, horaire) {
            state.horaires.push(horaire)
        },
        UPDATE_HORAIRE(state, horaire) {
            const index = state.horaires.findIndex(item => item.id === horaire.id)
            if (index !== -1) {
                state.horaires.splice(index, 1, horaire)
            }
        },
        DELETE_HORAIRE(state, horaire) {
            const index = state.horaires.map(item => item.id).indexOf(horaire.id)
            if (index !== -1) {
                state.horaires.splice(index, 1)
            }
        }
    },
    actions: {
        loadHoraires({commit}){
            let endpoint = `horaires/`;
            return new Promise((resolve, reject) => {
                commit('HORAIRE_LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('LOAD_HORAIRES_SUCCESS', r.data)
                    commit('HORAIRE_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('LOAD_HORAIRES_FAILURE')
                    commit('HORAIRE_LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        updateHoraire: function({commit}, payload) {
            let endpoint = `horaires/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_HORAIRE', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}