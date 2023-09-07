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
let productsArr = ref([]);
productsArr.value = [...products.value];
let filter = ref(false);

// pagination

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


let btns = ref("btns");

function clickBtn() {
  filter.value = false;
  event.target.classList.add("active")
  for (let i = 0; i < btns.value.length; i++) {
    if (btns.value[i] != event.target) {
      btns.value[i].classList.remove('active')
    }
  }
}

// filtering products

let arrGoods = ref(products.value);
arrGoods.value = [...products.value];
let categories = ref('categories');

let changeProducts = (event, elem) => {
  filter.value = true;

  if (event.target.classList.contains('active')) {
    event.target.classList.remove('active')
  } else {
    event.target.classList.add('active')
  }
  for (let i = 0; i < categories.value.length; i++) {
    if (categories.value[i] != event.target && categories.value[i].classList.contains('active')) {
      categories.value[i].classList.remove('active')
    }
  }

  arrGoods.value = products.value.filter((product) => product.category == elem);
};

// reset filter

function resetFilter() {
  filter.value = false;
  
}

// going to another page

function openProduct(id) {
  console.log(id);
  productStore.id = id;
  localStorage.setItem("productStore", JSON.stringify(productStore));
}

// like product

function likeProduct(event, product) {
  if (event.target.classList.contains('active')) {
    event.target.classList.remove('active')
  } else {
    event.target.classList.add('active')
  }
  product.liked = !product.liked
}

// add or delete product

function addOrDeleteProduct(product) {
  if (product.amount != 0) {
    product.amount = 0
    product.totalSum = product.price * product.amount;
    product.discountSum = product.discountPercentage / 100 * product.totalSum

    localStorage.setItem("productStore", JSON.stringify(productStore));
  } else {
    product.amount++
    product.totalSum = product.price * product.amount;
    product.discountSum = product.discountPercentage / 100 * product.totalSum

    productStore.id = product.id;

    localStorage.setItem("productStore", JSON.stringify(productStore));
  }
}

</script>

<template>
  <div class="categories">
    <div class="container categories__content">
      <h2>Categories</h2>
      <ul class="categories__content-types">
        <li v-for="category in categoriesArr" @click="changeProducts($event, category)" ref="categories">
          {{ category }}
        </li>
      </ul>
      <div class="categories__content-products">
        <div class="product" v-for="product in productsArr" v-show="!filter">
          <div class="product-img">
            <RouterLink :to="`/productCard/${product.id}`" @click="openProduct(product.id)"></RouterLink>
            <div class="icons">
              <div class="icon-cart" @click="addOrDeleteProduct(product)"></div>
              <div class="icon-like" @click="likeProduct($event, product)" :class="{ active: product.liked == true }">
              </div>
            </div>
            <div class="product-img-block">
              <img :src="product.thumbnail" alt="" />
            </div>
          </div>
          <p>{{ product.title }}</p>
          <span>$ {{ product.price }}</span>
        </div>
        <div class="product" v-for="otherProduct in arrGoods" v-show="filter">
          <div class="product-img">
            <RouterLink :to="`/productCard/${otherProduct.id}`" @click="openProduct(otherProduct.id)"></RouterLink>
            <div class="icons">
              <!-- <img src="../assets/icons/cart.svg" alt="" /> -->
              <div class="icon-cart" @click="addOrDeleteProduct(extraProduct)">
              </div>
              <div class="icon-like" @click="likeProduct($event, otherProduct)"></div>
            </div>
            <div class="product-img-block">
              <img :src="otherProduct.thumbnail" alt="" />
            </div>
          </div>
          <p>{{ otherProduct.title }}</p>
          <span>$ {{ otherProduct.price }}</span>
        </div>
      </div>
      <div class="categories__content-buttons">
        <button v-for="btn in pagesQuantity" @click="clickBtn(), (currentPage = btn)" ref="btns" v-show="!filter">
          {{ btn }}
        </button>
        <button @click="resetFilter" v-show="filter">Reset filter</button>
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