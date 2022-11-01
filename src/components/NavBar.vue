<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/document">Document</RouterLink>
    <RouterLink to="/config">Config</RouterLink>
    <RouterLink to="/pdf_edit">PdfEdit</RouterLink>
  </nav>
</template>
