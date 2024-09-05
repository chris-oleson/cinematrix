import { createRouter, createWebHistory } from 'vue-router'
import PageNotFound from '/src/views/PageNotFound'
import Home from '/src/views/Home'
import Login from '/src/views/Login'
import SignUp from '/src/views/SignUp'
import Search from '/src/views/Search'
import { useStore } from '/src/pinia'

export const router = createRouter({
    history: createWebHistory(),
    scrollBehavior() {
        return { top: 0 }
    },
    routes: [
        {
            path: '/404',
            alias: '/:pathMatch(.*)*',
            component: PageNotFound,
            meta: {
                title: '404'
            }
        },
        {
            path: '/',
            component: Home,
        },
        {
            path: '/login',
            component: Login,
            meta: {
                title: 'Login'
            }
        },
        {
            path: '/signup',
            component: SignUp,
            meta: {
                title: 'Sign Up'
            }
        },
        {
            path: '/search',
            component: Search,
            meta: {
                title: 'Search'
            }
        },
    ]
})

router.afterEach(to => {
    if (to.meta.title) {
      document.title = `${to.meta.title} - Cinematrix`;
    }
    else {
        document.title = 'Cinematrix'
    }
})

function rejectUnauthorized() {
    const store = useStore()
    if (!store.isLoggedIn) {
        return { path: '/login' }
    }
}