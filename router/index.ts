import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: 'home',
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/entrypoints/devtools-panel/Content.vue'),
    },
    {
        path: '/gameconfig',
        name: 'gameconfig',
        component: () => import('@/entrypoints/devtools-panel/GameConfig/index.vue'),
    },
];
const router = createRouter({
    history: createWebHashHistory(import.meta.url),
    routes,
});
export default router;
