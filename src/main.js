import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from "axios";
import { ElMessage } from 'element-plus'


// axios的全局配置
axios.defaults.baseURL = "http://localhost:8080/api";  // 本地开发环境,代理服务器地址
axios.defaults.withCredentials = true;  // 允许跨域携带cookie

// axios响应拦截器直接拿到数据
axios.interceptors.response.use(res => {
    return res.data;
}, err => {
    console.log(err);
    return Promise.reject(err);
})


// 创建app实例,并挂载相关插件
const app = createApp(App)
    .use(router)
    .use(store)
    .use(ElementPlus)

// 将axios挂载到vue的原型上,这样每个vue实例都可以使用this.$axios来访问axios
// app.config.globalProperties.$axios = axios;

// 注册ElementPlus的所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


window.code = {
    USER_NOTFOUND: 1,       //用户没有注册
    PASSWORD_ERROR: 2,      // 密码错误
    IS_OK: 3,               // 成功
    NOT_LOGIN: 4,           // 没有登录,没有权限访问页面
    USER_EXIST: 5,          // 用户已经存在
    PASSWORD_NOT_MATCH: 6,  // 密码不一致
    CODE_ERROR: 7,          // 验证码不正确
    TOO_FREQUENT: 8,        // 请求太频繁

    CODE_REGISTER: "register",
    CODE_CHANGE_PASSWORD: "change_password"
}

window.showMessage = function ({code,info}) {
    if (code >= 400 && code < 600) {
        ElMessage.error(info)
    } else if (code < 300) {
        ElMessage.success(info)
    }      
}

// 挂载app
app.mount('#app')


