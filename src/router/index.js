import {  createRouter, createWebHistory } from "vue-router";
import App from "../components/GlobalComponent.vue";
import Camera from "../components/Input/InputCamera.vue"

const routes = [{
    path: "/",
    name: "Home",
    component: App,
},
    {
        path: "/camera",
        name: "camera",
        component: Camera
    }
 ];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;