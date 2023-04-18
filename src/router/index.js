import Login from "../pages/Login.vue"
import index from "../pages/Index.vue"
import Common from "../pages/Common.vue"
import { createRouter, createWebHashHistory } from 'vue-router';
import search from "../pages/Search.vue";
import Question from "../pages/Question.vue";


const routes = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/login",
        component: Login,
        name: "login"
    },
    {
        path: "/register",
        component: Common,
        name: "register",
        props: {
            title: "注册",
            url: "/user/register/",
            label:"密码",
            sendBtnText:"注册",
            codeType: 100
        }
    },
    {
        path: "/forgot-password",
        component: Common,
        name: "forgot-password",
        props: {
            title: "忘记密码",
            url: "/user/forgetpassword/",
            label:"新密码",
            sendBtnText:"重置密码",
            codeType: 102
        }
    },
    {
        path: "/index",
        component: index,
        name: "index",
        children: [
            { path: "", component: search,name:"search" },
            { path: "question/:id", component: Question,name:"question" },
        ]
    }
]



const router =  createRouter({
    history: createWebHashHistory(),
    routes
})



export default router