<script setup>
import { computed, ref, onMounted } from "vue";
import { useProductStore } from "../stores/store.js";
import { RouterLink } from "vue-router";
const productStore = useProductStore();

onMounted(async () => {
  await productStore.getProducts();
});

let products = computed(() => productStore.products);
let categoriesArr = computed(() => productStore.getCategories);

console.log(products);
// pagination

let productsArr = ref([]);
productsArr.value = products.value;
let categories = computed(() => productStore.getCategories);

let productsPerPage = 12;
let currentPage = ref(1);
let pagesQuantity = computed(() => {
  let pages = Math.ceil(products.value.length / productsPerPage);
  return pages;
});

productsArr = computed(() => {
  let from = (currentPage.value - 1) * productsPerPage;
  let to = from + productsPerPage;
  return products.value.slice(from, to);
});

// filtering products

let filter = false;
let arrGoods = ref(products.value);
arrGoods.value = products.value;

let changeProducts = (elem) => {
  filter = true;
  arrGoods.value = products.value.filter((product) => product.category == elem);
  console.log(arrGoods.value);
};

// going to another page

function openProduct(id) {
  productStore.id = id;
}

// like product

function likeProduct(event, product){
event.target.classList.add('active')
product.liked = !product.liked
}

</script>

<template>
  <div class="categories" v-if="arrGoods">
    <div class="container categories__content">
      <h2>Categories</h2>
      <ul class="categories__content-types" ref="categories">
        <li v-for="category in categoriesArr" @click="changeProducts(category)">
          {{ category }}
        </li>
      </ul>
      <div class="categories__content-products">
        <div class="product" v-for="product in productsArr" v-show="filter == false">
          <div class="product-img">
            <RouterLink :to="`/productCard/${product.id}`" @click="openProduct(product.id)"></RouterLink>
            <div class="icons">
              <img src="../assets/icons/cart.svg" alt="" />
              <!-- <img src="../assets/icons/like.svg" alt="" /> -->
              <!-- <div class="icon-cart"></div> -->
              <div class="icon-like" @click="likeProduct($event, product)"></div>
            </div>
            <div class="product-img-block">
              <img :src="product.thumbnail" alt="" />
            </div>
          </div>
          <p>{{ product.title }}</p>
          <span>$ {{ product.price }}</span>
        </div>
        <div class="product" v-show="filter == true" v-for="product in arrGoods">
          <div class="product-img">
            <RouterLink :to="`/productCard/${product.id}`" @click="openProduct(product.id)"></RouterLink>
            <div class="icons">
              <img src="../assets/icons/cart.svg" alt="" />
              <img src="../assets/icons/like.svg" alt="" />
            </div>
            <div class="product-img-block">
              <img :src="product.thumbnail" alt="" />
            </div>
          </div>
          <p>{{ product.title }}</p>
          <span>$ {{ product.price }}</span>
        </div>
      </div>
      <div class="categories__content-buttons">
        <button v-for="btn in pagesQuantity" @click="(currentPage = btn), (filter = false)">
          {{ btn }}
        </button>
      </div>
    </div>
  </div>
  <div class="more">
    <div class="container more__content">
      <div class="more__content-left">
        <h3>Christian Dior Sauvage Parfum</h3>
        <p>
          In winter 2018, the world was presented a stunning new product from
          the famous perfume brand Christian Dior - Sauvage Eau De Parfum
        </p>
      </div>
      <div class="more__content-right">
        <h3>iPhone 14</h3>
        <p>
          The updated iPhone 14 is Apple's new smartphone, unveiled at the
          September 7, 2022 presentation. It received a minimum of new changes,
          so it features an improved camera and new body colors. It also has
          satellite communication for emergencies.
        </p>
      </div>
    </div>
  </div>
</template>

<style>
@import "../assets/scss/components/main.scss";
</style>