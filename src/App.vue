<script setup>
import { RouterView } from "vue-router";
import navbar from "./components/navbar.vue";
import footerVue from "./components/footer.vue";
</script>

<template>
  <navbar></navbar>
  <RouterView />
  <footerVue></footerVue>
</template>


