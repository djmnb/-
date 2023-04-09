import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
    .use(router)
    .use(store)
    .use(ElementPlus)



for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')