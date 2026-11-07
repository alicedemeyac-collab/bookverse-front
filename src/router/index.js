import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
        { path: '/genres', name: 'genres', component: () => import('../views/GenresView.vue') },
        { path: '/genres/:slug', name: 'genre', component: () => import('../views/GenreView.vue') },
        { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue') },
    ],
    scrollBehavior: () => ({ top: 0 }),
})