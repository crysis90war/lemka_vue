import ApiService from "@/services/api.service";
import LemkaHelpers from "@/helpers";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;
const user = JSON.parse(sessionStorage.getItem('user'));
// const initialState = user
//     ? {status: {loggedIn: true}, user}
//     : {status: {loggedIn: false}, user: null};
// state: initialState,

export const AuthModule = {
    namespaced: true,
    state: {
        status: {
            loggedIn: !!user
        },
        user: user ? user : null
    },
    getters: {
        loggedIn: state => state.status.loggedIn,
        user: state => state.user
    },
    mutations: {
        LOGIN_SUCCESS(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        LOGIN_FAILURE(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        LOGOUT(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        REGISTER_SUCCESS(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        REGISTER_FAILURE(state) {
            state.status.loggedIn = false;
            state.user = null;
        }
    },
    actions: {
        login: function({commit}, payload) {
            let endpoint = `${DOMAIN}/login/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('LOGIN_SUCCESS', r.data)
                    sessionStorage.setItem('user', JSON.stringify(r.data));
                    resolve(r.data)
                }, error => {
                    commit('LOGIN_FAILURE')
                    reject(error)
                })
            })
        },
        logout({commit}) {
            ApiService.DESTROYSession()
            commit('LOGOUT');
            window.location.reload()
        },
        register({commit}, payload) {
            let endpoint = `${DOMAIN}/register/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('REGISTER_SUCCESS')
                    resolve(r.data)
                }, error => {
                    commit('REGISTER_FAILURE')
                    reject(error)
                })
            })
        }
    }
};