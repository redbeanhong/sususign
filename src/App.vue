<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import FooterBar from "./components/FooterBar.vue";
</script>

<template>
  <main id="main">
    <header>
      <NavBar />
    </header>
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
  flex-wrap: wrap;
  align-content: space-between;
}

#main,
#footer {
  width: 100%;
}
</style>
