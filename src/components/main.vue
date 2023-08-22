<script setup>
import { computed } from "vue";
import { useProductStore } from "../stores/store.js";
const productStore = useProductStore();
productStore.getProducts();
let products = computed(() => {
    const products = productStore.products.slice();

    return products;
});
console.log(products);


</script>

<template>
    <div class="categories">
        <div class="container categories__content">
            <h2>Categories</h2>
            <ul class="categories__content-types">
                <li>Technique</li>
                <li>Food and drink</li>
                <li>Perfumery</li>
                <li>Cosmetics</li>
                <li>Home Goods</li>
            </ul>
            <div class="categories__content-products">
                <div class="product" v-for="product in products" :key="product.id">
                    <div class="product-img">
                        <div class="icons">
                            <img src="../assets/icons/cart.svg" alt="" />
                            <img src="../assets/icons/like.svg" alt="" />
                        </div>
                        <div class="product-img-block">
                            <img :src="product.thumbnail" alt="" />
                        </div>
                    </div>
                    <p>{{ product.title }}</p>
                    <span>$ {{ product.price }}</span>
                </div>
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