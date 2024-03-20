<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { RouterLink } from "vue-router";
import { useProductStore } from "../stores/store.js";
const productStore = useProductStore();
const totalQuantity = computed(() => productStore.getTotalQuantity);


let body = app.parentElement;
const isMenuOpen = ref(false);

const closeMenu = (event) => {
  const burgerMenu = document.querySelector(".menu-btn");
  if (!burgerMenu.contains(event.target)) {
    isMenuOpen.value = false;
  }

  if (body.classList.contains('active')) {
    body.classList.remove('active')
  } 
};


onMounted(() => {
  document.addEventListener('click', closeMenu);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', closeMenu);
});


// menu open and close

function menuToggle(event) {
  event.stopPropagation()
  isMenuOpen.value = !isMenuOpen.value;
  if (body.classList.contains('active')) {
    body.classList.remove('active')
  } else {
    body.classList.add('active')
  }
}


// go to another page

function goToAnotherPage(event) {
  isMenuOpen.value = !isMenuOpen.value;
  event.target.classList.add('active')
  const links = ref(document.querySelectorAll('.link'));
  for (let i = 0; i < links.value.length; i++) {
    if (links.value[i] != event.target) {
      links.value[i].classList.remove('active')
    }
  }
  if (body.classList.contains('active')) {
    body.classList.remove('active')
  }

  console.log(body.classList);
}

</script>

<template>
  <nav>
    <div class="container nav__content">
      <router-link :to="`/`" class="nav__content-logo">
        <img src="/src/assets/icons/nav-logo.svg" alt="" /></router-link>
      <div class="nav__content-links" ref="navbarMenu" :class="{ active: isMenuOpen }">
        <ul class="nav__content-links-list">
          <li>
            <router-link :to="`/`" @click="goToAnotherPage" class="link">Home</router-link>
          </li>
          <li>
            <router-link :to="`/productCheckout`" @click="goToAnotherPage" class="link">Payment and
              delivery</router-link>
          </li>
          <li>
            <router-link :to="`/likedProducts`" @click="goToAnotherPage" class="link">Liked Products</router-link>
          </li>
        </ul>
        <div class="nav__content-links-right">
          <div class="cart-logo">
            <router-link :to="`/shoppingCart`" @click="goToAnotherPage"></router-link>
            <div class="icon-cart cart"></div>
            <div class="totalQuantity">
              <p>{{ totalQuantity != NaN ? totalQuantity : 0 }}</p>
            </div>
          </div>
        </div>
      </div>
      <button class="menu-btn" :class="{ active: isMenuOpen }" @click="menuToggle">
        <span></span>
      </button>
    </div>
  </nav>
</template>

<style lang="scss">
@import "../assets/scss/components/navbar.scss";
</style>