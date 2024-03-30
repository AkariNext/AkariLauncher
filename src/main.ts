import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import VueAnimXyz from '@animxyz/vue3'
import '@animxyz/core'  // animxyz core styles
const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(VueAnimXyz)

app.mount('#app').$nextTick(() => postMessage({ payload: 'removeLoading' }, '*'))
