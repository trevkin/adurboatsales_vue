import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {TokenStorage} from "../helpers/token-storage";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null
    },
    mutations: {
        SET_USER_DATA(state, userData) {
            state.user = userData
            localStorage.setItem('user', JSON.stringify(userData))
            TokenStorage.storeToken(userData.accessToken)
            TokenStorage.storeRefreshToken(userData.refreshToken)
        },
        CLEAR_USER_DATA() {
            localStorage.removeItem('user')
            TokenStorage.clear()
        }
    },
    actions: {
        register({commit}, credentials) {
            return axios
                .post(process.env.VUE_APP_API_URL + ":" + process.env.VUE_APP_API_PORT + '/api/auth/signup', credentials)
                .then(({data}) => {
                    commit('SET_USER_DATA', data)
                })
        },
        login({commit}, credentials) {
            console.log("store login method", credentials)
            return axios
                .post(process.env.VUE_APP_API_URL + ":" + process.env.VUE_APP_API_PORT + '/api/auth/signin', credentials)
                .then(({data}) => {
                    console.log("store login happy response", data)
                    commit('SET_USER_DATA', data)
                    return new Promise((resolve, reject) => {
                        resolve(data);
                    });
                })
                .catch((error) => {
                    console.log("store login error response", error)
                    return new Promise((resolve, reject) => {
                        reject(error);
                    });
                })
        },
        logout({commit}) {
            commit('CLEAR_USER_DATA')
            return axios
                .delete(process.env.VUE_APP_API_URL + ":" + process.env.VUE_APP_API_PORT + '/api/auth/signout')
                .then(({data}) => {

                })
        }
    },
    getters: {
        loggedIn(state) {
            //return TokenStorage.isAuthenticated()
            return !!state.user
        }
    }
})
