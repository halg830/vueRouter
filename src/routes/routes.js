import Clientes from "../components/Clientes.vue"
import Login from "../components/Login.vue"
import {createRouter, createWebHashHistory} from "vue-router"

const routes = [
    {path: "/", component:Login},
    {path:"/clientes", component:Clientes}
]

export const router = createRouter({
    history:createWebHashHistory(),
    routes
})