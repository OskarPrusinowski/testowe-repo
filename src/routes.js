import { createRouter, createWebHistory } from 'vue-router'
import store from './store'

import Login from "./views/Auth/Login.vue"
import Home from "./views/Home.vue"



const routes = [
    {
        name: "Login",
        path: "/login",
        component: Login,
        meta: {
            middleware: "public",
        }
    },
    {
        name: "Home",
        path: "/home",
        component: Home,
        meta: {
            middleware: "public",
        }
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

router.beforeEach((to, from, next) => {
    document.title = "Animap"
    if (to.meta.middleware != "public") {
        if (store.getters.getAuthenticated) {
            next()
        } else {
            next({ name: "Login" })
        }
    } else {
        next()
    }
})


export default router
