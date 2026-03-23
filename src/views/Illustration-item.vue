<script setup name=src/components/illustrationList.vue>
import navbar from '@/components/Navbar-item.vue'
import Footer from '@/components/Footer-item.vue'

</script>

<template>
  <header>
    <navbar />
  </header>
  <div class="illustration-area">
    <h1 class="title-illustration">Ilustraciones</h1>
    <div class="illustration-container">
    <img src="@/assets/book_home_1.png" alt="Ilustración 1" class="illustration-image" />
    <img src="@/assets/book_home_2.png" alt="Ilustración 2" class="illustration-image" />
    <img src="@/assets/book_home_3.png" alt="Ilustración 3" class="illustration-image" />
    </div>
  </div>
  <footer>
    <Footer />
  </footer>
</template>

<style>
.illustration-area {
  margin: 50px 7%;
  text-align: center;
}

.title-illustration {
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
  font-weight: bold;
  text-align: left;
  position: relative;
}

.title-illustration::after {
  content: "";
  width: 60px;
  height: 4px;
  background-color: #4E76A9;
  position: absolute;
  bottom: -10px;
  left: 0;
  border-radius: 5px;
}

.illustration-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}



.illustration-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(135deg, #4E76A9, #456A9A);
  color: white;
  border-radius: 14px;
  padding: 24px;
  width: 420px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.illustration-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
}

.illustration-image {
  width: 100%;
  height: 400px;
  border-radius: 14px;
}

@media (max-width: 768px) {
  .illustration-area {
    align-items: center;
  }

  .illustration-container{
    align-items: center;
  }

  .illustration-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(135deg, #4E76A9, #456A9A);
  color: white;
  border-radius: 14px;
  padding: 24px;
  width: 320px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.illustration-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}

.illustration-description {
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
}

.illustration-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  text-align: center;
 }
}
</style>