<script setup>
import { computed, onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';

import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
import stories from '@/data/stories.js';

const route = useRoute();

const storie = computed(() =>
  stories.find((s) => s.id === Number(route.params.id)),
);

// Busca el “scroll container” real (si existiera)
function getScrollContainer() {
  // 1) Si tienes un contenedor layout con overflow, ponle un id y úsalo aquí.
  // return document.querySelector('#app-scroll');

  // 2) Fallbacks comunes:
  return document.scrollingElement || document.documentElement || document.body;
}

async function forceScrollTop() {
  await nextTick();

  // 1) Scroll del documento
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  // 2) Scroll del contenedor real (si no es window)
  const el = getScrollContainer();
  if (el) el.scrollTop = 0;

  // 3) Doble “refuerzo” por si hay imágenes/iframes que cambian el layout después
  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const el2 = getScrollContainer();
    if (el2) el2.scrollTop = 0;
  }, 50);

  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const el3 = getScrollContainer();
    if (el3) el3.scrollTop = 0;
  }, 250);
}

onMounted(() => {
  forceScrollTop();
});

// IMPORTANTE: si cambias entre servicios (id cambia), vuelve a forzar scroll
watch(
  () => route.params.id,
  () => {
    forceScrollTop();
  },
);
</script>

<template>
  <header>
    <Navbar />
  </header>

  <main class="container">
    <div v-if="storie" class="storie-wrapper">
      <router-link to="/stories-item" class="return-area">
        <button class="card-button">Regresar</button>
      </router-link>

      <h1 class="title">
        {{ storie.name }}
      </h1>

      <img
        v-if="storie.image"
        class="storie-image-details"
        :src="storie.image"
        :alt="storie.name"
      />

      <div class="text-storie-type">
        {{ storie.longDescription }}
      </div>

      <div v-if="storie.video1" class="video-container">
        <iframe :src="storie.video1" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>

    <div v-else class="not-found">
      <p>Servicio no encontrado.</p>
    </div>
  </main>

  <footer>
    <Footer />
  </footer>
</template>
<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: Outfit, Inter, Avenir, Helvetica, Arial, sans-serif;
}

.storie-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.return-area {
  align-self: flex-start;
  margin-bottom: 20px;
}

.title {
  font-size: 2.2rem;
  margin-bottom: 40px;
  color: #111;
  position: relative;
  display: inline-block;
}

.title::after {
  content: '';
  width: 70px;
  height: 4px;
  background-color: #4e76a9;
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 6px;
}

.storie-image-details {
  width: 100%;
  height: 420px;
  object-fit: cover;
  border-radius: 14px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.text-storie-type {
  max-width: 800px;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
  margin-bottom: 40px;
}

.video-container {
  position: relative;
  width: 100%;
  max-width: 1000px;
  padding-bottom: 56.25%;
  height: 0;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.video-container iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border: none;
}

.card-button {
  background-color: #4e76a9;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.card-button:hover {
  background-color: #456a9a;
}

.not-found {
  text-align: center;
  padding: 40px 20px;
  font-size: 1.2rem;
  color: #666;
}
</style>
