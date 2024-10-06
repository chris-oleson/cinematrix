// Vue
import { createApp } from 'vue'
import App from './App'
const app = createApp(App)

// Pinia
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

// Vue Router
import { router } from './router'
app.use(router)

// Vuetify
import vuetify from './vuetify'
app.use(vuetify)

// Axios
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_URL
axios.interceptors.request.use(
    function(config) {
        config.withCredentials = true
        return config
    },
    function(error) {
        return Promise.reject(error)
    }
)

app.mount('#app')
