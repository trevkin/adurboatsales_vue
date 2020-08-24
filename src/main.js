import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import interceptorsSetup from './helpers/interceptors'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import AOS from 'aos'
import "aos/dist/aos.css"
import axios from "axios";

library.add(faBars)

Vue.component('font-awesome-icon', FontAwesomeIcon)

interceptorsSetup()

Vue.config.productionTip = false

new Vue({
    router,
    store,
    created () {
        AOS.init()
        const userString = localStorage.getItem('user')
        if (userString) {
            const userData = JSON.parse(userString)
            this.$store.commit('SET_USER_DATA', userData)
        }
    },
    render: h => h(App)
}).$mount('#app')

