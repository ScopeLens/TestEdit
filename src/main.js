import { createApp } from 'vue'
import './style.css'
import Router from "./router";
import App from "./App.vue";

import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App)
    .use(Router)
    .use(ViewUIPlus)
    .use(ElementPlus)
    .mount('#app')


