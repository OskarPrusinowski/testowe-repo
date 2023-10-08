import { createApp } from 'vue'
import Main from './views/MainLayout.vue'
import router from './routes.js'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import store from './store/index.js'
import customLightTheme from './plugins/colors.ts'


import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import "./bootstrap"


const vuetify = createVuetify({
    theme: {
        defaultTheme: 'customLightTheme',
        themes: {
            customLightTheme
        }
    }
})



const app = createApp(Main);

app.use(autoAnimatePlugin).use(vuetify).use(store).use(router).mount('#app');


