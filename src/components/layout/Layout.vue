<script setup>
import Navbar from '../shared/Navbar.vue'
</script>

<template>
  <main class="layout-view">
    <Navbar />

    <div class="container">
      <slot></slot>
    </div>
  </main>
</template>

<style lang="css" scoped>
.layout-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: 100dvh;
}
</style>
