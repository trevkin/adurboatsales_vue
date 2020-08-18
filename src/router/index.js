import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import Boat from '../views/Boat.vue'
import AboutUs from '../views/AboutUs.vue'
import ContactUs from '../views/ContactUs.vue'
import RegisterUser from '../views/RegisterUser.vue'
import LoginUser from '../views/LoginUser.vue'
import BoatEdit from '../views/BoatEdit.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            meta: { requiresAuth: true }
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterUser
        },
        {
            path: '/login',
            name: 'login',
            component: LoginUser
        },
        {
            path: '/aboutus',
            name: 'aboutus',
            component: AboutUs
        },
        {
            path: '/contactus',
            name: 'contactus',
            component: ContactUs
        },
        {
            path: '/boat/:boatId',
            name: 'boat',
            component: Boat
        },
        {
            path: '/boat/edit/:boatId',
            name: 'boatedit',
            component: BoatEdit,
            props: (route) => ({
                ...route.params
            })
        }
    ]
})

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('user')
    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
        next('/')
    }
    next()
})

export default router
