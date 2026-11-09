<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue';
</script>
<template>
  <div class="app-shell">
    <AppHeader />
    <main id="main-content"><RouterView /></main>
    <footer class="site-footer">
      <div class="container footer-inner">
        <span>© 2026 форма. 4 недели заботы о себе</span><span>Учебный проект · интерфейс MVP</span>
      </div>
    </footer>
  </div>
</template>
