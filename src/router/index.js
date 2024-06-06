import {createRouter,createWebHashHistory} from 'vue-router'

import Login from "../components/Login.vue";
import MainLayout from "../components/Main/MainLayout.vue";
import Detail from "../components/Main/Detail.vue";


const routes=[
    {
        path:'/',
        component:Login
    },
    {
        path:'/main',
        component:MainLayout
    },
    {
        path: '/detail',
        component: Detail
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
