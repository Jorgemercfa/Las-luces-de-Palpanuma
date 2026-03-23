<script setup>
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
</script>

<template>
  <div class="page-wrapper">
    <header>
      <Navbar />
    </header>

    <section class="contact-section">
      <div class="contact-container">
        <h1 class="main-title">Contáctanos</h1>

        <div class="contact-card">
          <!-- FORMULARIO -->
          <form
            class="form-area"
            action="https://formsubmit.co/cokijlmf@gmail.com"
            method="POST"
          >
            <div class="form-group">
              <label>Nombre</label>
              <input type="text" name="Nombre" required />
            </div>

            <div class="form-group">
              <label>Email</label>
              <input type="email" name="Email" required />
            </div>
            <div class="form-group">
              <label>Mensaje</label>
              <textarea name="Mensaje" rows="4"></textarea>
            </div>

            <button type="submit" class="submit-btn">Enviar mensaje</button>
          </form>

          <!-- INFORMACIÓN -->
          <div class="contact-info">
            <h2>Información de contacto</h2>
            <p><strong>Celular:</strong> 999 999 999</p>
            <p><strong>Correo:</strong> ejemplo@gmail.com</p>
          </div>
        </div>
      </div>
    </section>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f6f3;
}

.contact-section {
  flex: 1;
  padding: 120px 0 80px 0;
}

.contact-container {
  width: 90%;
  max-width: 1100px;
  margin: auto;
}

.main-title {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 50px;
  position: relative;
}

.main-title::after {
  content: '';
  width: 80px;
  height: 4px;
  background-color: #4e76a9;
  display: block;
  margin-top: 10px;
  border-radius: 2px;
}

.contact-card {
  display: flex;
  gap: 60px;
  background: white;
  padding: 60px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  flex-wrap: wrap;
}

.form-area {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 500;
  margin-bottom: 6px;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 14px;
  transition: 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4e76a9;
  box-shadow: 0 0 0 3px rgba(66, 174, 26, 0.15);
}

.submit-btn {
  margin-top: 10px;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background-color: #4e76a9;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease;
}

.submit-btn:hover {
  background-color: #2e8f12;
  transform: translateY(-2px);
}

.contact-info {
  flex: 1;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  font-size: 15px;
}

.contact-info h2 {
  margin-bottom: 15px;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .contact-card {
    flex-direction: column;
    padding: 40px;
  }
}
</style>
