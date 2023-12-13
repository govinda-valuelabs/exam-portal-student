import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Exam from '../pages/Exam.vue';
import QuestionCard from '../components/QuestionCard.vue';

const routes = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'dashboard', component: Home },
        { path: '/login', name: 'login', component: Login },
        { path: '/register', name: 'register', component: Register },
        { 
            path: '/exam',
            name: 'exam',
            component: Exam,
            children: [
                { path: ':questionId', name: 'examquestion', component: QuestionCard }
            ]
        },
    ]
});

export default routes;