<script setup>
import { computed, ref } from "vue";
import { useProductStore } from "../stores/store.js";
import { useRouter, RouterLink } from "vue-router";
import btn from "./btn.vue";
import orderBtn from "./orderBtn.vue";

const router = useRouter();
const productStore = useProductStore();
let product = computed(() => productStore.getProduct);
const extraProducts = computed(() => productStore.getExtraProducts);
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


// change image

let isLast = ref(true);
let activeImg = ref('');
activeImg.value = product?.value?.thumbnail;
let imgBlocks = ref('imgBlocks');

function changeImg(event, img) {
  activeImg.value = img;
  const imgBlock = event.target.closest('.img-good');
  imgBlock.classList.add('active');
  for (let i = 0; i < imgBlocks.value.length; i++) {
    if (imgBlocks.value[i] != imgBlock) {
      imgBlocks.value[i].classList.remove('active')
    }
  }
}


// change product 

function changeProduct(extraProduct) {
  // product.value = extraProduct
  productStore.id = extraProduct.id;
  localStorage.setItem("productStore", JSON.stringify(productStore));
  activeImg.value = extraProduct.thumbnail;
}

function navigateAndChange(extraProduct) {
  // Execute the router navigation first
  router.push(`/productCard/${extraProduct.id}`);

  // Execute the changeProduct function after a delay
  setTimeout(() => {
    changeProduct(extraProduct);
  }, 100);
}


// add or remove from order
function increase(product) {
  if (product.amount == undefined) {
    product.amount = 0;
  } else {
    product.amount++;
    product.totalSum = product.price * product.amount;
    product.discountSum = product.discountPercentage / 100 * product.totalSum

    localStorage.setItem("productStore", JSON.stringify(productStore));
  }
}

function decrease(product) {
  if (product.amount > 0) {
    product.amount--;
  }
  if (!product.hasOwnProperty('totalSum')) {
    Object.defineProperty(product, 'totalSum', {
      get() {
        return this.price * this.amount;
      },
    }
    )
  }
  if (!product.hasOwnProperty('getDiscountSum')) {
    Object.defineProperty(product, 'getDiscountSum', {
      get() {
        return this.discountPercentage / 100 * this.totalSum;
      },
    }
    )
  }
  this.product.totalSum = this.product.getTotalSum
  this.product.discountSum = this.product.getDiscountSum

  localStorage.setItem("productStore", JSON.stringify(productStore));
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
  } else {
    product.amount++
    product.totalSum = product.price * product.amount;
    product.discountSum = product.discountPercentage / 100 * product.totalSum

    productStore.id = product.id;
    localStorage.setItem("productStore", JSON.stringify(productStore));

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
  <div>
    <section class="container products">
      <div class="products__links">
        <router-link :to="`/`">Home / <span>Product Card</span></router-link>
      </div>
      <div class="products__info">
        <div class="products__info-img">
          <div class="img-gallery" ref="imgGallery">
            <div class="img-good" v-for="image in product.images" @click="changeImg($event, image)" ref="imgBlocks"
              :class="{ active: image == product.images[product.images.length - 1] && isLast }">
              <img :src="image" alt="">
            </div>
          </div>
          <img :src="activeImg" alt="" class="main-img" />
        </div>
        <div class="products__info-description">
          <h3>{{ product.title }}</h3>
          <p>$ {{ product.price }}</p>
          <h4>Product description</h4>
          <p class="description">{{ product.description }}</p>
          <div class="products-order">
            <div class="order-btns">
              <orderBtn text="-" @click="decrease(product)"></orderBtn>
              <div class="ordered-quantity">
                {{ product.amount > 0 ? product.amount : 0 }}
              </div>
              <orderBtn text="+" @click="increase(product)"></orderBtn>
            </div>
            <RouterLink :to="`/shoppingCart`" @click="scrollToTop">
              <btn text="Buy NOW"></btn>
            </RouterLink>
            <div class="icon-like" @click="likeProduct($event, product)" :class="{ active: product.liked == true }">
            </div>
          </div>
        </div>
      </div>
      <div class="products__extra">
        <h2>You may be interested in</h2>
        <div class="products__extra-content">
          <div class="content__slider" ref="containerSlider">
            <div class="slider-container" ref="slider">
              <div class="extra__item" v-for="extraProduct in extraProducts" :key="extraProduct.id" ref="slides">
                <div class="extra__item-img">
                  <div class="img-block" @click="
          navigateAndChange(extraProduct)"></div>
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
    </section>
  </div>
</template>

<style lang="scss">
@import "../assets/scss/components/productCard.scss";
</style>
