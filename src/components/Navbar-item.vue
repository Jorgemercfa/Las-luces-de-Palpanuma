<template>
  <nav class="navbar-area">
    <div class="link-style" :class="{ 'show-menu': menuOpen }">
      <router-link @click="closeMenu" to="/" class="text-navbar"
        >Inicio</router-link
      >
      <router-link @click="closeMenu" to="/About-item" class="text-navbar"
        >Historia</router-link
      >
      <router-link @click="closeMenu" to="/Storie-item" class="text-navbar"
        >Libros</router-link
      >
      <router-link @click="closeMenu" to="/Author-item" class="text-navbar"
        >Autor</router-link
      >
    </div>
    <div class="hamburger" @click="toggleMenu">☰</div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
  },
};
</script>

<style>
/* ✅ NUEVO: Espaciado global para navbar sticky */
html {
  scroll-padding-top: 80px;
}

.navbar-area {
  background: linear-gradient(90deg, #4e76a9, #4e76a9);
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 1000;
}

/* LOGO */
.nav-logo img.logo {
  height: 45px;
  width: auto;
  border-radius: 6px;
}

/* LINKS DESKTOP */
.link-style {
  display: flex;
  align-items: center;
  gap: 25px;
}

.text-navbar {
  color: white;
  text-decoration: none;
  font-size: 0.95rem;
  position: relative;
  transition: 0.3s ease;
}

/* Línea animada hover */
.text-navbar::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 0%;
  height: 2px;
  background: white;
  transition: 0.3s ease;
}

.text-navbar:hover::after {
  width: 100%;
}

/* Ruta activa automática de Vue */
.router-link-active {
  font-weight: 600;
}

.router-link-active::after {
  width: 100%;
}

/* HAMBURGER */
.hamburger {
  display: none;
  font-size: 26px;
  color: white;
  cursor: pointer;
}

/* MOBILE */
@media (max-width: 900px) {
  .link-style {
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    flex-direction: column;
    background: linear-gradient(180deg, #4e76a9, #4e76a9);
    padding: 25px 0;
    gap: 20px;
    display: none;
    animation: fadeIn 0.3s ease;
  }

  .link-style.show-menu {
    display: flex;
  }

  .hamburger {
    display: block;
  }

  .text-navbar {
    text-align: center;
    padding: 10px 0;
  }

  .text-navbar::after {
    display: none;
  }

  .router-link-active::after {
    width: 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
