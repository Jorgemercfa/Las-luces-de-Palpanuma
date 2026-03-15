<script setup>
import navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
</script>

<template>
  <header>
    <navbar />
  </header>

  <main class="container">
    <h1 class="title">Sitios de Venta</h1>

    <div class="sale-space">
      <!-- DIGITAL -->
      <div class="card">
        <h2>📱 Formato Digital</h2>
        <p>Encuentra los libros en:</p>

        <a
          href="https://play.google.com/store/books/details/Octavio_Miranda_Las_luces_de_Palpanuma?id=s32DEQAAQBAJ&hl=es_PE"
          target="_blank"
          class="btn"
        >
          Google Play
        </a>

        <a
          href="https://www.amazon.com/-/es/Octavio-Miranda-ebook/dp/B0FPKL2D1Z"
          target="_blank"
          rel="noopener noreferrer"
          class="btn amazon"
        >
          Amazon
        </a>
      </div>

      <!-- IMPRESO -->
      <!-- <div class="card">
        <h2>📚 Formato Impreso</h2>
        <p>Disponible en las siguientes librerías:</p>

        <ul class="list">
          <li>
            <a
              href="https://www.elvirrey.com/busqueda/listaLibros.php?tipoBus=full&palabrasBusqueda=Lorenzo+Macchiavello"
              target="_blank"
              >El Virrey</a
            >
          </li>
          <li>
            <a
              href="https://www.communitas.pe/shop?search=Lorenzo+Macchiavello"
              target="_blank"
              >Communitas</a
            >
          </li>
          <li>
            <a
              href="https://larebelde.net/search?q=Lorenzo+Macchiavello&options%5Bprefix%5D=last"
              target="_blank"
              >La Rebelde</a
            >
          </li>
          <li>
            <a
              href="https://libreriaoculta.tiendada.com/products?name=Imperium"
              target="_blank"
              >Libreria Oculta</a
            >
          </li>
        </ul>
      </div> -->
    </div>
  </main>

  <footer class="footer-wrapper">
    <Footer />
  </footer>
</template>

<style scoped>
/* Estructura general */
.container {
  max-width: 1100px;
  margin: 60px auto;
  padding: 0 6%;
}

/* Título editorial */
.title {
  font-size: clamp(2rem, 4vw, 2.6rem);
  margin-bottom: 60px;
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

/* GRID HORIZONTAL */
.sale-space {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  align-items: stretch;
  flex-wrap: nowrap; /* 🔥 Mantiene horizontal en desktop */
}

/* CARDS estilo narrativa */
.card {
  flex: 1;
  background: linear-gradient(135deg, #4e76a9, #456a9a);
  padding: 40px;
  border-radius: 18px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  color: #f1f1f1;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.25);
}

.card h2 {
  font-size: 1.4rem;
  font-weight: 600;
}

.card p {
  opacity: 0.9;
  line-height: 1.6;
}

/* BOTONES estilo Imperium */
.btn {
  display: block;
  padding: 12px;
  text-align: center;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 500;
  transition: 0.3s ease;
  background-color: #1c4e99;
  color: white;
}

.btn:hover {
  background-color: #184994;
  transform: translateY(-2px);
}

/* Amazon variante */
.amazon {
  background-color: #ff9900;
  color: black;
}

.amazon:hover {
  background-color: #e68a00;
}

/* LISTA librerías */
.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list li {
  margin-bottom: 12px;
}

.list a {
  text-decoration: none;
  color: #f1f1f1;
  position: relative;
  transition: 0.3s ease;
}

.list a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 0%;
  height: 2px;
  background: #fc4747;
  transition: 0.3s ease;
}

.list a:hover::after {
  width: 100%;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .sale-space {
    flex-direction: column; /* 🔥 Vertical en móvil */
    gap: 30px;
  }

  .title {
    text-align: center;
  }

  .title::after {
    left: 50%;
    transform: translateX(-50%);
  }
}

.footer-wrapper {
  margin-top: 120px;
}
</style>
