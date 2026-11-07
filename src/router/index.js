import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
        { path: '/genres', name: 'genres', component: () => import('../views/GenresView.vue') },
        { path: '/genres/:slug', name: 'genre', component: () => import('../views/GenreView.vue') },
        { path: '/livres', name: 'books', component: () => import('../views/BooksView.vue') },
        { path: '/livres/:id(\\d+)', name: 'book', component: () => import('../views/BookView.vue') },
        { path: '/auteurs/:id(\\d+)', name: 'author', component: () => import('../views/AuthorView.vue') },
        { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue') },
    ],
    scrollBehavior: () => ({ top: 0 }),
})