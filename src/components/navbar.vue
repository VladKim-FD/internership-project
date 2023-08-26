<script setup>
import btn from "../components/btn.vue";
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { useProductStore } from "../stores/store.js";
const productStore = useProductStore();
const totalQuantity = computed(() => productStore
  .getTotalQuantity);
  console.log(totalQuantity);
let isActive = ref(false);

function menuToggle() {
  isActive.value = !isActive.value;
  console.log(isActive.value);
}
</script>

<template>
  <nav>
    <div class="container nav__content">
      <div class="nav__content-logo">
        <router-link :to="`/`"></router-link>
        <img src="/src/assets/icons/nav-logo.svg" alt="" />
      </div>
      <div class="nav__content-links" ref="navbarMenu" :class="{ active: isActive }">
        <ul class="nav__content-links-list">
          <li>
            <a href="#!">Home</a>
          </li>
          <li>
            <a href="#!">Product card</a>
          </li>
          <li>
            <a href="#!">Payment and delivery</a>
          </li>
          <li>
            <a href="#!">Contacts</a>
          </li>
        </ul>
        <div class="nav__content-links-right">
          <div class="cart-logo">
            <img src="../assets/icons/cart-icon.svg" alt="" />
            <div class="totalQuantity">{{ totalQuantity != NaN ? totalQuantity : 0 }}</div>
          </div>
          <btn text="Login"></btn>
        </div>
      </div>
      <button class="menu-btn" :class="{ active: isActive }" @click="menuToggle()">
        <span></span>
      </button>
    </div>
  </nav>
</template>

<style lang="scss">
@import "../assets/scss/components/navbar.scss";
</style>