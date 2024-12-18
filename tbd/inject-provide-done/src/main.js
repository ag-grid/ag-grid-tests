import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DemoRenderer from './components/DemoRenderer.vue';

const demoTablePlugin = {
  install: (app) => app.component('DemoRenderer', DemoRenderer),
};

createApp(App).use(demoTablePlugin).mount('#app');
