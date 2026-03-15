import { createRouter, createWebHistory } from 'vue-router';

import Home from './views/Home-item.vue';
import About from './views/About-item.vue';
import stories from './views/Storie-item.vue';
import AuthorItem from './views/Author-item.vue';
import storieDetails from './components/Component-stories-item.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/About-item', name: 'About', component: About },
  { path: '/Storie-item', name: 'stories', component: stories },
  { path: '/Author-item', name: 'Author', component: AuthorItem },
  { path: '/storie/:id', name: 'storieDetails', component: storieDetails }, // ✅ Ruta correcta
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // ✅ MEJORADO: Mejor scrollBehavior
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'auto' };
    }
  },
});

// ✅ Asegurar scroll en navegación
router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;
