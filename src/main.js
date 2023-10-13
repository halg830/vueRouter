import { createApp } from 'vue'
import {Quasar, Dialog} from 'quasar'
// import './style.css'
import App from './App.vue'
import {router} from "./routes/routes.js"
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import axios from 'axios'
axios.defaults.baseURL="https://transporte-el2a.onrender.com/api/"
const app = createApp(App)

app.use(Quasar, {
    plugins:{Dialog}
})
app.use(router)
app.mount('#app')
