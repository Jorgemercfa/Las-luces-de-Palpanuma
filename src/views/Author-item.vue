<script setup>
import navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
</script>

<template>
  <header>
    <navbar />
  </header>

  <!-- Título -->
  <section class="title-section">
    <div class="container">
      <h1 class="title">Acerca del autor</h1>
    </div>
  </section>

  <!-- Contenido -->
  <main class="author-section">
    <div class="container">
      <div class="author-card">
        <div class="author-image-container">
          <img
            class="author-image"
            src="@/assets/autorimg.jpeg"
            alt="Foto de Octavio Miranda"
          />
        </div>

        <div class="author-content">
          <h2 class="author-name">Octavio Miranda</h2>

          <p class="biography">
            Octavio Miranda Chiappe nació en Lima, Perú, en el año 2000. Desde muy pequeño mostró interés por la historia, la naturaleza y las artes, principalmente, el cine y la literatura. Por ello, se ha dedicado a escribir guiones, cuentos y novelas desde los ocho años hasta el día de hoy, donde ya es graduado de la Universidad de Lima en Comunicación con enfoque en periodismo y audiovisuales, y esta novela, Las luces de Palpanuma, es su primer libro publicado.
          </p>
        </div>
      </div>
    </div>
  </main>

  <footer>
    <Footer />
  </footer>
</template>

<style scoped>
/* =========================
   CONTENEDOR GLOBAL
========================= */

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 6%;
}

/* =========================
   TÍTULO EDITORIAL
========================= */

.title-section {
  margin-top: 60px;
  margin-bottom: 40px;
}

.title {
  font-size: clamp(2rem, 4vw, 2.6rem);
  font-weight: 700;
  position: relative;
  text-align: left;
}

.title::after {
  content: '';
  width: 70px;
  height: 4px;
  background-color: #4e76a9;
  position: absolute;
  bottom: -12px;
  left: 0;
  border-radius: 5px;
}

/* =========================
   SECCIÓN AUTOR
========================= */

.author-section {
  margin-bottom: 120px;
}

.author-card {
  background: linear-gradient(135deg, #4e76a9, #456a9a);
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.15);
  display: flex;
  gap: 50px;
  align-items: center;
  transition: 0.3s ease;
  color: #f1f1f1;
}

.author-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 25px 55px rgba(0, 0, 0, 0.25);
}

/* =========================
   IMAGEN
========================= */

.author-image-container {
  flex-shrink: 0;
}

.author-image {
  width: 250px;
  height: 380px;
}

/* =========================
   CONTENIDO
========================= */

.author-content {
  flex: 1;
}

.author-name {
  font-size: 1.6rem;
  margin-bottom: 20px;
  font-weight: 600;
}

/* Biografía */

.biography {
  line-height: 1.9;
  text-align: justify;
  opacity: 0.95;
}

/* Primera letra estilo editorial */

.biography::first-letter {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffffff;
  float: left;
  margin-right: 8px;
  line-height: 1;
}

/* =========================
   RESPONSIVE
========================= */

@media (max-width: 900px) {
  .author-card {
    flex-direction: column;
    text-align: center;
    padding: 35px;
    gap: 30px;
  }

  .author-image {
    width: 180px;
    height: 250px;
  }

  .title {
    text-align: center;
  }

  .title::after {
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
