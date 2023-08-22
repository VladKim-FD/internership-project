<template>
  <button class="btn">{{ text }}</button>
</template>

<script>
export default {
  props: ["text"],
};
</script>

<style>
@import "../assets/scss/components/btn.scss";
</style>