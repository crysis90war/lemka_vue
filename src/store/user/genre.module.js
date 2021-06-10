import GenreModel from "@/models/user/genre.model";
import ApiService from "@/services/api.service";

export const GenreModule = {
    namespaced: true,
    state: {
        genres: [],
        loadingStatus: false
    },
    getters: {
        genres: state => state.genres,
        genre: state => id => {
            return state.genres.find(genre => genre.id === id)
        },
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        SET_GENRES_SUCCESS(state, payload) {
            state.genres = payload
        },
        SET_GENRES_FAILURE(state) {
            state.genres = []
        },
        LOADING_STATUS(state, loadingStatus) {
            state.loadingStatus = loadingStatus
        },
        ADD_GENRE(state, payload) {
            state.genres.push(payload)
        },
        UPDATE_GENRE(state, payload) {
            const index = state.genres.findIndex(g => g.id === payload.id)
            if (index !== -1) {
                state.genres.splice(index, 1, payload)
            }
        },
        DELETE_GENRE(state, payload) {
            const index = state.genres.map(item => item.id).indexOf(payload.id)
            if (index !== -1) {
                state.genres.splice(index, 1)
            }
        }
    },
    actions: {
        loadGenres: async function ({commit}) {
            let endpoint = `genres/`;
            return new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_GENRES_SUCCESS', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_GENRES_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createGenre: async function ({commit}, payload) {
            let endpoint = `genres/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_GENRE', Object.assign(new GenreModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateGenre: async function ({commit}, payload) {
            let endpoint = `genres/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_GENRE', Object.assign(new GenreModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteGenre: async function({commit}, genre) {
            let endpoint = `genres/${genre.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_GENRE', genre)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}