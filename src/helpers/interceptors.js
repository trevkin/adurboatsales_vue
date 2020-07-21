import axios from 'axios';
//import { Promise } from "es6-promise";
import { TokenStorage } from "./token-storage.js";
import router from '../router';
import store from '../vuex/store';

export default () => {
    axios.interceptors.response.use( (response) => {
        // console.log("interceptor passed:",response.status)
        // Return a successful response back to the calling service
        return response;
    }, (error) => {

        //let errorMessage = error.response.data.message;
        let errorCopy = {
            message: error.response.data.message,
            status: error.response.status,
        }

        console.log("interceptor error:", errorCopy.message)

        // Return any error which is not due to authentication back to the calling service
        if (error.response.status !== 401) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
        //console.log(":"+errorMessage+":")
        // Logout user if token refresh didn't work or user is disabled
        if (error.config.url.indexOf('/api/auth/refresh') !== -1
            || errorCopy.message === "Refresh token is invalid"
            || errorCopy.message === "Refresh token could not be verified"
            || errorCopy.message === "Invalid Password!") {
            console.log("Logout user if token refresh didn't work or user is disabled:", errorCopy.message)
            console.log("current route name", router.currentRoute.name)
            store.dispatch('logout');
            if (router.currentRoute.name != 'login') {
                router.push({name: 'login'});
            }

            return new Promise((resolve, reject) => {
                reject(error);
            });
        }


        // Try request again with new token
        return TokenStorage.getNewToken()
            .then((token) => {

                // New request with new token
                const config = error.config;
                config.headers['Authorization'] = `Bearer ${
                    token
                }`;

                return new Promise((resolve, reject) => {
                    axios.request(config).then(response => {
                        resolve(response);
                    }).catch((error) => {
                        reject(error);
                    })
                });
            })
            .catch((error) => {
                Promise.reject(error);
            });
    });
}