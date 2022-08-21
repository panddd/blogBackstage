import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router/router'
import App from './App.vue'
import store from './sotre/index'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 禁止用户手动更改localStorage的数据
window.addEventListener('storage', function (e) {
    localStorage.setItem(e.key, e.oldValue)
});
app.use(store)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
