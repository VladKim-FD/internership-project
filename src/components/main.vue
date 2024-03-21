<script setup>
import { computed, ref, onMounted } from "vue";
import { useProductStore } from "../stores/store.js";
import { RouterLink } from "vue-router";

const productStore = useProductStore();

onMounted(async () => {
  await productStore.getProducts();

  for (const key in categoriesArr.value) {
    firstFiveCategories.value.push(categoriesArr.value[key])
  }
  firstFiveCategories.value = firstFiveCategories.value.slice(0, 5);

  for (const key in categoriesArr.value) {
    restOfCategories.value.push(categoriesArr.value[key])
  }
  restOfCategories.value = restOfCategories.value.slice(5, restOfCategories.length);

});

let products = computed(() => productStore.products);
let categoriesArr = computed(() => productStore.getCategories);
let firstFiveCategories = ref([]);
let restOfCategories = ref([]);
let productsArr = ref([]);
productsArr.value = [...products.value];
let filter = ref(false);

const btns = ref("btns");
const containerSlider = ref('containerSlider');
const slider = ref("slider");
const btnPrev = ref("btnPrev");
const btnNext = ref("btnNext");


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
let categoriesFirstGroup = ref('categoriesFirstGroup');
let categoriesSecondGroup = ref('categoriesSecondGroup');

let changeProducts = (event, elem) => {
  filter.value = true;

  event.target.classList.add('active')
  for (let i = 0; i < categoriesFirstGroup.value.length; i++) {
    if (categoriesFirstGroup.value[i] != event.target) {
      categoriesFirstGroup.value[i].classList.remove('active')
    }
  }
  for (let i = 0; i < categoriesSecondGroup.value.length; i++) {
    if (categoriesSecondGroup.value[i] != event.target) {
      categoriesSecondGroup.value[i].classList.remove('active')
    }
  }

  arrGoods.value = products.value.filter((product) => product.category == elem);

  containerSlider.value.style.display = 'none'
  btnPrev.value.style.display = 'none'
  btnNext.value.style.display = 'none'
};


// slider

let offset = 0;
let slideIncrement = 0;
let slideDecrement = btns.value.length - 1;
let showBtnPrev = ref(false);
let showBtnNext = ref(false);
let sliderIsActivated = ref(false);

function moveForward() {

  sliderIsActivated.value = true;
  showBtnPrev.value = true;
  btnNext.value.disabled = true;
  offset = btns.value[0].offsetWidth;
  slider.value.style.transition = "left ease-in-out 500ms";
  // slider.value.style.left = - offset + 'px'
  setTimeout(() => {

    slider.value.style.transition = 'none';
    btns.value[slideIncrement].style.order = btns.value.length - 1;
    slider.value.left = 0;
    slideIncrement++;
    slideDecrement = slideIncrement - 1;

    if (slideIncrement == btns.value.length) {
      slideIncrement = 0;

      btns.value.forEach(btn => {
        btn.style.order = 'initial';
      });
    }
    if (slideIncrement === btns.value.length - 4) {
      showBtnNext.value = true;
      showBtnPrev.value = true;
    }
    btnNext.value.disabled = false;
  }, 500);

}

function moveBackward() {

  sliderIsActivated.value = true;
  btnPrev.value.disabled = true;
  offset = btns.value[0].offsetWidth;
  slider.value.style.transition = 'none';
  btnNext.value.style.right = '-45px';
  showBtnNext.value = false;

  if (slideDecrement < 0) {
    btns.value.forEach(btn => {
      btn.style.order = 'initial'
    })
    slideDecrement = btns.value.length - 1;
  }

  btns.value[slideDecrement].style.order = '-1';
  slider.value.style.left = -offset + 'px';

  setTimeout(() => {
    slider.value.style.transition = 'left ease-in-out 500ms';
    slider.value.style.left = 0;
  }, 1);

  setTimeout(() => {
    slideDecrement--;
    slideIncrement = slideDecrement + 1;
    if (slideDecrement === -1) {
      showBtnPrev.value = false;
      showBtnNext.value = false;
    }
    btnPrev.value.disabled = false;
  }, 500);
}


// reset filter

function resetFilter() {
  filter.value = false;
  for (let i = 0; i < categoriesFirstGroup.value.length; i++) {
    if (categoriesFirstGroup.value[i].classList.contains('active')) {
      categoriesFirstGroup.value[i].classList.remove('active')
    }
  }
  for (let i = 0; i < categoriesSecondGroup.value.length; i++) {
    if (categoriesSecondGroup.value[i].classList.contains('active')) {
      categoriesSecondGroup.value[i].classList.remove('active')
    }
  }

  containerSlider.value.style.display = 'flex'
  slideIncrement == pagesQuantity.value - btns.value.length ? btnNext.value.style.display = 'flex' : btnNext.value.style.display = 'none';
  slideDecrement < btns.value.length - 1 & sliderIsActivated.value == true ? btnPrev.value.style.display = 'flex' : btnPrev.value.style.display = 'none'
}

// going to another page

function openProduct(id) {
  productStore.id = id;
  localStorage.setItem("productStore", JSON.stringify(productStore));
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // You can remove the 'smooth' value if you prefer an instant scroll
  });
}

function handleRouterLink(id) {
  openProduct(id);
  scrollToTop();
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


// dropdown

let dropdownIsOpen = ref(false);

function toggleDropdown() {
  dropdownIsOpen.value = !dropdownIsOpen.value;
}

function selectOption() {
  dropdownIsOpen.value = false;
}


// scroll to Categories

const categoriesList = ref("categoriesList");
console.log(categoriesList);
function scrollToCategories(){
  categoriesList.value.scrollIntoView({ behavior: 'smooth' });
  
}

</script>

<template>
  <section class="categories">
    <div class="container categories__content">
      <h2>Categories</h2>
      <div class="categories__content-list" ref="categoriesList">
        <ul class="list-categories" >
          <li v-for="category in firstFiveCategories" @click="changeProducts($event, category)"
            ref="categoriesFirstGroup">
            {{ category }}
          </li>
          <div class="dropdown" @click="toggleDropdown()">
            <div class="dropdown-toggle">{{ dropdownIsOpen.value ? 'Close dropdown' : 'More categories' }}</div>
            <div class="dropdown-menu" v-show="dropdownIsOpen">
              <li v-for="option in restOfCategories" :key="option" class="dropdown-item"
                @click=" selectOption(), changeProducts($event, option)" ref="categoriesSecondGroup">
                {{ option }}
              </li>
            </div>
          </div>
        </ul>
      </div>

      <div class="categories__content-products">
        <div class="product" v-for="product in productsArr" v-show="!filter">
          <div class="product-img">
            <RouterLink :to="`/productCard/${product.id}`" @click="handleRouterLink(product.id)"></RouterLink>
            <div class="icons">
              <div class="icon-cart" @click="addOrDeleteProduct(product)" :class="{ active: product.amount }"></div>
              <div class="icon-like" @click="likeProduct($event, product)" :class="{ active: product.liked == true }">
              </div>
            </div>
            <div class="product-img-block">
              <img :src="product.thumbnail" alt="" />
            </div>
            <h5>{{ Math.ceil(product.discountPercentage) }} % OFF</h5>
          </div>
          <p>{{ product.title }}</p>
          <span>$ {{ product.price }}</span>
        </div>
        <div class="product" v-for="otherProduct in arrGoods" v-show="filter">
          <div class="product-img">
            <RouterLink :to="`/productCard/${otherProduct.id}`" @click="openProduct(otherProduct.id)"></RouterLink>
            <div class="icons">
              <div class="icon-cart" @click="addOrDeleteProduct(otherProduct)" :class="{ active: otherProduct.amount }">
              </div>
              <div class="icon-like" @click="likeProduct($event, otherProduct)"></div>
            </div>
            <div class="product-img-block">
              <img :src="otherProduct.thumbnail" alt="" />
            </div>
            <h5>{{ Math.ceil(otherProduct.discountPercentage) }} % OFF</h5>
          </div>
          <p>{{ otherProduct.title }}</p>
          <span>$ {{ otherProduct.price }}</span>
        </div>
      </div>
      <div class="categories__content-buttons">
        <div class="content__slider" ref="containerSlider">
          <div class="slider-container" ref="slider">
            <button @click="clickBtn(), (currentPage = btn), scrollToCategories()" ref="btns" v-show="!filter"
              :class="{ active: btn == currentPage }" v-for="btn in pagesQuantity" class="slider-btn">
              <a href="#categories">{{ btn }}</a>
            </button>
          </div>
        </div>

        <button class="btn-prev" ref="btnPrev" @click="moveBackward()" v-show="showBtnPrev">
          <div class="icon-prev"></div>
        </button>
        <button class="btn-next" ref="btnNext" @click="moveForward()" v-show="!showBtnNext">
          <div class="icon-next"></div>
        </button>

        <button @click="resetFilter" v-show="filter">Reset filter</button>
      </div>
    </div>
  </section>
  <section class="more">
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
  </section>
</template>


<style>
@import "../assets/scss/components/main.scss";
</style>