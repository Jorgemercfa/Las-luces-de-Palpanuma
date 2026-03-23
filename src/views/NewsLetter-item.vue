<script setup>
import { computed, ref, onMounted } from 'vue';
import navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';

const AUTHOR_USER = 'octavio';
const AUTHOR_PASSWORD = 'Palpanuma2026';
const POSTS_STORAGE_KEY = 'palpanuma-newsletter-posts';
const SESSION_STORAGE_KEY = 'palpanuma-newsletter-author';

const loginForm = ref({ user: '', password: '' });
const postForm = ref({ title: '', note: '' });
const uploadedPhotos = ref([]);
const posts = ref([]);
const isAuthor = ref(false);
const loginError = ref('');
const postError = ref('');

const sortedPosts = computed(() =>
  [...posts.value].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  ),
);

onMounted(() => {
  loadPosts();
  isAuthor.value = sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true';
});

function loadPosts() {
  const savedPosts = localStorage.getItem(POSTS_STORAGE_KEY);

  if (savedPosts) {
    posts.value = JSON.parse(savedPosts);
  } else {
    posts.value = [
      {
        id: Date.now(),
        title: 'Bienvenidos al Newsletter',
        note: 'Este espacio será usado para compartir avances del libro, notas del autor e imágenes exclusivas del proceso creativo.',
        photos: [],
        createdAt: new Date().toISOString(),
      },
    ];
    savePosts();
  }
}

function savePosts() {
  localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts.value));
}

function loginAuthor() {
  loginError.value = '';
  const user = loginForm.value.user.trim().toLowerCase();

  if (user === AUTHOR_USER && loginForm.value.password === AUTHOR_PASSWORD) {
    isAuthor.value = true;
    sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
    loginForm.value = { user: '', password: '' };
    return;
  }

  loginError.value = 'Credenciales incorrectas. Solo el autor puede editar.';
}

function logoutAuthor() {
  isAuthor.value = false;
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
}

async function handlePhotoUpload(event) {
  const files = Array.from(event.target.files || []);

  if (!files.length) {
    return;
  }

  const readers = files.map((file) => fileToDataUrl(file));
  const photoUrls = await Promise.all(readers);
  uploadedPhotos.value = [...uploadedPhotos.value, ...photoUrls];
  event.target.value = '';
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('No se pudo leer el archivo.'));
    reader.readAsDataURL(file);
  });
}

function removeUploadedPhoto(index) {
  uploadedPhotos.value.splice(index, 1);
}

function addPost() {
  postError.value = '';

  if (!postForm.value.title.trim() || !postForm.value.note.trim()) {
    postError.value = 'Debes completar el título y la nota antes de publicar.';
    return;
  }

  posts.value.push({
    id: Date.now(),
    title: postForm.value.title.trim(),
    note: postForm.value.note.trim(),
    photos: [...uploadedPhotos.value],
    createdAt: new Date().toISOString(),
  });

  postForm.value = { title: '', note: '' };
  uploadedPhotos.value = [];
  savePosts();
}

function deletePost(postId) {
  posts.value = posts.value.filter((post) => post.id !== postId);
  savePosts();
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
</script>

<template>
  <header>
    <navbar />
  </header>

  <main class="newsletter-page">
    <section class="newsletter-container">
      <h1 class="title">Newsletter del autor</h1>
      <p class="subtitle">
        Aquí se publican notas, avances y fotos del proceso creativo de
        <strong>Las luces de Palpanuma</strong>.
      </p>

      <div class="author-box" v-if="!isAuthor">
        <h2>Acceso de autor</h2>
        <p>Solo el autor puede crear, editar o eliminar contenido.</p>

        <div class="form-grid">
          <input
            v-model="loginForm.user"
            type="text"
            placeholder="Usuario"
            autocomplete="username"
          />
          <input
            v-model="loginForm.password"
            type="password"
            placeholder="Contraseña"
            autocomplete="current-password"
          />
        </div>

        <button class="primary-btn" @click="loginAuthor">
          Ingresar como autor
        </button>
        <p v-if="loginError" class="error-text">{{ loginError }}</p>
      </div>

      <div class="author-panel" v-else>
        <div class="author-panel-header">
          <h2>Panel del autor</h2>
          <button class="primary-btn" @click="logoutAuthor">
            Cerrar sesión
          </button>
        </div>

        <div class="form-grid">
          <input
            v-model="postForm.title"
            type="text"
            placeholder="Título de la publicación"
          />
          <textarea
            v-model="postForm.note"
            rows="5"
            placeholder="Escribe la nota del newsletter"
          />
        </div>

        <label class="upload-label">
          Subir fotos
          <input
            type="file"
            accept="image/*"
            multiple
            @change="handlePhotoUpload"
          />
        </label>

        <div class="preview-grid" v-if="uploadedPhotos.length">
          <div
            v-for="(photo, index) in uploadedPhotos"
            :key="`${photo}-${index}`"
            class="preview-item"
          >
            <img :src="photo" alt="Vista previa de foto a publicar" />
            <button class="danger-btn" @click="removeUploadedPhoto(index)">
              Quitar
            </button>
          </div>
        </div>

        <button class="primary-btn" @click="addPost">
          Publicar newsletter
        </button>
        <p v-if="postError" class="error-text">{{ postError }}</p>
      </div>

      <section class="posts-list">
        <article v-for="post in sortedPosts" :key="post.id" class="post-card">
          <div class="post-header">
            <div>
              <h3>{{ post.title }}</h3>
              <p class="post-date">{{ formatDate(post.createdAt) }}</p>
            </div>
            <button
              v-if="isAuthor"
              class="danger-btn"
              @click="deletePost(post.id)"
            >
              Eliminar
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
      </section>
    </section>
  </main>

  <footer>
    <Footer />
  </footer>
</template>

<style scoped>
.newsletter-page {
  padding: 50px 6% 90px;
}

.newsletter-container {
  max-width: 980px;
  margin: 0 auto;
}

.title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  margin-bottom: 10px;
}

.subtitle {
  margin-bottom: 30px;
  color: #444;
}

.author-box,
.author-panel,
.post-card {
  background: #4e76a9;
  color: #fff;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  padding: 24px;
  margin-bottom: 24px;
}

.author-panel-header,
.post-header {
  display: flex;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.form-grid {
  display: grid;
  gap: 12px;
  margin: 16px 0;
}

input,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #d8d8d8;
  border-radius: 10px;
  font-size: 0.95rem;
  box-sizing: border-box;
}

.upload-label {
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.preview-grid,
.post-photos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
  margin: 12px 0 20px;
}

.preview-item img,
.post-photos img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}

.post-date {
  font-size: 0.9rem;
}

.post-note {
  line-height: 1.8;
}

.primary-btn,
.danger-btn {
  border: none;
  border-radius: 8px;
  padding: 10px 14px;
  cursor: pointer;
  font-weight: 600;
}

.primary-btn {
  background-color: #1c4e99;
  color: #ffffff;
}

.danger-btn {
  background-color: #d64949;
  color: #fff;
}

.error-text {
  color: #b92d2d;
  margin-top: 10px;
}

@media (max-width: 700px) {
  .author-panel-header,
  .post-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
