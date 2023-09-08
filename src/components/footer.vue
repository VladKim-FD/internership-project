<script setup>
import { RouterLink } from "vue-router";
import { useProductStore } from "../stores/store.js";
const productStore = useProductStore();
const id = productStore.id;
</script>

<template>
  <div>
    <footer class="footer" id="footer">
      <div class="container footer__content">
        <div class="footer__content-logo">
          <img src="../assets/icons/footer-logo.svg" alt="" />
        </div>
        <div class="footer__content-links">
          <ul class="first-list">
            <li>
              <router-link :to="`/`">Home</router-link>
            </li>
            <li>
              <!-- <router-link :to="`/productCard/${id}`">Product Card</router-link> -->
              <router-link :to="`/shoppingCart`">Shopping Cart</router-link>
            </li>
          </ul>
          <ul class="second-list">
            <li>
              <router-link :to="`/productCheckout`">Payment and delivery</router-link>
            </li>
            <li>
              <router-link :to="`/likedProducts`">Like</router-link>
            </li>
          </ul>
          <ul class="third-list">
            <li>
              <h3>Contacts</h3>
            </li>
            <li>
              <img src="../assets/icons/location-icon.svg" alt="" />
              <a href="">70 West Buckingham Ave. Farmingdale, NY 11735</a>
            </li>
            <li>
              <img src="../assets/icons/phone-icon.svg" alt="" />
              <a href="">+88 01911 717 490</a>
            </li>
            <li>
              <img src="../assets/icons/letter-icon.svg" alt="" />
              <a href="">contact@sportdriven.com</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>



<style lang="scss">
@import "../assets/scss/components/footer.scss";
</style>