<script setup name=src/components/storiesList.vue>
import navbar from '@/components/Navbar-item.vue'
import Footer from '@/components/Footer-item.vue'
import { useRouter } from 'vue-router'
import stories from '@/data/stories.js'

const router = useRouter()
</script>

<template>
  <header>
    <navbar />
  </header>
  <div class="stories-area">
    <h1 class="title-stories">Libros</h1>
    <div class="stories-container">
      <div v-for="storie in stories" :key="storie.id" class="storie-card">
        <div class="storie-content">
          <img v-if="storie.image2" :src="storie.image2" :alt="storie.name" class="storie-image" />
          <div class="storie-info">
            <h2 class="storie-title">{{ storie.name }}</h2>
            <p class="storie-description">{{ storie.shortDescription }}</p>
          </div>
        </div>
        <button
  class="details-button"
  @click="router.push({ name: 'storieDetails', params: { id: storie.id } })"
>
  {{ storie.details_button }}
</button>
      </div>
    </div>
  </div>
  <footer>
    <Footer />
  </footer>
</template>

<style>
.stories-area {
  margin: 50px 7%;
  text-align: center;
}

.title-stories {
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
  font-weight: bold;
  text-align: left;
  position: relative;
}

.title-stories::after {
  content: "";
  width: 60px;
  height: 4px;
  background-color: #4E76A9;
  position: absolute;
  bottom: -10px;
  left: 0;
  border-radius: 5px;
}

.stories-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.storie-card {
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

.storie-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
}


.storie-content {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.storie-image {
  width: 90px;
  height: 120px;
  border-radius: 10px;
  object-fit: cover;
  background-color: white;
  flex-shrink: 0;
}

.storie-info {
  text-align: left;
}

.storie-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.storie-description {
  font-size: 1rem;
  line-height: 1.5;
}

.details-button {
  margin-top: 20px;
  background-color: #1C4E99;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.details-button:hover {
  background-color: #184994;
}

@media (max-width: 768px) {
  .stories-area {
    align-items: center;
  }

  .stories-container{
    align-items: center;
  }

  .storie-card {
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

.storie-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}

.storie-description {
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
}

.storie-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  text-align: center;
 }
}
</style>