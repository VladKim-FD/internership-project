<script setup>
import { computed, ref } from "vue";
import { useProductStore } from "../stores/store.js";
import btn from "./btn.vue";
import orderBtn from "./orderBtn.vue";
// import shoppingCartVue from "../pages/shoppingCart.vue";
const productStore = useProductStore();
const product = computed(() => productStore.getProduct);
const products = computed(() => productStore.products);
const images = product.value.images;
const extraProducts = computed(() => productStore.getExtraProducts);

let activeImg = computed(() => product.value.thumbnail);

function changeImg(img) {
  activeImg = img;
  console.log(activeImg);
}

function increase(product) {
  if (product.amount == undefined) {
    product.amount = 0;
  } else {
    product.amount++;
   if(!product.hasOwnProperty('getTotalSum')){
    Object.defineProperty(product, 'getTotalSum', {
      get() {
        return this.price * this.amount;
      },
    }
    )
   }
   if(!product.hasOwnProperty('getDiscountSum')){
    Object.defineProperty(product, 'getDiscountSum', {
      get() {
        return (100 - this.discountPercentage) / 100 * (this.price * this.amount);
      },
    }
    )
   }
   this.product.totalSum = this.product.getTotalSum
   this.product.discountSum = this.product.getDiscountSum
    console.log(product);
    console.log(products);
   
    localStorage.setItem("productStore", JSON.stringify(productStore));
  }
}

function decrease(product) {
  if (product.amount > 0) {
    product.amount--;
  }
  if(!product.hasOwnProperty('totalSum')){
    Object.defineProperty(product, 'totalSum', {
      get() {
        return this.price * this.amount;
      },
    }
    )
   }
}

// going to another page

function openProduct(id) {
  productStore.id = id;
}

// likeProduct

function likeProduct(event, product) {
  if(event.target.classList.contains('active')){
    event.target.classList.remove('active')
  }else{
    event.target.classList.add('active')
  }
  
  product.liked = !product.liked
  console.log(product.liked);
}
</script>

<template>
  <div>
    <div class="container products">
      <div class="products__links">
        <router-link :to="`/`">Home / <span>Product Card</span></router-link>
      </div>
      <div class="products__info">
        <div class="products__info-img">
          <div class="img-gallery">
            <div class="img-good" v-for="image in images" @click="changeImg(image)">
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
            <RouterLink :to="`/shoppingCart`">
              <btn text="Buy NOW"></btn>
            </RouterLink>
            <!-- <img src="../assets/icons/like.svg" alt="" class="like" 
            @click="likeProduct($event, product)"
            /> -->
            <div class="icon-like" @click="likeProduct($event, product)"></div>
          </div>
        </div>
      </div>
      <div class="products__extra">
        <h2>You may be interested in</h2>
        <div class="products__extra-content">
          <div class="extra__item" v-for="extraProduct in extraProducts" :key="extraProduct.id">
            <div class="extra__item-img">
              <RouterLink :to="`/productCard/${extraProduct.id}`" @click="openProduct(extraProduct.id)"></RouterLink>
              <img :src="extraProduct.thumbnail" alt="" />
            </div>
            <div class="extra__item-description">
              <h4>{{ extraProduct.description }}</h4>
              <p>$ {{ extraProduct.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/scss/components/productCard.scss";
</style>

