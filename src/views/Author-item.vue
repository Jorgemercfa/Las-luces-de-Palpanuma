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
            src="@/assets/autorimg.png"
            alt="Foto de Octavio Miranda"
          />
        </div>

        <div class="author-content">
          <h2 class="author-name">Octavio Miranda</h2>

          <p class="biography">
            Octavio Miranda (Lima, 2000). La empecé en Lima en el 2020, dos años
            más tarde, la retomé en Canadá en el 2022 y, un año después, la
            acabé en Utah en el 2023, y todo esto para luego volverla a escribir
            completa en Lima en el 2024, debido a que, por fin, descubrí su
            verdadero significado, y valió la pena absoluta hacerlo. Pasaron
            unos meses y, después de tanto esfuerzo e intenso desgaste, la
            terminé, de nuevo, y para siempre, en Utah este 2025 y el resultado
            final es de las cosas más conmovedoras y mágicas que me ha pasado en
            la vida.
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
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #ffffff;
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
    height: 180px;
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
