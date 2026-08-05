import { ref, computed } from 'vue';

const GITHUB_USER = process.env.VUE_APP_GITHUB_USER || '';
const GITHUB_REPO = process.env.VUE_APP_GITHUB_REPO || '';
const GITHUB_BRANCH = process.env.VUE_APP_GITHUB_BRANCH || 'main';
const FILE_PATH = 'public/posts.json';
const LOCAL_STORAGE_KEY = 'palpanuma-newsletter-posts';

const RAW_POSTS_URL = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${FILE_PATH}`;

export const canReadFromGitHub = Boolean(GITHUB_USER && GITHUB_REPO);

/**
 * Convierte un título en una versión apta para URL.
 * "Christopher Nolan, epicidad y confusión." -> "christopher-nolan-epicidad-y-confusion"
 */
export function slugify(text) {
  return (text || '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita tildes/acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Asigna a cada post un slug único y determinista, calculado en orden de
 * creación (id ascendente). Esto es intencional: así el link de una
 * publicación se mantiene estable entre cargas de página mientras su
 * título no cambie, sin necesidad de guardar el slug en posts.json.
 * Si dos publicaciones generan el mismo slug base, a la más reciente
 * se le agrega un sufijo (-2, -3, ...).
 */
export function withSlugs(posts) {
  const byCreationOrder = [...posts].sort((a, b) => a.id - b.id);
  const usedCount = new Map();
  const slugById = new Map();

  byCreationOrder.forEach((post) => {
    const base = slugify(post.title) || 'publicacion';
    const count = usedCount.get(base) || 0;
    const slug = count === 0 ? base : `${base}-${count + 1}`;
    usedCount.set(base, count + 1);
    slugById.set(post.id, slug);
  });

  return posts.map((post) => ({ ...post, slug: slugById.get(post.id) }));
}

function createDefaultPosts() {
  return [
    {
      id: Date.now(),
      title: 'Bienvenidos al Newsletter',
      note: 'Este espacio será usado para compartir avances del libro, notas del autor e imágenes exclusivas del proceso creativo.',
      photos: [],
      createdAt: new Date().toISOString(),
    },
  ];
}

function savePostsToLocalStorage(posts) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
}

function loadPostsFromLocalStorage() {
  const savedPosts = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!savedPosts) {
    return null;
  }

  try {
    const parsed = JSON.parse(savedPosts);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

async function fetchPostsFromGitHub() {
  if (!canReadFromGitHub) {
    return null;
  }

  const response = await fetch(`${RAW_POSTS_URL}?t=${Date.now()}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`No se pudo leer posts.json (${response.status}).`);
  }

  const parsed = await response.json();
  return Array.isArray(parsed) ? parsed : [];
}

/**
 * Composable de solo lectura, usado tanto por la lista del newsletter
 * como por la página de una publicación individual.
 */
export function useNewsletterPosts() {
  const posts = ref([]);
  const isLoading = ref(false);
  const syncError = ref('');
  const syncWarning = ref(
    canReadFromGitHub
      ? ''
      : 'La sincronización no está configurada en este despliegue. Las publicaciones solo se guardarán en este dispositivo/navegador.',
  );

  const postsWithSlugs = computed(() => withSlugs(posts.value));
  const sortedPosts = computed(() =>
    [...postsWithSlugs.value].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    ),
  );

  async function loadPosts() {
    isLoading.value = true;
    syncError.value = '';

    try {
      const localPosts = loadPostsFromLocalStorage();

      if (localPosts) {
        posts.value = localPosts;
      }

      if (!canReadFromGitHub) {
        if (!localPosts) {
          posts.value = createDefaultPosts();
          savePostsToLocalStorage(posts.value);
        }
        return;
      }

      const remotePosts = await fetchPostsFromGitHub();

      if (remotePosts === null) {
        posts.value = localPosts || createDefaultPosts();
        savePostsToLocalStorage(posts.value);
        return;
      }

      posts.value = remotePosts;
      savePostsToLocalStorage(posts.value);
    } catch (error) {
      console.error(error);
      syncError.value = 'No se pudieron cargar las publicaciones desde GitHub.';

      const localPosts = loadPostsFromLocalStorage();
      posts.value = localPosts || createDefaultPosts();
    } finally {
      isLoading.value = false;
    }
  }

  return {
    posts,
    postsWithSlugs,
    sortedPosts,
    isLoading,
    syncError,
    syncWarning,
    loadPosts,
    persistToLocalStorage: () => savePostsToLocalStorage(posts.value),
  };
}