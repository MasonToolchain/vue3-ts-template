import { createApp } from 'vue'

import App from './App.vue'
import { installRouter } from '@/router'
import { installPinia } from './stores'
import { installAssets } from './plugins/assets'

const app = createApp(App)

installAssets()
installRouter(app)
installPinia(app)

app.mount('#app')
