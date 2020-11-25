import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js';


const appp = createApp(App)
appp.use(router)
appp.mount('#app')
