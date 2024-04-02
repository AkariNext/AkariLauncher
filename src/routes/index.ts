import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home.vue'
import Signin from '../components/Signin.vue'
import GameLog from '../components/GameLog.vue'
import Settings from './Settings.vue'

const routes: RouteRecordRaw[] = [
    { path: '/', component: Home, },
    { path: '/signin', component: Signin },
    { path: '/gamelog', component: GameLog },
    { path: '/settings', component: Settings },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})