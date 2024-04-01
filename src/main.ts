import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import VueAnimXyz from '@animxyz/vue3'
import '@animxyz/core'  // animxyz core styles
import { createVfm } from 'vue-final-modal'

import './style.css'
import 'vue-final-modal/style.css'
import { router } from './routes'


const pinia = createPinia()
const vfm = createVfm()
const app = createApp(App)
app.use(vfm)
app.use(router)
app.use(pinia)
app.use(VueAnimXyz)

app.mount('#app').$nextTick(() => postMessage({ payload: 'removeLoading' }, '*'))
