import ApiService from "@/services";

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
        },
        REGISTER_FAILURE(state) {
            state.status.loggedIn = false;
        },
        REFRESH_SUCCESS(state, user) {
            state.status.loggedIn = true;
            state.user = user
        },
        REFRESH_FAILURE(state) {
            state.status.loggedIn = false
        }
    },
    actions: {
        login: function({commit}, user) {
            return new Promise((resolve, reject) => {
                ApiService.Auth.login(user).then(user => {
                    commit('LOGIN_SUCCESS', user)
                    resolve(user)
                }, error => {
                    commit('LOGIN_FAILURE')
                    reject(error)
                })
            })
        },
        logout({commit}) {
            ApiService.Auth.logout();
            commit('LOGOUT');
        },
        register({commit}, user) {
            return new Promise((resolve, reject) => {
                ApiService.Auth.register(user).then(res => {
                    commit('REGISTER_SUCCESS');
                    resolve(res.data)
                }, error => {
                    commit('REGISTER_FAILURE')
                    reject(error)
                })
            })
        },
        refreshToken({commit}, user) {
            return new Promise((resolve, reject) => {
                ApiService.Auth.refreshToken(user).then(user => {
                    commit('REFRESH_SUCCESS', user);
                    resolve(user)
                }, error => {
                    commit('REFRESH_FAILURE');
                    reject(error)
                })
            })
        }
    }
};