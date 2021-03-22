import ApiService from "@/services/api.service";
import LemkaHelpers from "@/helpers";
import TagModel from "@/models/tag.model";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const TagModule = {
    namespaced: true,
    state: {
        tags: [],
        tagsLoadingStatus: false
    },
    getters: {
        tags: state => state.tags,
        tag: state => id => {
            return state.tags.find(item => item.id === id)
        },
        tagsLoadingStatus: state => state.tagsLoadingStatus
    },
    mutations: {
        LOAD_TAGS_SUCCESS(state, tags) {
            state.tags = tags
        },
        LOAD_TAGS_FAILURE(state) {
            state.tags = []
        },
        TAGS_LOADING_STATUS(state, tagsLoadingStatus) {
            state.tagsLoadingStatus = tagsLoadingStatus
        },
        ADD_TAG(state, tag) {
            state.tags.push(tag)
        },
        UPDATE_TAG(state, tag) {
            const index = state.tags.findIndex(item => item.id === tag.id)
            if (index !== -1) {
                state.tags.splice(index, 1, tag)
            }
        },
        DELETE_TAG(state, tag) {
            const index = state.tags.map(item => item.id).indexOf(tag.id)
            if (index !== -1) {
                state.tags.splice(index, 1)
            }
        }
    },
    actions: {
        loadTags({commit}, searchField = "") {
            let searchParam = `?search=${searchField}`;
            let endpoint = `${DOMAIN}/tags/${searchField === "" ? searchField : searchParam}`;
            return new Promise((resolve, reject) => {
                commit('TAGS_LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('LOAD_TAGS_SUCCESS', r.data.results)
                    commit('TAGS_LOADING_STATUS', false)
                    resolve(r.data.results)
                }, error => {
                    commit('LOAD_TAGS_FAILURE')
                    commit('TAGS_LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createTag({commit}, payload) {
            let endpoint = `${DOMAIN}/tags/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_TAG', Object.assign(new TagModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}