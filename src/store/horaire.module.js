import ApiService from "@/services";

export const HoraireModule = {
    namespaced: true,
    state: {
        horaires: [],
        loadingStatus: false
    },
    getters: {
        horaire: state => id => {
            return state.horaires.find(item => item.id === id)
        },
        horaires: state => state.horaires,
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        LOAD_HORAIRES_SUCCESS(state, horaires) {
            state.horaires = horaires
        },
        LOAD_HORAIRES_FAILURE(state) {
            state.horaires = []
        },
        LOADING_STATUS(state, newLoadingStatus){
            state.loadingStatus = newLoadingStatus
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
            return new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.Horaires.getHoraires().then(res => {
                    commit('LOAD_HORAIRES_SUCCESS', res.data)
                    commit('LOADING_STATUS', false)
                    resolve(res.data)
                }, error => {
                    commit('LOAD_HORAIRES_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        }
    }
}