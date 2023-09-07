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

function increase(product) {
  product.amount++;
  product.totalSum = product.price * product.amount;
  product.discountSum = product.discountPercentage / 100 * product.totalSum;

  // this.product.totalSum = this.product.getTotalSum
  // this.product.discountSum = this.product.getDiscountSum

  localStorage.setItem("productStore", JSON.stringify(productStore));
}

function decrease(product) {
  if (product.amount > 0) {
    product.amount--;
    product.totalSum = product.price * product.amount;
    product.discountSum = product.discountPercentage / 100 * product.totalSum;

    // this.product.totalSum = this.product.getTotalSum
    // this.product.discountSum = this.product.getDiscountSum

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
  <div>
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
            <router-link :to="`/productCheckout`" class="first-link">Proceed To Checkout</router-link>
            <router-link :to="`/`">Continue Shopping</router-link>
          </div>
        </div>
      </div>
      <div class="products__extra" v-show="orderedProducts.length > 0">
        <h2>You may be interested in</h2>
        <div class="products__extra-content">
          <div class="extra__item" v-for="extraProduct in extraProducts" :key="extraProduct.id">
            <div class="extra__item-img">
              <RouterLink :to="`/productCard/${extraProduct.id}`" @click="openProduct(extraProduct.id)"></RouterLink>
              <img :src="extraProduct.thumbnail" alt="" />
              <div class="icons">
                <div class="icon-cart" @click="addOrDeleteProduct(extraProduct)"></div>
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
      </div>
      <h5 v-show="orderedProducts.length == 0">There are no ordered products!</h5>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/scss/components/shoppingCart.scss";
</style>