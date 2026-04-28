<script setup>
import navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
</script>

<template>
    <header>
      <navbar />
    </header>
    <div class="media-container">
        <h1 class="title">Medios de Comunicación</h1>
        <div class="media-content">
            <p>Podrás encontrar entrevistas, reseñas y más contenido relacionado con el libro en esta sección. ¡Mantente atento para descubrir todo lo que tenemos preparado!</p>
        </div>
    <div class="video-container">
        <iframe 
    src="https://www.youtube.com/embed/i1Pu6UoLE2s" 
    frameborder="0" 
    allowfullscreen
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
  </iframe>
    </div>
  
    </div>
    <footer>
      <Footer />
    </footer>
</template>

<style scoped>

.media-container {
  max-width: 1100px;
  margin: 0 auto;
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

</style>