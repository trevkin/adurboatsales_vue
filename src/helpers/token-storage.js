import axios, { AxiosRequestConfig } from 'axios';
import { Promise } from 'es6-promise';

export class TokenStorage {

    static LOCAL_STORAGE_TOKEN = 'token';
    static LOCAL_STORAGE_REFRESH_TOKEN = 'refresh_token';

    static isAuthenticated() {
        return this.getToken() !== null;
    }

    static getAuthentication() {
        return {
            headers: { 'Authorization': 'Bearer ' + this.getToken() }
        };
    }

    static getNewToken() {
        return new Promise((resolve, reject) => {
            axios
                .post(process.env.VUE_APP_API_URL+":"+process.env.VUE_APP_API_PORT+"/api/auth/refresh", { refreshToken: this.getRefreshToken() })
                .then(response => {
                    console.log("getNewToken success:", response.data.accessToken)
                    this.storeToken(response.data.accessToken);

                    resolve(response.data.accessToken);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    static storeToken(token) {
        localStorage.setItem(TokenStorage.LOCAL_STORAGE_TOKEN, token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${
           token
        }`
    }

    static storeRefreshToken(refreshToken) {
        localStorage.setItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN, refreshToken);
    }

    static clear() {
        localStorage.removeItem(TokenStorage.LOCAL_STORAGE_TOKEN);
        localStorage.removeItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN);
    }

    static getRefreshToken() {
        return localStorage.getItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN);
    }

    static getToken() {
        return localStorage.getItem(TokenStorage.LOCAL_STORAGE_TOKEN);
    }
}