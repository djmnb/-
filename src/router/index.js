



import MyQuestion from "../pages/question/MyQuestion.vue";
import Chat from "../pages/chat/Chat.vue";
import SearchHistory from "../pages/search/SearchHistory.vue";
import MyInfo from "../pages/user/MyInfo.vue";
import UploadQuestion from "../pages/question/UploadQuestion.vue";
import Question from "../pages/question/Question.vue";
import Index from "../pages/Index.vue";
import Search from "../pages/search/Search.vue";
import Login from "../pages/user/Login.vue";
import Common from "../pages/user/Common.vue";
import NotFound from "../pages/NotFound.vue";
import AllQuestion from "../pages/question/AllQuestion.vue";
import { createRouter, createWebHashHistory } from "vue-router";




const routes = [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login, name: "login" },
    {
        path: "/register", component: Common, name: "register",
        props: { title: "注册", url: "/user/register/", label: "密码", sendBtnText: "注册", codeType: 100 }
    },
    {
        path: "/forgot-password", component: Common, name: "forgot-password",
        props: { title: "忘记密码", url: "/user/forgetpassword/", label: "新密码", sendBtnText: "重置密码", codeType: 102 }
    },
    {
        path: "/index", component: Index, name: "index",
        children: [
            { path: "", component: Search, name: "search" },
            { path: "question/:id", component: Question, name: "question" },
            { path: 'uploadquestion', component: UploadQuestion, name: 'uploadquestion' },
            { path: 'myquestion', component: MyQuestion, name: 'myquestion' },
            { path: 'chat', component: Chat, name: 'chat' },
            { path: 'searchhistory', component: SearchHistory, name: 'searchhistory' },
            { path: 'myinfo', component: MyInfo, name: 'myinfo' },
            { path: 'allquestion', component: AllQuestion, name: 'allQuestion' },
            { path: ":catchMatch(.*)", component: NotFound, props: { title: "hello" }, meta: { withinIndex: true } }
        ]
    },

    { path: "/:catchMatch(.*)", component: NotFound, props: { title: "hello2" }, meta: { withinApp: true } }


]



const router = createRouter({
    history: createWebHashHistory(),
    routes
})



export default router