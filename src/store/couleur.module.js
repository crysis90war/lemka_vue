import ApiService from "@/services";

export const couleurModule = {
    namespaced: true,
    state: {
        couleurs: [],
        loadingStatus: false
    },
    getters: {
        couleur: state => id => {
            return state.couleurs.find(couleur => couleur.id === id)
        },
        couleurs: state => state.couleurs,
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        LOAD_COULEURS_SUCCESS(state, couleurs) {
            state.couleurs = couleurs
        },
        LOAD_COULEURS_FAILURE(state) {
            state.couleurs = []
        },
        LOADING_STATUS(state, newLoadingStatus) {
            state.loadingStatus = newLoadingStatus
        },
        ADD_COULEUR(state, couleur) {
            state.couleurs.push(couleur)
        },
        UPDATE_COULEUR(state, couleur) {
            const index = state.couleurs.findIndex(c => c.id === couleur.id)
            if (index !== -1) {
                state.couleurs.splice(index, 1, couleur)
            }
        },
        DELETE_COULEUR(state, couleur) {
            const index = state.couleurs.findIndex(c => c.id === couleur.id)
            if (index !== -1) {
                state.couleurs.splice(index, 1)
            }
        }
    },
    actions: {
        loadCouleurs: function({commit}) {
            return new Promise(((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.Couleurs.getCouleurs().then(res => {
                    commit('LOAD_COULEURS_SUCCESS', res.data)
                    commit('LOADING_STATUS', false)
                    resolve(res)
                }, error => {
                    commit('LOAD_COULEURS_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            }))
        },

        createCouleur: function ({commit}, payload) {
            return new Promise(((resolve, reject) => {
                ApiService.Couleurs.postCouleur(payload).then(res => {
                    commit('ADD_COULEUR', res.data)
                    resolve(res)
                }, error => {
                    reject(error)
                })
            }))
        },

        updateCouleur: function({commit}, payload) {
            return new Promise(((resolve, reject) => {
                ApiService.Couleurs.putCouleur(payload).then(res => {
                    commit('UPDATE_COULEUR', res.data)
                    resolve(res)
                }, error => {
                    reject(error)
                })
            }))
        },

        deleteCouleur: function({commit}, couleur) {
            return new Promise(((resolve, reject) => {
                ApiService.Couleurs.deleteCouleur(couleur.id).then(res => {
                    commit('DELETE_COULEUR', couleur)
                    resolve(res)
                }, error => {
                    reject(error)
                })
            }))
        }
    }
}