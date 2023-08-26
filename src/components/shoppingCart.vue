<script setup>
import { computed, ref } from "vue";
import { useProductStore } from "../stores/store.js";
import orderBtn from "./orderBtn.vue";
const productStore = useProductStore();
const orderedProducts = computed(() => productStore.getOrderedProducts);

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
              <orderBtn text="-"></orderBtn>
              <div class="ordered-quantity">
                {{ product.amount > 0 ? product.amount : 0 }}
              </div>
              <orderBtn text="+"></orderBtn>
            </div>
            <div class="sum">$ {{ product.totalSum }}</div>
            <div class="delete">
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
          
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/scss/components/shoppingCart.scss";
</style>