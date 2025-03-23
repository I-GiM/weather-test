<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="main">
    <div class="cover">
      <header class="header">
        <nav class="container nav">
          <RouterLink to="/" class="home-link" exact> Ultimate Weather </RouterLink>
        </nav>
      </header>

      <div class="container page">
        <h1 class="heading-top">Precise weather</h1>
        <h1 class="heading-bottom">precisely for you</h1>

        <RouterLink to="/weather" class="mt-10 d-inline-block bg-white rounded-lg px-6 py-4"
          >Get started</RouterLink
        >
      </div>
    </div>
  </main>
</template>

<style scoped>
.main {
  background-image: url('../assets/metal-structure-with-sky-background.jpg');
  background-position: center;
  height: 100dvh;
}

.cover {
  /* background-color: rgba(0, 0, 0, 0.3); */
  height: 100dvh;
}

.header {
  height: 4rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #00000033;
}

.home-link {
  font-family: 'Italianno', cursive;
  font-size: 2rem;
  color: black;
  text-decoration: none;
  transition: color 0.3s;
}

.home-link:hover,
.home-link:focus {
  color: black;
  text-decoration: underline;
  outline: none;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.heading-top,
.heading-bottom {
  color: #1d2939;
  font-size: 64px;
  font-weight: 900;
  margin-top: 100px;
  padding: 0;
  line-height: 1;
  text-transform: uppercase;
}

.heading-bottom {
  margin-top: 0;
  font-size: 56px;
  text-transform: lowercase;
}
</style>
