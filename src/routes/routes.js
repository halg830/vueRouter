import Login from "../components/Login.vue"
import Home from "../components/Home.vue"
import Compras from "../components/Compras.vue"
import {createRouter, createWebHashHistory} from "vue-router"

const routes = [
    {path:"/", component:Login},
    {path:"/home", component:Home},
    {path:"/Compras", component:Compras}
]

export const router = createRouter({
    history:createWebHashHistory(),
    routes
})