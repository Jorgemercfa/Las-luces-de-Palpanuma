<script setup>
import { computed, onMounted, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
import { useNewsletterPosts } from '@/composables/useNewsletterPosts';

const route = useRoute();
const { sortedPosts, isLoading, syncError, syncWarning, loadPosts } =
  useNewsletterPosts();

const copied = ref(false);

const post = computed(() =>
  sortedPosts.value.find((p) => p.slug === route.params.slug),
);

const notFound = computed(() => !isLoading.value && !post.value);

function formatDate(date) {
  return new Date(date).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function updateMeta() {
  const defaultTitle = 'Newsletter | Octavio Miranda';
  const defaultDescription =
    'Notas, avances y fotos del proceso creativo de Las luces de Palpanuma.';

  document.title = post.value
    ? `${post.value.title} | Octavio Miranda`
    : defaultTitle;

  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }

  const description = post.value
    ? post.value.note.slice(0, 160)
    : defaultDescription;
  metaDescription.setAttribute('content', description);
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (error) {
    console.error(error);
  }
}

watch(post, updateMeta);

onMounted(async () => {
  await loadPosts();
  updateMeta();
});
</script>

<template>
  <header>
    <navbar />
  </header>

  <main class="post-page">
    <section class="post-container">
      <router-link to="/NewsLetter-item" class="back-link">
        ← Volver al newsletter
      </router-link>

      <p v-if="syncWarning" class="warning-text">{{ syncWarning }}</p>
      <p v-if="syncError" class="warning-text">{{ syncError }}</p>
      <p v-if="isLoading && !post" class="loading-text">
        Cargando publicación…
      </p>

      <article v-if="post" class="post-detail">
        <h1>{{ post.title }}</h1>
        <div class="post-detail-meta">
          <p class="post-date">{{ formatDate(post.createdAt) }}</p>
          <button class="secondary-btn" @click="copyLink">
            {{ copied ? '¡Enlace copiado!' : '🔗 Copiar enlace' }}
          </button>
        </div>

        <p class="post-note">{{ post.note }}</p>

        <div class="post-photos" v-if="post.photos && post.photos.length">
          <img
            v-for="(photo, index) in post.photos"
            :key="`${post.id}-photo-${index}`"
            :src="photo"
            :alt="`Foto del newsletter ${post.title}`"
          />
        </div>
      </article>

      <div v-else-if="notFound" class="not-found">
        <h1>No encontramos esta publicación</h1>
        <p>
          Puede que haya sido eliminada, o que el enlace esté incompleto.
        </p>
        <router-link to="/NewsLetter-item" class="primary-link-btn">
          Ver todas las publicaciones
        </router-link>
      </div>
    </section>
  </main>

  <footer>
    <Footer />
  </footer>
</template>

<style scoped>
.post-page {
  padding: 50px 6% 90px;
}

.post-container {
  max-width: 820px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  margin-bottom: 24px;
  color: #1c4e99;
  text-decoration: none;
  font-weight: 600;
}

.back-link:hover {
  text-decoration: underline;
}

.post-detail {
  background: #4e76a9;
  color: #fff;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  padding: 32px;
}

.post-detail h1 {
  margin-top: 0;
  font-size: clamp(1.6rem, 3.5vw, 2.2rem);
}

.post-detail-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}

.post-date {
  font-size: 0.9rem;
  margin: 0;
}

.post-note {
  line-height: 1.8;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.post-photos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
  margin: 20px 0 4px;
}

.post-photos img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 10px;
}

.secondary-btn {
  background-color: rgba(255, 255, 255, 0.15);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
}

.not-found {
  text-align: center;
  padding: 60px 20px;
}

.primary-link-btn {
  display: inline-block;
  margin-top: 16px;
  background-color: #1c4e99;
  color: #fff;
  border-radius: 8px;
  padding: 10px 16px;
  text-decoration: none;
  font-weight: 600;
}

.warning-text {
  color: #8a5a00;
  margin-bottom: 16px;
}

.loading-text {
  color: #666;
}
</style>