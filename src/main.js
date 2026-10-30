import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import './style.css'

import App from './App.vue'
import Home from './pages/Home.vue'
import Browse from './pages/Browse.vue'
import SkillDetail from './pages/SkillDetail.vue'
import AddSkill from './pages/AddSkill.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/browse', name: 'browse', component: Browse },
  { path: '/browse/:category?', name: 'browse-category', component: Browse },
  { path: '/skill/:skillId', name: 'skill-detail', component: SkillDetail },
  { path: '/add-skill', name: 'add-skill', component: AddSkill },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
