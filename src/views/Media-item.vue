<script setup>
import navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
</script>

<template>
    <header>
      <navbar />
    </header>
    <div class="media-container">
        <h1 class="title">Medios</h1>
        <div class="media-content">
            <p>Podrás encontrar entrevistas, reseñas y más contenido relacionado con el libro en esta sección.</p>
        </div>
    <div class="media-content">
        <h2>Entrevista en Publishers Magazine</h2>
        <div class="video-container">
        <iframe 
            src="https://www.youtube.com/embed/i1Pu6UoLE2s" 
            frameborder="0" 
            allowfullscreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
         </iframe>
    </div>
    <div class="media-content">
        <p>En este entrevista con Publishers Magazine, Octavio Miranda comparte detalles sobre su proceso creativo y la inspiración detrás de "Las luces de Palpanuma". Escucha la entrevista completa para conocer más sobre el autor y su obra.</p>  
    </div>
    </div>
    <div class="media-content">
  
  <div class="resena-destacada">
    <h2>Reseña en Publishers Magazine</h2>
    <p class="resena-meta">Publishers nº 67 · Octubre 2025 · Sección: Las reseñas de Publishers</p>
    
    <blockquote>
      "La novela, concebida para un público juvenil, trasciende sin embargo las fronteras de la literatura de aventuras y se acaba convirtiendo en una fábula sobre la madurez, el miedo y la valentía."
    </blockquote>
    
    <p>
    Octavio Miranda presenta en la editorial Caligrama una propuesta de notable densidad simbólica y estética titulada <em>Las luces de Palpanuma</em>. La revista especializada Publishers, en su número 67, destaca cómo la obra construye un universo narrativo donde el viaje físico se funde con una profunda búsqueda interior. La crítica resalta el tono audiovisual y cinematográfico del relato, apoyado en una prosa lírica que explora temas universales como el coraje frente a la adversidad.
    </p>
  </div>
</div>
    </div>
    <footer>
      <Footer />
    </footer>
</template>

<style scoped>

.media-container {
  max-width: 1100px;
  margin: 60px auto;
  padding: 0 6%;
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

.media-content {
  margin-top: 40px;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 20px;
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

.resena-destacada {
  margin-top: 40px;
  padding: 30px;
  border-left: 4px solid #4e76a9;
  background-color: #f9f9f9;
  border-radius: 0 8px 8px 0;
}

.resena-meta {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 20px;
  font-style: italic;
}

blockquote {
  font-size: 1.15rem;
  line-height: 1.7;
  color: #4e76a9;
  font-style: italic;
  margin: 0 0 20px 0;
}

</style>