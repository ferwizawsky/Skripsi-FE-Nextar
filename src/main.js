import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import Camera from "simple-vue-camera";
window.axios = axios;
import { doFirst } from "./setup.js";
import "./index.css";
doFirst();

const pinia = createPinia();
const app = createApp(App);
app.component("camera", Camera);
app.use(router);
app.use(pinia);
app.mount("#app");
