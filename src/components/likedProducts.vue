<script setup>
import {computed} from 'vue';
import { useProductStore } from "../stores/store.js";
const productStore = useProductStore();

const likedProducts = computed(() => productStore.getLikedProducts);
console.log(likedProducts.value);
</script>

<template>
    <div class="container liked__products">
        <div class="liked__products-item" v-for="product in likedProducts">
        <img :src="product.thumbnail" alt="">
        <h3>{{ product.title }}</h3>
        <p>$ {{ product.price }}</p>
    </div>
    </div>
</template>

<style></style>