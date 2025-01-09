import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import PriceRenderer from "@/components/PriceRenderer.vue"

const app = createApp(App)
// app.component('PriceRenderer', PriceRenderer)

app.mount('#app')
