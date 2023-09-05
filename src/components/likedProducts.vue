<script setup>
import { computed } from 'vue';
import { RouterLink } from "vue-router";
import { useProductStore } from "../stores/store.js";
const productStore = useProductStore();

const likedProducts = computed(() => productStore.getLikedProducts);

function openProduct(id) {
    productStore.id = id;
    console.log(productStore.id);
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
</script>

<template>
    <div class="container liked__products">
        <div class="liked__products-links">
            <RouterLink :to="`/`" class="first-link">Home</RouterLink>
            <span>/</span>
            <RouterLink :to="`/likedProducts`">Like</RouterLink>
        </div>
        <div class="liked__products-content">
            <div class="item" v-for="product in likedProducts">
                <div class="item__img">
                    <RouterLink :to="`/productCard/${product.id}`" @click="openProduct(product.id)"></RouterLink>
                    <div class="icons">
                        <img src="../assets/icons/cart.svg" alt="" />
                        <div class="icon-like" @click="likeProduct($event, product)" 
                        :class="{active: product.liked == true}"
                        ></div>
                    </div>
                    <img :src="product.thumbnail" alt="">
                </div>
                <h3>{{ product.title }}</h3>
                <p>$ {{ product.price }}</p>
            </div>
            <h2 v-show="likedProducts.length == 0">There are no liked products!</h2>
        </div>
    </div>
</template>

<style lang="scss">
@import '../assets/scss/components/likedProducts.scss';
</style>