import { createRouter, createWebHistory } from 'vue-router';

import Home from './views/Home-item.vue';
import AuthorItem from './views/Author-item.vue';
import stories from './views/Storie-item.vue';
import NewsLetter from './views/NewsLetter-item.vue';
import NewsletterPostDetail from './components/Newsletter-post-detail-item.vue';
import IllustrationItem from './views/Illustration-item.vue';
import MediaItem from './views/Media-item.vue';
import Contact from './views/Contact-item.vue';
import Sale from './views/Sale-item.vue';
import storieDetails from './components/Component-stories-item.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Inicio | Octavio Miranda',
      description:
        'Nazca, una chica de catorce años, emprende un peligroso viaje en busca de las misteriosas luces de la montaña Palpanuma.',
    },
  },
  {
    path: '/Author-item',
    name: 'Author',
    component: AuthorItem,
    meta: {
      title: 'Autor | Octavio Miranda',
      description:
        'Conoce a Octavio Miranda, autor de Las luces de Palpanuma.',
    },
  },
  {
    path: '/Storie-item',
    name: 'stories',
    component: stories,
    meta: {
      title: 'Libros | Octavio Miranda',
      description: 'Descubre los libros de Octavio Miranda.',
    },
  },
  {
    path: '/NewsLetter-item',
    name: 'NewsLetter',
    component: NewsLetter,
    meta: {
      title: 'Newsletter | Octavio Miranda',
      description: 'Suscríbete al newsletter de Octavio Miranda.',
    },
  },
  {
    path: '/newsletter/:slug',
    name: 'NewsletterPostDetail',
    component: NewsletterPostDetail,
    meta: {
      title: 'Newsletter | Octavio Miranda',
      description: 'Nota del newsletter de Octavio Miranda.',
    },
  },
  {
    path: '/Illustration-item',
    name: 'Illustration',
    component: IllustrationItem,
    meta: {
      title: 'Ilustraciones | Octavio Miranda',
      description: 'Galería de ilustraciones de Las luces de Palpanuma.',
    },
  },
  {
    path: '/Media-item',
    name: 'Media',
    component: MediaItem,
    meta: {
      title: 'Medios | Octavio Miranda',
      description: 'Apariciones en medios de Octavio Miranda.',
    },
  },
  {
    path: '/Contact-item',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'Contacto | Octavio Miranda',
      description: 'Contacta con Octavio Miranda.',
    },
  },
  {
    path: '/Sale-item',
    name: 'sale-item',
    component: Sale,
    meta: {
      title: 'Comprar | Octavio Miranda',
      description: 'Compra los libros de Octavio Miranda.',
    },
  },
  {
    path: '/storie/:id',
    name: 'storieDetails',
    component: storieDetails,
    meta: {
      title: 'Libros | Octavio Miranda',
      description: 'Descubre los libros de Octavio Miranda.',
    },
  },
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

router.afterEach((to) => {
  window.scrollTo(0, 0);

  const defaultTitle = 'Octavio Miranda';
  const defaultDescription =
    'Nazca, una chica de catorce años, emprende un peligroso viaje en busca de las misteriosas luces de la montaña Palpanuma.';

  document.title = to.meta.title || defaultTitle;

  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', to.meta.description || defaultDescription);

  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', `${window.location.origin}${to.path}`);
});

export default router;