<template>
  <button class="orderBtn">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: ["text"],
};
</script>

<style lang="scss">
@import '../assets/scss/components/orderBtn.scss';
</style>