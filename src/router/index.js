import Login from "../components/Login.vue"
import Register from "../components/Register.vue"
import ForgotPassword from "../components/ForgotPassword.vue"
import index from "../components/index.vue"
import { createRouter, createWebHashHistory } from 'vue-router';


const routes = [
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/forgot-password",
        component: ForgotPassword
    },
    {
        path: "/index",
        component:index
    }

]

export default createRouter({
    history: createWebHashHistory(),
    routes
})