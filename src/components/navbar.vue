<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { useProductStore } from "../stores/store.js";
const productStore = useProductStore();
const id = productStore.id;
const totalQuantity = computed(() => productStore
  .getTotalQuantity);
let isActive = ref(false);

let body = app.parentElement;

function menuToggle() {
  isActive.value = !isActive.value;
  if(body.classList.contains('active')){
    body.classList.remove('active')
  }else{
    body.classList.add('active')
  }
}

</script>

<template>
  <nav>
    <div class="container nav__content">
        <router-link :to="`/`" class="nav__content-logo">
          <img src="/src/assets/icons/nav-logo.svg" alt="" /></router-link>
      <div class="nav__content-links" ref="navbarMenu" :class="{ active: isActive }">
        <ul class="nav__content-links-list">
          <li>
            <router-link :to="`/`" >Home</router-link>
          </li>
          <li>
            <a href="#footer">Contacts</a>
          </li>
          <li>
            <router-link :to="`/productCheckout`">Payment and delivery</router-link>
          </li>
          <li>
            <router-link :to="`/likedProducts`">Liked Products</router-link>
          </li>
        </ul>
        <div class="nav__content-links-right">
          <div class="cart-logo">
            <router-link :to="`/shoppingCart`"></router-link>
            <div class="icon-cart cart"></div>
            <div class="totalQuantity">
              <p>{{ totalQuantity != NaN ? totalQuantity : 0 }}</p>
            </div>
          </div>
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