<script setup>
import btn from "../components/btn.vue";
import { ref } from "vue";
let isActive = ref(false);
// const navbarMenu = ref("");

function menuToggle() {
  isActive.value = !isActive.value;
  console.log(isActive.value);
}
</script>

<template>
  <nav>
    <div class="container nav__content">
      <div class="nav__content-logo">
        <img src="/src/assets/icons/nav-logo.svg" alt="" />
      </div>
      <div
        class="nav__content-links"
        ref="navbarMenu"
        :class="{ active: isActive }"
      >
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
          <img src="../assets/icons/cart-icon.svg" alt="" />
          <btn text="Login"></btn>
        </div>
      </div>
      <button
        class="menu-btn"
        :class="{ active: isActive }"
        @click="menuToggle()"
      >
        <span></span>
      </button>
    </div>
  </nav>
</template>

<style lang="scss">
@import "../assets/scss/components/navbar.scss";
</style>