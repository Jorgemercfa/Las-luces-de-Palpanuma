<script setup>
import { computed, ref, onMounted } from 'vue';
import navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
import { useNewsletterPosts } from '@/composables/useNewsletterPosts';

const AUTHOR_USER = 'octavio';
const AUTHOR_PASSWORD = 'Palpanuma2026';
const SESSION_STORAGE_KEY = 'palpanuma-newsletter-author';

// URL del Cloudflare Worker que sí tiene el token de GitHub (oculto en su lado).
const WORKER_URL = process.env.VUE_APP_NEWSLETTER_WORKER_URL || '';
const canWriteToGitHub = computed(() => Boolean(WORKER_URL));

const {
  posts,
  sortedPosts,
  isLoading,
  syncError,
  syncWarning,
  loadPosts,
  persistToLocalStorage,
} = useNewsletterPosts();

const loginForm = ref({ user: '', password: '' });
const postForm = ref({ title: '', note: '' });
const uploadedPhotos = ref([]);
const isAuthor = ref(false);
// Cuando no es null, el formulario está editando esa publicación
// en lugar de crear una nueva.
const editingPostId = ref(null);
// Guardamos la contraseña en memoria (no en localStorage) mientras dura la
// sesión del autor, para poder autenticar cada guardado contra el Worker
// sin pedirla de nuevo en cada publicación.
const sessionAuthorPassword = ref('');
const loginError = ref('');
const postError = ref('');
const showLoginForm = ref(false);
const copiedSlug = ref('');

onMounted(async () => {
  isAuthor.value = sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true';

  if (!canWriteToGitHub.value) {
    postError.value =
      'Falta configurar el Worker de publicación (VUE_APP_NEWSLETTER_WORKER_URL).';
  }

  await loadPosts();
});

async function persistPosts() {
  persistToLocalStorage();

  if (!canWriteToGitHub.value) {
    return;
  }

  const response = await fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user: loginForm.value.user || AUTHOR_USER,
      password: sessionAuthorPassword.value,
      posts: posts.value,
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || `No se pudo guardar (${response.status}).`);
  }
}

function loginAuthor() {
  loginError.value = '';
  const user = loginForm.value.user.trim().toLowerCase();

  if (user === AUTHOR_USER && loginForm.value.password === AUTHOR_PASSWORD) {
    isAuthor.value = true;
    sessionAuthorPassword.value = loginForm.value.password;
    sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
    loginForm.value = { user: '', password: '' };
    return;
  }

  loginError.value = 'Credenciales incorrectas. Solo el autor puede editar.';
}

function logoutAuthor() {
  isAuthor.value = false;
  sessionAuthorPassword.value = '';
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

function startEditPost(post) {
  postError.value = '';
  editingPostId.value = post.id;
  postForm.value = { title: post.title, note: post.note };
  uploadedPhotos.value = [...(post.photos || [])];

  document
    .querySelector('.author-panel')
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function cancelEdit() {
  editingPostId.value = null;
  postForm.value = { title: '', note: '' };
  uploadedPhotos.value = [];
  postError.value = '';
}

async function addPost() {
  postError.value = '';

  if (!postForm.value.title.trim() || !postForm.value.note.trim()) {
    postError.value = 'Debes completar el título y la nota antes de publicar.';
    return;
  }

  if (!canWriteToGitHub.value) {
    postError.value =
      'La publicación remota no está configurada (falta el Worker). Revisa VUE_APP_NEWSLETTER_WORKER_URL.';
    return;
  }

  const previousPosts = [...posts.value];
  const cleanTitle = postForm.value.title.trim();
  const cleanNote = postForm.value.note.replace(/\s+$/, '').replace(/^\s+/, '');

  if (editingPostId.value) {
    posts.value = posts.value.map((post) =>
      post.id === editingPostId.value
        ? {
            ...post,
            title: cleanTitle,
            note: cleanNote,
            photos: [...uploadedPhotos.value],
          }
        : post,
    );
  } else {
    const newPost = {
      id: Date.now(),
      title: cleanTitle,
      note: cleanNote,
      photos: [...uploadedPhotos.value],
      createdAt: new Date().toISOString(),
    };
    posts.value.push(newPost);
  }

  isLoading.value = true;

  try {
    await persistPosts();
    postForm.value = { title: '', note: '' };
    uploadedPhotos.value = [];
    editingPostId.value = null;
  } catch (error) {
    console.error(error);
    posts.value = previousPosts;
    postError.value = error.message || 'No se pudo publicar. Intenta de nuevo.';
  } finally {
    isLoading.value = false;
  }
}

async function deletePost(postId) {
  postError.value = '';

  if (editingPostId.value === postId) {
    cancelEdit();
  }

  const previousPosts = [...posts.value];
  posts.value = posts.value.filter((post) => post.id !== postId);
  isLoading.value = true;

  try {
    await persistPosts();
  } catch (error) {
    console.error(error);
    posts.value = previousPosts;
    postError.value = error.message || 'No se pudo eliminar. Intenta de nuevo.';
  } finally {
    isLoading.value = false;
  }
}

async function copyPostLink(slug) {
  const url = `${window.location.origin}/newsletter/${slug}`;
  try {
    await navigator.clipboard.writeText(url);
    copiedSlug.value = slug;
    setTimeout(() => {
      copiedSlug.value = '';
    }, 2000);
  } catch (error) {
    console.error(error);
  }
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
      <p v-if="syncWarning" class="warning-text">{{ syncWarning }}</p>
      <p v-if="syncError" class="warning-text">{{ syncError }}</p>

      <div v-if="!isAuthor" class="author-toggle-wrapper">
        <button
          class="toggle-login-btn"
          @click="showLoginForm = !showLoginForm"
        >
          {{ showLoginForm ? 'Cancelar' : '🔒 Acceso de autor' }}
        </button>
      </div>

      <div class="author-box" v-if="!isAuthor && showLoginForm">
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

      <div class="author-panel" v-if="isAuthor">
        <div class="author-panel-header">
          <h2>{{ editingPostId ? 'Editando publicación' : 'Panel del autor' }}</h2>
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
            rows="8"
            placeholder="Escribe la nota del newsletter. Presiona Enter para separar párrafos."
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

        <div class="panel-actions">
          <button class="primary-btn" :disabled="isLoading" @click="addPost">
            {{
              isLoading
                ? 'Guardando…'
                : editingPostId
                  ? 'Guardar cambios'
                  : 'Publicar newsletter'
            }}
          </button>
          <button
            v-if="editingPostId"
            class="secondary-btn"
            :disabled="isLoading"
            @click="cancelEdit"
          >
            Cancelar edición
          </button>
        </div>
        <p v-if="postError" class="error-text">{{ postError }}</p>
      </div>

      <p v-if="isLoading && !sortedPosts.length" class="loading-text">
        Cargando publicaciones…
      </p>

      <section class="posts-list">
        <article v-for="post in sortedPosts" :key="post.id" class="post-card">
          <div class="post-header">
            <div>
              <h3>
                <router-link
                  :to="`/newsletter/${post.slug}`"
                  class="post-title-link"
                >
                  {{ post.title }}
                </router-link>
              </h3>
              <p class="post-date">{{ formatDate(post.createdAt) }}</p>
            </div>
            <div class="post-actions">
              <button class="secondary-btn" @click="copyPostLink(post.slug)">
                {{ copiedSlug === post.slug ? '¡Copiado!' : '🔗 Compartir' }}
              </button>
              <button
                v-if="isAuthor"
                class="secondary-btn"
                @click="startEditPost(post)"
              >
                Editar
              </button>
              <button
                v-if="isAuthor"
                class="danger-btn"
                @click="deletePost(post.id)"
              >
                Eliminar
              </button>
            </div>
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
  font-family: inherit;
}

textarea {
  resize: vertical;
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
  white-space: pre-wrap;
  word-wrap: break-word;
}

.post-title-link {
  color: #fff;
  text-decoration: none;
}

.post-title-link:hover {
  text-decoration: underline;
}

.primary-btn,
.secondary-btn,
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

.primary-btn:disabled,
.secondary-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.secondary-btn {
  background-color: rgba(255, 255, 255, 0.15);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.danger-btn {
  background-color: #d64949;
  color: #fff;
}

.panel-actions,
.post-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.error-text {
  color: #b92d2d;
  margin-top: 10px;
}

.warning-text {
  color: #8a5a00;
  margin-bottom: 16px;
}

.loading-text {
  color: #666;
  margin-bottom: 16px;
}

@media (max-width: 700px) {
  .author-panel-header,
  .post-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

.author-toggle-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
}

.toggle-login-btn {
  background: transparent;
  border: none;
  color: #888;
  font-size: 0.82rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: color 0.2s;
}

.toggle-login-btn:hover {
  color: #444;
}
</style>