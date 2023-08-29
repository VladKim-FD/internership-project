<script setup>
import { computed, ref } from "vue";
import { useProductStore } from "../stores/store.js";
import orderBtn from "./orderBtn.vue";
const productStore = useProductStore();
const orderedProducts = computed(() => productStore.getOrderedProducts);
const subTotalSum = computed(() => productStore.getSubTotalSum);


function increase(product){
 product.amount++; 
 product.totalSum = product.price * product.amount;
 product.discountSum = (100 - product.discountPercentage) / 100 * (product.price * product.amount);
}

function decrease(product){
  if(product.amount > 0){
    product.amount--; 
    product.totalSum = product.price * product.amount;
    product.discountSum = (100 - product.discountPercentage) / 100 * (product.price * product.amount);
  }
}

function deleteProduct(product){
 product.amount = 0
 product.totalSum = 0
}

</script>

<template>
  <div>
    <div class="shopping__cart container">
      <div class="shopping__cart-left">
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
            <img :src="product.thumbnail" alt="" />
            <div class="product-description">
              <h3>{{ product.title }}</h3>
              <p>{{ product.description }}</p>
            </div>
            <p class="product-price">$ {{ product.price }}</p>
            <div class="product-btns">
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
      <div class="shopping__cart-right">
        <div class="titles-right">
          <h2>Cart Totals</h2>
        </div>
        <div class="content-right">
          <div class="subtotal-sum">
            <h4>Subtotal</h4>
            <p>{{ !subTotalSum ? 0 : subTotalSum  }}</p>
          </div>
          <div class="discount">
            <h4>Discount</h4>
            <p>{{  }}</p>
          </div>
          <div class="total-sum"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/scss/components/shoppingCart.scss";
</style>