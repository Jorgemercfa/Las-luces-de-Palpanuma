<script setup>
import 'primeicons/primeicons.css';
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer-area">
    <div class="footer-container">
      <div class="contact-footer">
        <h4 class="titile-footer">Contacto</h4>
        <div class="footer-text">
          <div>ejemplo@grmail.pe</div>
        </div>
      </div>
      <div class="social-media">
        <h4 class="title-footer">Redes Sociales</h4>

        <div class="social-icons">
          <a
            href="https://www.instagram.com/octaviomiranda.ch/"
            target="_blank"
          >
            <i class="pi pi-instagram"></i>
          </a>

          <a href="" target="_blank">
            <i class="pi pi-youtube"></i>
          </a>

          <a href="" target="_blank">
            <i class="pi pi-tiktok"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      © {{ year }} Octavio Miranda. Todos los derechos reservados.
    </div>
  </footer>
</template>

<style>
.footer-area {
  background-color: #1c4e99;
  color: white;
  margin-top: 100px;
}

/* CONTENEDOR */
.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 5%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
}

/* TÍTULOS */
.titile-footer {
  font-size: 1.1rem;
  margin-bottom: 15px;
  position: relative;
  font-weight: 600;
}

/* Línea decorativa (BLANCA para que combine con el verde) */
.titile-footer::after {
  content: '';
  width: 40px;
  height: 3px;
  background-color: #ffffff;
  position: absolute;
  bottom: -6px;
  left: 0;
  border-radius: 4px;
}

/* TEXTO */
.footer-text {
  font-size: 0.95rem;
  color: #e6e6e6;
  line-height: 1.6;
}

/* ICONOS */
.social-icons {
  display: flex;
  gap: 20px;
  margin-top: 15px;
}

.social-icons a {
  font-size: 1.8rem;
  color: #ffffff;
  transition: 0.3s ease;
}

.social-icons a:hover {
  color: #4e76a9;
  transform: translateY(-3px);
}
/* BARRA INFERIOR */
.footer-bottom {
  text-align: center;
  padding: 20px;
  font-size: 0.85rem;
  color: #cccccc;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .titile-footer::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .social-media2 {
    justify-content: center;
  }
}
</style>
