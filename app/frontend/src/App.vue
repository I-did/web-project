<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue';
</script>

<template>
  <div class="app-shell">
    <AppHeader />
    <main id="main-content"><RouterView /></main>
    <footer class="site-footer">
      <div class="container footer-inner">КБЖУ · Учебный проект, 2026</div>
    </footer>
  </div>
</template>
