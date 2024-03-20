<script setup>
import { computed, ref } from "vue";
import { useProductStore } from "../stores/store.js";
import orderBtn from "./orderBtn.vue";
import { RouterLink } from "vue-router";

const productStore = useProductStore();
const orderedProducts = computed(() => productStore.getOrderedProducts);
const extraProducts = computed(() => productStore.getExtraProducts);
const subTotalSum = computed(() => productStore.getSubTotalSum);
const discountSum = computed(() => Math.ceil(productStore.getDiscountSum));
const totalSum = computed(() => Math.round(productStore.getTotalSum));
const id = computed(() => productStore.id);
let body = app.parentElement;


// slider



const slides = ref("slides");
const containerSlider = ref('containerSlider');
const slider = ref("slider");
const btnPrev = ref("btnPrev");
const btnNext = ref("btnNext");

let offset = 0;
let slideIncrement = 0;
let slideDecrement = extraProducts.value.length - 2;
let showBtnPrev = ref(false);
let showBtnNext = ref(false);
let sliderIsActivated = ref(false);

function moveForward() {

  showBtnPrev.value = true;
  btnNext.value.disabled = true;
  offset = slides.value[0].offsetWidth;
  slider.value.style.transition = "left ease-in-out 500ms";
  // slider.value.style.left = - offset + 'px'
  setTimeout(() => {

    slider.value.style.transition = 'none';
    slides.value[slideIncrement].style.order = slides.value.length - 1;
    slider.value.left = 0;
    slideIncrement++;
    slideDecrement = slideIncrement - 1;

    if (slideIncrement == slides.value.length) {
      slideIncrement = 0;

      slides.value.forEach(btn => {
        btn.style.order = 'initial';
      });
    }
    if (slideIncrement === slides.value.length - 2 && body.offsetWidth > 768) {
      showBtnNext.value = true;
      showBtnPrev.value = true;
    } else if (body.offsetWidth < 768 && slideIncrement === slides.value.length - 1) {
      showBtnNext.value = true;
      showBtnPrev.value = true;
    }
    btnNext.value.disabled = false;
  }, 500);

}

function moveBackward() {

  sliderIsActivated.value = true;
  btnPrev.value.disabled = true;
  offset = slides.value[0].offsetWidth;
  slider.value.style.transition = 'none';
  btnNext.value.style.right = '-45px';
  showBtnNext.value = false;

  if (slideDecrement < 0) {
    slides.value.forEach(btn => {
      btn.style.order = 'initial'
    })
    slideDecrement = slides.value.length - 1;
  }

  slides.value[slideDecrement].style.order = '-1';
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



// add or remove from order


function increase(product) {
  product.amount++;
  product.totalSum = product.price * product.amount;
  product.discountSum = product.discountPercentage / 100 * product.totalSum;

  localStorage.setItem("productStore", JSON.stringify(productStore));
}

function decrease(product) {
  if (product.amount > 0) {
    product.amount--;
    product.totalSum = product.price * product.amount;
    product.discountSum = product.discountPercentage / 100 * product.totalSum;

    localStorage.setItem("productStore", JSON.stringify(productStore));
  }
}

function deleteProduct(product) {
  product.amount = 0
  product.totalSum = 0
  product.discountSum = 0

  localStorage.setItem("productStore", JSON.stringify(productStore));
}


// go to another page 

function openProduct(id) {
  productStore.id = id;
}


// likeProduct

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

    event.target.classList.remove('active')
  } else {
    product.amount++
    product.totalSum = product.price * product.amount;
    product.discountSum = product.discountPercentage / 100 * product.totalSum

    productStore.id = product.id;

    localStorage.setItem("productStore", JSON.stringify(productStore));

    event.target.classList.add('active')
  }
}


// scroll to Top

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // You can remove the 'smooth' value if you prefer an instant scroll
  });
}

</script>

<template>
  <section>
    <div class="shopping__cart container">
      <div class="shopping__cart-links" v-show="orderedProducts.length > 0">
        <RouterLink :to="`/`" class="first-link">Home /</RouterLink>
        <RouterLink :to="`/productCard/${id}`">Product Card /</RouterLink>
        <RouterLink :to="`/shoppingCart`">Shopping Cart</RouterLink>
      </div>
      <div class="shopping__cart-info" v-show="orderedProducts.length > 0">
        <div class="left">
          <div class="titles-left">
            <h2>Products</h2>
            <div class="titles">
              <h2>Price</h2>
              <h2>Quantity</h2>
              <h2>Total</h2>
            </div>
          </div>
          <div class="content-left">
            <div class="product" v-for="product in orderedProducts" :key="product.id">
              <div class="product__info">
                <img :src="product.thumbnail" alt="" />
                <div class="product__info-description">
                  <h3>{{ product.title }}</h3>
                  <p>{{ product.description }}</p>
                </div>
              </div>

              <div class="product__order">
                <p class="product__order-price">$ {{ product.price }}</p>
                <div class="product__order-btns">
                  <orderBtn text="-" @click="decrease(product)"></orderBtn>
                  <div class="ordered-quantity">
                    {{ product.amount > 0 ? product.amount : 0 }}
                  </div>
                  <orderBtn text="+" @click="increase(product)"></orderBtn>
                </div>
                <div class="sum">$ {{ product.totalSum }}</div>
                <div class="delete" @click="deleteProduct(product)">
                  <img src="../assets/icons/delete.svg" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="titles-right">
            <h2>Cart Totals</h2>
          </div>
          <div class="content-right">
            <div class="subtotal-sum">
              <h4>Subtotal</h4>
              <p>$ {{ !subTotalSum ? 0 : subTotalSum }}</p>
            </div>
            <div class="discount">
              <h4>Discount</h4>
              <p>$ {{ !discountSum ? 0 : discountSum }}</p>
            </div>
            <div class="total-sum">
              <h4>Total</h4>
              <p>$ {{ !totalSum ? 0 : totalSum }}</p>
            </div>
          </div>
          <div class="btns-right">
            <router-link :to="`/productCheckout`" class="first-link" @click="scrollToTop">Proceed To Checkout</router-link>
            <router-link :to="`/`">Continue Shopping</router-link>
          </div>
        </div>
      </div>
      <div class="products__extra" v-show="orderedProducts.length > 0">
        <h2>You may be interested in</h2>
        <div class="products__extra-content">
          <div class="content__slider" ref="containerSlider">
            <div class="slider-container" ref="slider">
              <div class="extra__item" v-for="extraProduct in extraProducts" :key="extraProduct.id" ref="slides">
                <div class="extra__item-img">
                  <RouterLink :to="`/productCard/${extraProduct.id}`" @click="openProduct(extraProduct.id)">
                  </RouterLink>
                  <img :src="extraProduct.thumbnail" alt="" />
                  <div class="icons">
                    <div class="icon-cart" @click="addOrDeleteProduct(extraProduct)"
                      :class="{ active: extraProduct.amount }">
                    </div>
                    <div class="icon-like" @click="likeProduct($event, extraProduct)"
                      :class="{ active: extraProduct.liked == true }"></div>
                  </div>
                  <h5>{{ Math.ceil(extraProduct.discountPercentage) }} % OFF</h5>
                </div>
                <div class="extra__item-description">
                  <h4>{{ extraProduct.title }}</h4>
                  <p>$ {{ extraProduct.price }}</p>
                </div>
              </div>
            </div>
            <button class="btn-prev" ref="btnPrev" @click="moveBackward()" v-show="showBtnPrev">
            <div class="icon-prev"></div>
          </button>
          <button class="btn-next" ref="btnNext" @click="moveForward()" v-show="!showBtnNext">
            <div class="icon-next"></div>
          </button>
          </div>
        </div>
      </div>
      <h5 v-show="orderedProducts.length == 0">There are no ordered products!</h5>
    </div>
  </section>
</template>

<style lang="scss">
@import "../assets/scss/components/shoppingCart.scss";
</style>