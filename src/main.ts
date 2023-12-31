import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Home from "./routes/Home.vue"
import { createPinia } from 'pinia'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.mount('#app').$nextTick(() => postMessage({ payload: 'removeLoading' }, '*'))
