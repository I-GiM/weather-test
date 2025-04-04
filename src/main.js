import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
})

app.use(VueQueryPlugin)
app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
