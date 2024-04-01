import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import App from '../App.vue'
import Signin from '../components/Signin.vue'
import GameLog from '../components/GameLog.vue'

const routes: RouteRecordRaw[] = [
    { path: '/', component: App },
    { path: '/signin', component: Signin},
    { path: '/gamelog', component: GameLog }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})