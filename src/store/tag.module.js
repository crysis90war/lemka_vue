import ApiService from "@/services/api.service";

export const TagModule = {
    namespaced: true,
    state: {
        tags: [],
        loadingStatus: false
    },
    getters: {
        tags: state => state.tags,
        tag: state => id => {
            return state.tags.find(item => item.id === id)
        },
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        LOAD_ITEMS_SUCCESS(state, payload) {
            state.tags = payload
        },
        LOAD_ITEMS_FAILURE(state) {
            state.tags = []
        },
        LOADING_STATUS(state, loadingStatus) {
            state.loadingStatus = loadingStatus
        },
        ADD_ITEM(state, payload) {
            state.tags.push(payload)
        },
        UPDATE_ITEM(state, payload) {
            const index = state.tags.findIndex(item => item.id === payload.id)
            if (index !== -1) {
                state.tags.splice(index, 1, payload)
            }
        },
        DELETE_ITEM(state, payload) {
            const index = state.tags.map(item => item.id).indexOf(payload.id)
            if (index !== -1) {
                state.tags.splice(index, 1)
            }
        }
    },
    actions: {
        loadTags({commit}, searchField = "") {
            let searchParam = `?search=${searchField}`;
            let endpoint = `tags/${searchField === "" ? searchField : searchParam}`;
            return new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('LOAD_ITEMS_SUCCESS', r.data.results)
                    commit('LOADING_STATUS', false)
                    resolve(r.data.results)
                }, error => {
                    commit('LOAD_ITEMS_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createTag({commit}, payload) {
            let endpoint = `tags/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_ITEM', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}