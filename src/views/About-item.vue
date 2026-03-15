<script setup>
import navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
</script>

<template>
  <header>
    <navbar />
  </header>

  <main class="content">
    <div class="history-container">
      <h1 class="title">Resumen de la historia</h1>

      <div class="history-space">
        <p>
          Nazca tiene catorce años y un mundo sin conocer. Ella es una chica muy
          temerosa y sensible que vive en una pequeña isla en el medio del mar
          llamada Noribo, la cual forma parte de un archipiélago en el Ártico
          conocido como Lyanangaia, una de las zonas más inhóspitas del planeta
          Tierra. Ella era muy solitaria, aunque no siempre fue así, sus padres
          eran sus únicos amigos, quienes además la protegían de todos los
          peligros que las islas escondían en sus sombras. Por ello, Nazca,
          nunca había tenido la necesidad de poner un pie afuera de su casa o
          hacer algo por su cuenta. Hasta que un día algo horrible pasa. Algo
          que la forzará a emprender un largo viaje a través de mar y tierra por
          todo el archipiélago en búsqueda de las luces de una misteriosa
          montaña llamada Palpanuma, sin saber que un latente peligro la estaría
          acechando desde el primer día que partió de su hogar.
        </p>
      </div>
    </div>
  </main>

  <footer>
    <Footer />
  </footer>
</template>

<style>
.about-container {
  width: 85%;
  max-width: 1100px;
  margin: auto;
}

.history-container {
  max-width: 1100px;
  margin: 60px auto;
  padding: 0 6%;
}

.title {
  font-size: clamp(2rem, 4vw, 2.6rem);
  margin-bottom: 50px;
  font-weight: 700;
  position: relative;
  text-align: left;
}

.title::after {
  content: '';
  width: 80px;
  height: 4px;
  background-color: #4e76a9; /* Línea roja */
  display: block;
  margin-top: 10px;
  border-radius: 2px;
}

.history-space {
  background-color: #4e76a9; /* Azul oscuro como la imagen */
  padding: 40px;
  border-radius: 18px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  color: #f1f1f1;
  display: flex;
  flex-direction: column;
  gap: 25px;
  transition: 0.3s ease;
}

.history-space:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.25);
}

/* Párrafos */
.history-space p {
  font-size: 1.05rem;
  line-height: 1.9;
  text-align: justify;
  opacity: 0.95;
}

/* Primera letra estilo libro (detalle elegante) */
.history-space p:first-child::first-letter {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffffff;
  float: left;
  margin-right: 8px;
  line-height: 1;
}

/* .history-space h2 {
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 22px;
  color: #ffffff;
}

.history-space p {
  font-size: 16px;
  margin-bottom: 15px;
} */
</style>
