import GenreModel from "@/models/genre.model";
import ApiService from "@/services/api.service";
import LemkaHelpers from "@/helpers";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const GenreModule = {
    namespaced: true,
    state: {
        genres: [],
        genresLoadingStatus: false
    },
    getters: {
        genres: state => state.genres,
        genre: state => id => {
            return state.genres.find(genre => genre.id === id)
        },
        genresLoadingStatus: state => state.genresLoadingStatus
    },
    mutations: {
        LOAD_GENRES_SUCCESS(state, genres) {
            state.genres = genres
        },
        LOAD_GENRES_FAILURE(state) {
            state.genres = []
        },
        GENRES_LOADING_STATUS(state, genresLoadingStatus) {
            state.genresLoadingStatus = genresLoadingStatus
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
            let endpoint = `${DOMAIN}/genres/`;
            return new Promise((resolve, reject) => {
                commit('GENRES_LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('LOAD_GENRES_SUCCESS', r.data)
                    commit('GENRES_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('LOAD_GENRES_FAILURE')
                    commit('GENRES_LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createGenre: async function ({commit}, payload) {
            let endpoint = `${DOMAIN}/genres/`;
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
            let endpoint = `${DOMAIN}/genres/${payload.id}/`;
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
            let endpoint = `${DOMAIN}/genres/${genre.id}/`;
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