import { createRouter, createWebHistory } from 'vue-router';

import Home from './views/Home-item.vue';
import AuthorItem from './views/Author-item.vue';
import stories from './views/Storie-item.vue';
import NewsLetter from './views/NewsLetter-item.vue';
import IllustrationItem from './views/Illustration-item.vue';
import Contact from './views/Contact-item.vue';
import Sale from './views/Sale-item.vue';
import storieDetails from './components/Component-stories-item.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/Author-item', name: 'Author', component: AuthorItem },
  { path: '/Storie-item', name: 'stories', component: stories },
  { path: '/NewsLetter-item', name: 'NewsLetter', component: NewsLetter },
  {
    path: '/Illustration-item',
    name: 'Illustration',
    component: IllustrationItem,
  },
  { path: '/Contact-item', name: 'Contact', component: Contact },
  { path: '/Sale-item', name: 'sale-item', component: Sale },
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
