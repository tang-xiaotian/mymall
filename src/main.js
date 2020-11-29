import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js';



// Vue.prototype.$bus = createApp()


const appp = createApp(App)
appp.use(router)
appp.mount('#app')
