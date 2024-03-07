import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index.js"
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from "axios";
import { ElMessage } from 'element-plus'
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});


// axios的全局配置
axios.defaults.baseURL = "/api";  // 本地开发环境,代理服务器地址
axios.defaults.withCredentials = true;  // 允许跨域携带cookie



// axios响应拦截器直接拿到数据
axios.interceptors.response.use(res => {

    if (res.data.code == 400) {
        router.push("/login");
    }
    return res.data;
}, err => {
    console.log(err);
    if (err.code == "ERR_NETWORK") {
        showMessage({code:500,info:"网络错误"},true)
        return Promise.reject(err);
    } else if (err.code == "ERR_BAD_RESPONSE") {
        showMessage({ code: 500, info: "代理错误或者服务器未开启" }, true)
        return Promise.reject(err);
    }
    showMessage({code:500,info:err+"\n"+err.response.data},true)
    return Promise.reject(err);
})


// 创建app实例,并挂载相关插件
const app = createApp(App)
    .use(router)
    .use(store)
    .use(ElementPlus)
    .use(VMdPreview)

// 将axios挂载到vue的原型上,这样每个vue实例都可以使用this.$axios来访问axios
// app.config.globalProperties.$axios = axios;

// 注册ElementPlus的所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}



window.showMessage = function ({code,info},onlyerror=false) {
    if (code >= 400 && code < 600 ) {
        ElMessage.error(info)
    } else if (code < 300 && !onlyerror) {
        ElMessage.success(info)
    }      
}

// 挂载app
app.mount('#app')


