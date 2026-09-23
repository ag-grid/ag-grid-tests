import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { LicenseManager } from 'ag-grid-enterprise';
// Optional theme CSS
const app = createApp(App);

LicenseManager.setLicenseKey('Test License');
app.mount('#app');
