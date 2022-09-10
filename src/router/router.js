import {
    createRouter,
    createWebHashHistory
} from "vue-router"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('../pages/login.vue')
        },
        {
            path: '/manage',
            name: 'manage',
            redirect: '/login',
            component: () => import('../pages/manage.vue'),
            children: [{
                path: '',
                name: 'home',
                component: () => import('../pages/home.vue')
            },
            {
                path: 'article',
                name: 'article',
                component: () => import('../pages/article.vue')
            },
            {
                path: 'comment',
                name: 'comment',
                component: () => import('../pages/comment.vue')
            },
            {
                path: 'information',
                name: 'information',
                component: () => import('../pages/information.vue')
            }
            ]
        },
    ]
})



export default router