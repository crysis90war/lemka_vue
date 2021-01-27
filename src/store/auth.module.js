import AuthService from '../services/auth.service';

const user = JSON.parse(sessionStorage.getItem('user'));
const initialState = user
    ? {status: {loggedIn: true}, user}
    : {status: {loggedIn: false}, user: null};

export const auth = {
    namespaced: true,
    state: initialState,
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
        login({commit}, user) {
            return AuthService.login(user).then(
                user => {
                    commit('LOGIN_SUCCESS', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('LOGIN_FAILURE');
                    return Promise.reject(error);
                }
            );
        },
        logout({commit}) {
            AuthService.logout();
            commit('LOGOUT');
        },
        register({commit}, user) {
            return AuthService.register(user).then(
                response => {
                    commit('REGISTER_SUCCESS');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('REGISTER_FAILURE');
                    return Promise.reject(error);
                }
            );
        },
        refreshToken({commit}, user) {
            return AuthService.refreshToken(user).then(user => {
                commit('REFRESH_SUCCESS', user);
                return Promise.resolve(user)
            }, error => {
                commit('REFRESH_FAILURE');
                return Promise.reject(error)
            })
        }
    }
};