<script setup>
import { RouterView } from "vue-router";
import { useProductStore } from "./stores/store";

const store = useProductStore();
</script>

<template>
  <RouterView />
</template>

<style>
</style>
