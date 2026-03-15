<script setup>
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';

import { ref, onMounted, onBeforeUnmount } from 'vue';
import stories from '@/data/stories.js';

/* =============================
   CARRUSEL PRINCIPAL
============================= */

import img1 from '@/assets/book_home_1.png';
import img2 from '@/assets/book_home_2.png';
import img3 from '@/assets/book_home_3.png';

const images = [img1, img2, img3];

const currentImageIndex = ref(0);
const intervalId = ref(null);

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
};

/* iniciar carrusel */

const startCarousel = () => {
  stopCarousel();
  intervalId.value = setInterval(nextImage, 5000);
};

/* detener carrusel */

const stopCarousel = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
};

onMounted(() => {
  startCarousel();
});

onBeforeUnmount(() => {
  stopCarousel();
});
</script>

<template>
  <header>
    <Navbar />
  </header>
  <div class="home-area">
    <!-- Carrusel automático -->
    <div class="carousel-container">
      <img class="img-home" :src="images[currentImageIndex]" />
      <div class="carousel-dots">
        <span
          v-for="(image, index) in images"
          :key="index"
          :class="{ active: index === currentImageIndex }"
          @click="currentImageIndex = index"
        ></span>
      </div>
    </div>

    <div class="text-home">
      Nazca, una chica temerosa de catorce años que vive aislada en la inhóspita
      isla de Noribo, en el archipiélago ártico de Lyanangaia, se ve obligada a
      abandonar la seguridad de su hogar cuando ocurre un trágico suceso. Sin
      experiencia en el mundo exterior, emprende un peligroso viaje por mar y
      tierra en busca de las misteriosas luces de la montaña Palpanuma, sin
      saber que una amenaza la sigue desde el momento en que partió.
    </div>
    <h1 class="title-home">Libros</h1>
    <div class="our-stories">
      <router-link
        v-for="storie in stories"
        :key="storie.id"
        :to="{ name: 'storieDetails', params: { id: storie.id } }"
        class="logs-item"
      >
        <img class="card-icons" :src="storie.image2" :alt="storie.name" />
        <div>{{ storie.name }}</div>
      </router-link>
    </div>
  </div>

  <footer>
    <Footer />
  </footer>
</template>

<style>
.img-home {
  width: 100%;
  height: 80vh;
  min-height: 500px;
  object-fit: cover;
  object-position: center 30%; /* 🔥 mueve el enfoque hacia arriba */
  transition: opacity 0.8s ease;
}

/* .home-area {
} */

.title-home {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin: 80px 0 40px 0;
  text-align: center;
  position: relative;
}

.title-home::after {
  content: '';
  width: 60px;
  height: 4px;
  background-color: #4e76a9;
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
}

.text-home {
  max-width: 900px;
  margin: 60px auto;
  text-align: center;
  font-size: 18px;
  line-height: 1.7;
}
.our-stories {
  width: 100%;
  background: linear-gradient(135deg, #4e76a9, #456a9a);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 80px 40px;
  flex-wrap: wrap;
}

.card-icons {
  width: 90px;
  height: 90px;
  background-color: white;
  border-radius: 30%;
  object-fit: contain;
  margin-bottom: 20px;
}

.logs-item {
  width: 180px;
  min-height: 220px;
  background-color: #1c4e99;
  border-radius: 16px;
  text-align: center;
  color: #ffffff;
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none; /* quita el subrayado */
}

.logs-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

.our-sector {
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #4e76a9, #456a9a);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

/* ===============================
   Carrusel automático clientes
================================= */

.our-customers {
  overflow: hidden;
  background: linear-gradient(135deg, #4e76a9, #456a9a);
  padding: 80px 0;
  position: relative;
}

.customers-track {
  display: flex;
  width: max-content;
  animation: scrollCustomers 25s linear infinite;
}

.customer-slide {
  flex: 0 0 auto;
  padding: 0 40px;
}

.customer-icons {
  height: 60px;
  width: auto;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.customer-icons:hover {
  transform: scale(1.1);
}

/* Animación infinita */
@keyframes scrollCustomers {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Estilos para el carrusel */
.carousel-container {
  position: relative;
  width: 100%;
}

.carousel-container::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
}

.carousel-dots {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.carousel-dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.carousel-dots .active {
  background: #4e76a9;
  transform: scale(1.2);
}
/* =================================
   MEJORAS RESPONSIVE MOVIL
================================= */

@media (max-width: 768px) {
  /* Imagen principal */
  .img-home {
    height: 55vh;
    min-height: 280px;
  }

  /* Texto introductorio */
  .text-home {
    font-size: 16px;
    padding: 0 20px;
    margin: 40px auto;
  }

  /* Títulos */
  .title-home {
    font-size: 26px;
    margin: 60px 0 30px 0;
  }

  /* ===============================
     SERVICIOS
  =============================== */

  .our-stories {
    gap: 20px;
    padding: 50px 20px;
  }

  .logs-item {
    width: 140px;
    min-height: 170px;
    padding: 15px;
  }

  .card-icons {
    width: 65px;
    height: 65px;
    padding: 14px;
  }

  /* ===============================
     SECTORES
  =============================== */

  .our-sector {
    height: auto;
    flex-wrap: wrap;
    padding: 50px 20px;
    gap: 20px;
  }
}

/* =================================
   MOVILES PEQUEÑOS
================================= */

@media (max-width: 480px) {
  .img-home {
    height: 45vh;
  }

  .title-home {
    font-size: 22px;
  }

  .logs-item {
    width: 120px;
    min-height: 150px;
    font-size: 10px;
  }

  .card-icons {
    width: 55px;
    height: 55px;
  }

  .customer-icons {
    height: 45px;
  }
}
</style>
