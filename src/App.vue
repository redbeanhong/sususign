<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import FooterBar from "./components/FooterBar.vue";
</script>

<template>
  <header id="header">
    <NavBar />
  </header>
  <main id="main">
    <RouterView />
  </main>
  <footer id="footer">
    <FooterBar />
  </footer>
</template>

<style lang="scss">
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#main {
  flex-grow: 1;
  display: flex;
}
</style>
