import GenreModel from "@/models/genre.model";

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
            const index = state.genres.findIndex(g => g.id === genre.id)
            if (index !== -1) {
                state.genres.splice(index, 1)
            }
        }
    },
    actions: {
        loadGenres: async function ({commit}) {
            try {
                commit('LOADING_STATUS', true)
                let genres = await GenreModel.fetchGenres()
                commit('LOAD_GENRES_SUCCESS', genres)
                commit('LOADING_STATUS', false)
                return Promise.resolve(genres)
            } catch (e) {
                commit('LOAD_GENRES_FAILURE')
                commit('LOADING_STATUS', false)
                return Promise.reject(e)
            }
        },
        createGenre: async function ({commit}, payload) {
            try {
                let genre = await GenreModel.createGenre(payload)
                commit('ADD_GENRE', genre)
                return Promise.resolve(genre)
            } catch (e) {
                return Promise.reject(e)
            }
        },
        updateGenre: async function ({commit}, payload) {
            try {
                let genre = await GenreModel.updateGenre(payload)
                commit('UPDATE_GENRE', Object.assign(new GenreModel(), genre))
                return Promise.resolve(genre)
            } catch (e) {
                return Promise.reject(e)
            }
        },
        deleteGenre: async function({commit}, genre) {
            try {
                await GenreModel.deleteGenre(genre.id)
                commit('DELETE_GENRE', genre)
            } catch (e) {
                return Promise.reject(e)
            }
        }
    }
}