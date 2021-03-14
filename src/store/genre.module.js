import GenreModel from "@/models/genre.model";
import ApiService from "@/services";

export const genreModule = {
    namespaced: true,
    state: {
        genres: [],
        loadingStatus: false
    },
    getters: {
        genre: state => id => {
            return state.genres.find(genre => genre.id === id)
        },
        genres: state => state.genres,
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        LOAD_GENRES_SUCCESS(state, genres) {
            state.genres = genres
        },
        LOAD_GENRES_FAILURE(state) {
            state.genres = []
        },
        LOADING_STATUS(state, newLoadingStatus) {
            state.loadingStatus = newLoadingStatus
        },
        ADD_GENRE(state, newGenre) {
            state.genres.push(newGenre)
        },
        UPDATE_GENRE(state, genre) {
            const index = state.genres.findIndex(g => g.id === genre.id)
            if (index !== -1) {
                state.genres.splice(index, 1, genre)
            }
        },
        DELETE_GENRE(state, genre) {
            const index = state.genres.map(item => item.id).indexOf(genre.id)
            if (index !== -1) {
                state.genres.splice(index, 1)
            }
        }
    },
    actions: {
        loadGenres: async function ({commit}) {
            return new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.Genres.getGenres().then(res => {
                    commit('LOAD_GENRES_SUCCESS', res.data)
                    commit('LOADING_STATUS', false)
                    resolve(res.data)
                }, error => {
                    commit('LOAD_GENRES_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createGenre: async function ({commit}, payload) {
            return new Promise((resolve, reject) => {
                ApiService.Genres.postGenre(payload).then(res => {
                    commit('ADD_GENRE', Object.assign(new GenreModel(), res.data))
                    resolve(res.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateGenre: async function ({commit}, payload) {
            return new Promise((resolve, reject) => {
                ApiService.Genres.putGenre(payload).then(res => {
                    commit('UPDATE_GENRE', Object.assign(new GenreModel(), res.data))
                    resolve(res.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteGenre: async function({commit}, genre) {
            return new Promise((resolve, reject) => {
                ApiService.Genres.deleteGenre(genre.id).then(res => {
                    commit('DELETE_GENRE', genre)
                    resolve(res)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}